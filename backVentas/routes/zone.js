const express = require('express')
const router = express.Router()
const { readFile, writeFile } = require('../utils/fileUtils')

router.get('/', (_, res) => {
  const zonesData = readFile('zones.json')
  res.json(zonesData)
})

router.post('/', (req, res) => {
  const zonesData = readFile('zones.json')
  const newZone = req.body
  newZone.id = zonesData.length + 1
  zonesData.push(newZone)
  writeFile('zones.json', zonesData)
  res.json(newZone)
})

router.put('/:id', (req, res) => {
  const zonesData = readFile('zones.json')
  const zoneId = parseInt(req.params.id)
  const updatedZone = req.body

  const zoneIndex = zonesData.findIndex(zone => zone.id === zoneId)
  if (zoneIndex === -1) return res.status(404).json({ message: 'Zone not found' })

  zonesData[zoneIndex] = { ...zonesData[zoneIndex], ...updatedZone }
  writeFile('zones.json', zonesData)

  res.json(zonesData[zoneIndex])
})

router.delete('/:id', (req, res) => {
  const zonesData = readFile('zones.json')
  const zoneId = parseInt(req.params.id)

  const zoneIndex = zonesData.findIndex(zone => zone.id === zoneId)
  if (zoneIndex === -1) return res.status(404).json({ message: 'Zone not found' })

  zonesData.splice(zoneIndex, 1)
  writeFile('zones.json', zonesData)

  res.json({ message: `Zone ${zoneId} deleted` })
})

module.exports = router
