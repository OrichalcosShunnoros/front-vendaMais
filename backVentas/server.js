const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())

const productRoutes = require('./routes/products')
const clientRoutes = require('./routes/clients')
const saleRoutes = require('./routes/sales')

app.use('/products', productRoutes)
app.use('/clients', clientRoutes)
app.use('/sales', saleRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
