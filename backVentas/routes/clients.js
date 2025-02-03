const express = require('express')
const router = express.Router()
const { readFile, writeFile } = require('../utils/fileUtils')

router.get('/', (_, res) => {
  const clientsData = readFile('clients.json')
  res.json(clientsData)
})

router.post('/', (req, res) => {
  const clientsData = readFile('clients.json')
  const newClient = req.body
  newClient.id = clientsData.length + 1
  clientsData.push(newClient)
  writeFile('clients.json', clientsData)
  res.json(newClient)
})

router.put('/:id', (req, res) => {
  const clientsData = readFile('clients.json')
  const clientId = parseInt(req.params.id)
  const updatedClient = req.body

  const clientIndex = clientsData.findIndex(client => client.id === clientId)
  if (clientIndex === -1) return res.status(404).json({ message: 'Client not found' })

  clientsData[clientIndex] = { ...clientsData[clientIndex], ...updatedClient }
  writeFile('clients.json', clientsData)

  res.json(clientsData[clientIndex])
})

router.delete('/:id', (req, res) => {
  const clientsData = readFile('clients.json')
  const clientId = parseInt(req.params.id)

  const clientIndex = clientsData.findIndex(client => client.id === clientId)
  if (clientIndex === -1) return res.status(404).json({ message: 'Client not found' })

  clientsData.splice(clientIndex, 1)
  writeFile('clients.json', clientsData)

  res.json({ message: `Client ${clientId} deleted` })
})

module.exports = router
