import React from 'react';
import './Heart.css';

export default function Heart({ left, duration }) {
  return <div className="heart" style={{ left: `${left}%`, animationDuration: `${duration}s` }} />;
}