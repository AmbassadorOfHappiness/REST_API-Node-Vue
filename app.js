const express = require('express');
const path = require('path');
const {v4} = require('uuid');
const app = express();

let CONTACTS = [
  {id: v4(), name: "Vovan", value: '937-999-2', marked: false},
]

app.use(express.json()) //ДЛЯ РАБОТЫ С REQUEST (req)

app.get('/api/contacts', (req, res) => {
  setTimeout (() => {
    res.status(200).json(CONTACTS);
  }, 1000)
})

app.post('/api/contacts', (req, res) => {
  const contact = {...req.body, id: v4(), marked: false};
  CONTACTS.push(contact);
  res.status(201).json(contact)
})

app.delete('/api/contacts/:id', (req, res) => {
  CONTACTS = CONTACTS.filter(c => c.id !== req.params.id);
  res.status(200).json({message: 'Contact deleted'})
})

app.put('/api/contacts/:id', (req, res) => {
  const idx = CONTACTS.findIndex(c => c.id === req.params.id)
  CONTACTS[idx] = req.body
  res.json(CONTACTS[idx])
})

// app.put('/api/contacts/:id', (req, res) => {
//   const idx = CONTACTS.findIndex(c => c.id === req.params.id)
//   CONTACTS[idx] = req.body;
//   res.json(CONTACTS[idx]);
// })

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
}) //ЛЮБЫЕ GET ЗАПРОСЫ

app.listen(3000, () => console.log('Server has been started on port 3000...'));