const express = require('express')
const router = express.Router()
const { readFile, writeFile } = require('../utils/fileUtils')

router.get('/', (_, res) => {
  const citiesData = readFile('cities.json')
  res.json(citiesData)
})

router.post('/', (req, res) => {
  const citiesData = readFile('cities.json')
  const newCity = req.body
  newCity.id = citiesData.length + 1
  citiesData.push(newCity)
  writeFile('cities.json', citiesData)
  res.json(newCity)
})

router.put('/:id', (req, res) => {
  const citiesData = readFile('cities.json')
  const cityId = parseInt(req.params.id)
  const updatedCity = req.body

  const cityIndex = citiesData.findIndex(city => city.id === cityId)
  if (cityIndex === -1) return res.status(404).json({ message: 'City not found' })

  citiesData[cityIndex] = { ...citiesData[cityIndex], ...updatedCity }
  writeFile('cities.json', citiesData)

  res.json(citiesData[cityIndex])
})

router.delete('/:id', (req, res) => {
  const citiesData = readFile('cities.json')
  const cityId = parseInt(req.params.id)

  const cityIndex = citiesData.findIndex(city => city.id === cityId)
  if (cityIndex === -1) return res.status(404).json({ message: 'City not found' })

  citiesData.splice(cityIndex, 1)
  writeFile('cities.json', citiesData)

  res.json({ message: `City ${cityId} deleted` })
})

module.exports = router
