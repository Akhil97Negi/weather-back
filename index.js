const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 6440;
const FILE_PATH = path.join(__dirname, 'favorites.json');

app.use(bodyParser.json());

// Helper function to read JSON file
const readFile = () => {
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
};

// Helper function to write JSON file
const writeFile = (data) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
};

// POST endpoint to add a favorite
app.post('/favorites', (req, res) => {
  const { item } = req.body;
  if (!item) {
    return res.status(400).json({ error: 'Item is required' });
  }

  const data = readFile();
  data.favorites.push(item);
  writeFile(data);

  res.status(201).json({ message: 'Item added successfully', item });
});

// DELETE endpoint to remove a favorite
app.delete('/favorites', (req, res) => {
  const { item } = req.body;
  if (!item) {
    return res.status(400).json({ error: 'Item is required' });
  }

  let data = readFile();
  data.favorites = data.favorites.filter(fav => fav !== item);
  writeFile(data);

  res.status(200).json({ message: 'Item removed successfully', item });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
