const fs = require('fs').promises;

const readFile = async () => {
  const file = await fs.readFile('./talker.json', 'utf8');
  return JSON.parse(file);
};

const writeFile = async (content) => {
  const fileContent = JSON.stringify(content);
  await fs.writeFile('./talker.json', fileContent);
};

module.exports = { readFile, writeFile };