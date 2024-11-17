const fs = require("fs");
const path = require("path");

// Base path for data files
const dataPath = path.join(process.cwd(), "src", "data");

// Utility to read data from a JSON file
const readData = (fileName) => {
  try {
    const filePath = path.join(dataPath, fileName);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (err) {
    console.error(`Error reading file: ${fileName}`, err);
    return [];
  }
};

// Utility to write data to a JSON file
const writeData = (fileName, data) => {
  try {
    const filePath = path.join(dataPath, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error writing file: ${fileName}`, err);
  }
};

// Utility to update an entry in a JSON file
const updateEntry = (fileName, id, updatedData) => {
  const data = readData(fileName);
  const index = data.findIndex((item) => item.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedData };
    writeData(fileName, data);
    return true;
  }
  return false;
};

// Utility to delete an entry in a JSON file
const deleteEntry = (fileName, id) => {
  const data = readData(fileName);
  const filteredData = data.filter((item) => item.id !== id);
  writeData(fileName, filteredData);
  return filteredData.length < data.length; // Return true if an entry was deleted
};

module.exports = {
  readData,
  writeData,
  updateEntry,
  deleteEntry,
};
