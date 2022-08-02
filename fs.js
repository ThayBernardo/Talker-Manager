const fs = require('fs').promises;

const readFile = async () => {
    const file = await fs.readFile('./talker.json', 'utf8');
    return JSON.parse(file);
};

const writeFile = async (content) => {
    const file = await fs.writeFile('./talker.json', content);
    return JSON.stringify(file);
};

module.exports = { readFile, writeFile };