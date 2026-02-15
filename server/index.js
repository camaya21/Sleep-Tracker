const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const pool = require('./db');
const {ObjectId} = require("mongodb")
const { getDb } = require("./mongo");

getDb().catch(err => {
  console.error("Mongo connection failed:", err);
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
      res.send('Hello from our server!')
})

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
  
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Missing fields' });
        }
        const db = await getDb();
        const users = db.collection("users");

        const exists = await users.findOne({ $or: [{ username }, { email }] });
        if (exists) return res.status(409).json({ message: "Username or email already exists" });

        const password_hash = await bcrypt.hash(password, 10);
        
        const result = await users.insertOne({
            username,
            email,
            password_hash,
            first_name: null,
            last_name: null,
            weight: null,
            age: null,
            gender: null,
            created_at: new Date(),
            updated_at: new Date(),
        });
      
        return res.status(201).json({ userId: result.insertedId.toString() });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error" });
        }
});
  

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body || {};
        if (!username || !password) {
            return res.status(400).json({ message: 'Missing fields' });
        }
  
        const db = await getDb();
        const user = await db.collection("users").findOne({ username });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const ok = await bcrypt.compare(password, user.password_hash);
        if (!ok) return res.status(401).json({ message: "Invalid credentials" });

        return res.json({ userId: user._id.toString() });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error" });
        }
});

app.post("/heartbeat", async (req, res) => {
    try {
      const { userId, bpm } = req.body || {};
      if (!userId || bpm === undefined) {
        return res.status(400).json({ message: "Missing userId or bpm" });
      }
  
      const status = Number(bpm) < 60 ? "ASLEEP" : "AWAKE";
  
      const db = await getDb();
      await db.collection("heartbeats").insertOne({
        userId: new ObjectId(userId),
        bpm: Number(bpm),
        status,
        created_at: new Date(),
      });
  
      return res.json({ ok: true, status });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  });

app.get("/latest-heartbeat/:userId", async (req, res) => {
    try {
      const db = await getDb();
      const hb = await db.collection("heartbeats").findOne(
        { userId: new ObjectId(req.params.userId) },
        { sort: { created_at: -1 } }
      );
      return res.json(hb || null);
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: "Bad user id" });
    }
  });
  
  
  app.get("/users/:id", async (req, res) => {
    try {
      const db = await getDb();
      const user = await db.collection("users").findOne(
        { _id: new ObjectId(req.params.id) },
        { projection: { password_hash: 0 } }
      );
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      user.id = user._id.toString();
      delete user._id;
      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: "Bad user id" });
    }
  });
  
  app.put('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { first_name, last_name, weight, age, gender } = req.body || {};
    
        const db = await getDb();
        await db.collection("users").updateOne(
          { _id: new ObjectId(userId) },
          {
            $set: {
              first_name: first_name ?? null,
              last_name: last_name ?? null,
              weight: weight ?? null,
              age: age ?? null,
              gender: gender ?? null,
              updated_at: new Date(),
            },
          }
        );
    
        return res.json({ message: "Profile updated" });
      } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Bad user id" });
      }
});

app.listen(8080,'0.0.0.0', () => {
    console.log('server listening on port 8080');
});
