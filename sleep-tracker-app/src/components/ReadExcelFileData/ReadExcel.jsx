import React, { useState } from 'react';
import * as XLSX from 'xlsx'; //

const ExcelReader = () => {
  const [excelData, setExcelData] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      readExcel(file);
    }
  };

  const readExcel = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'array' }); //
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert worksheet to JSON array of objects
      const json = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(json);
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    reader.readAsArrayBuffer(file); // Read the file as an array buffer
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv, .xlsx, .xls" // Restrict file types
        onChange={handleFileChange}
      />
      
      {/* Display the data (optional) */}
      {excelData.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(excelData[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excelData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{String(value)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExcelReader;
