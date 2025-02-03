const express = require('express')
const router = express.Router()
const { readFile, writeFile } = require('../utils/fileUtils')

router.get('/', (_, res) => {
  const salesData = readFile('sales.json')
  res.json(salesData)
})

router.post('/', (req, res) => {
  const salesData = readFile('sales.json')
  const clientsData = readFile('clients.json')
  const productsData = readFile('products.json')

  const { clientId, products } = req.body

  const client = clientsData.find(client => client.id === clientId)
  if (!client) return res.status(400).json({ message: 'Client not found' })

  if (!products || products.length < 1) return res.status(400).json({ message: 'At least one product is required' })

  const productsInSale = products.map(product => {
    const productInStock = productsData.find(p => p.id === product.productId)
    if (!productInStock) return null
    return { ...productInStock, quantity: product.quantity }
  }).filter(product => product !== null)

  if (productsInSale.length < products.length) return res.status(400).json({ message: 'Some products not found' })

  const newSale = {
    id: salesData.length + 1,
    clientId: client.id,
    clientName: `${client.first_name} ${client.last_name}`,
    products: productsInSale,
    date: new Date().toISOString()
  }

  salesData.push(newSale)
  writeFile('sales.json', salesData)

  res.json(newSale)
})

router.put('/:id', (req, res) => {
  const salesData = readFile('sales.json')
  const saleId = parseInt(req.params.id)
  const updatedSale = req.body

  const saleIndex = salesData.findIndex(sale => sale.id === saleId)
  if (saleIndex === -1) return res.status(404).json({ message: 'Sale not found' })

  salesData[saleIndex] = { ...salesData[saleIndex], ...updatedSale }
  writeFile('sales.json', salesData)

  res.json(salesData[saleIndex])
})

router.delete('/:id', (req, res) => {
  const salesData = readFile('sales.json')
  const saleId = parseInt(req.params.id)

  const saleIndex = salesData.findIndex(sale => sale.id === saleId)
  if (saleIndex === -1) return res.status(404).json({ message: 'Sale not found' })

  salesData.splice(saleIndex, 1)
  writeFile('sales.json', salesData)

  res.json({ message: `Sale ${saleId} deleted` })
})

module.exports = router
