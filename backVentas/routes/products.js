const express = require('express')
const router = express.Router()
const { readFile, writeFile } = require('../utils/fileUtils')

router.get('/', (_, res) => {
  const productsData = readFile('products.json')
  res.json(productsData)
})

router.post('/', (req, res) => {
  const productsData = readFile('products.json')
  const newProduct = req.body
  newProduct.id = productsData.length + 1
  productsData.push(newProduct)
  writeFile('products.json', productsData)
  res.json(`Product ${newProduct.id}, ${newProduct.name} created`)
})

router.put('/:id', (req, res) => {
  const productsData = readFile('products.json')
  const productId = parseInt(req.params.id)
  const updatedProduct = req.body

  const productIndex = productsData.findIndex(product => product.id === productId)
  if (productIndex === -1) return res.status(404).json({ message: 'Product not found' })

  productsData[productIndex] = { ...productsData[productIndex], ...updatedProduct }
  writeFile('products.json', productsData)

  res.json(productsData[productIndex])
})

router.delete('/:id', (req, res) => {
  const productsData = readFile('products.json')
  const productId = parseInt(req.params.id)

  const productIndex = productsData.findIndex(product => product.id === productId)
  if (productIndex === -1) return res.status(404).json({ message: 'Product not found' })

  // Eliminar producto
  productsData.splice(productIndex, 1)
  writeFile('products.json', productsData)

  res.json({ message: `Product ${productId}, ${productsData[productIndex].name} deleted` })
})

module.exports = router
