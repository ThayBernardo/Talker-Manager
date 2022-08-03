const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { readFile, writeFile } = require('./fs.js');
const { validate } = require('./Middlewares/validationEmailAndPassword');
const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkWatchedAt,
  validateTalkRate,
} = require('./Middlewares/validationPOSTinTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const persons = await readFile();
  if (!persons) return res.status(200).json([]);
  return res.status(200).json(persons);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const persons = await readFile();
  const personId = persons.find((person) => Number(person.id) === Number(id));
  if (personId) return res.status(200).json(personId);
  if (!personId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', validate, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});

app.post('/talker', 
validateToken,
validateName,
validateAge,
validateTalk,
validateTalkRate,
validateTalkWatchedAt,
async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await readFile();
  const newTalker = { id: talkers.length + 1, name, age, talk };

  talkers.push(newTalker);

  await writeFile(talkers);

  res.status(201).json(newTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
