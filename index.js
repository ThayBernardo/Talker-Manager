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

app.get('/talker/search',
validateToken,
async (req, res) => {
  const { q: name } = req.query;
  const talkers = await readFile();
  const filterName = talkers.filter((talker) => talker.name.includes(name));
  console.log(req);
  if (filterName.length === 0) return res.status(200).json([]);
  return res.status(200).json(filterName);
});

app.get('/talker', async (_req, res) => {
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

app.post('/login', validate, (_req, res) => {
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

app.put('/talker/:id',
validateToken,
validateName,
validateAge,
validateTalk,
validateTalkWatchedAt,
validateTalkRate,
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkers = await readFile();
  const talkerEdit = { id: Number(id), name, age, talk: { watchedAt, rate } };
  const updateTalker = talkers.map((talker) => (talker.id === Number(id) ? talkerEdit : talker));
  await writeFile(updateTalker);
  return res.status(200).json({ ...talkerEdit });
});

app.delete('/talker/:id',
validateToken,
async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const deleteId = talkers.filter((talker) => talker.id !== Number(id));
  await writeFile(deleteId);
  return res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
