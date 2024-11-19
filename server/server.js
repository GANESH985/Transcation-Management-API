const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const Transaction = require('./models/Transaction')

const app = express()
require('dotenv').config()
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('Error connecting to MongoDB:', err))


app.post('/api/transactions', async (req, res) => {
    try {
      const { amount, transaction_type, user } = req.body
      const newTransaction = new Transaction({
        amount,
        transaction_type,
        user,
        status: 'PENDING',
      })
      const savedTransaction = await newTransaction.save()
      res.status(201).json(savedTransaction)
    } catch (error) {
      console.error('Error transaction:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })

app.get('/api/transactions', async (req, res) => {
  const { user_id } = req.query
  try {
    const transactions = await Transaction.find({ user: user_id })
    res.json({ transactions })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.put('/api/transactions/:transaction_id', async (req, res) => {
  const { transaction_id } = req.params
  const { status } = req.body
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      transaction_id,
      { status },
      { new: true }
    )
    res.json(transaction)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.get('/api/transactions/:transaction_id', async (req, res) => {
  const { transaction_id } = req.params
  try {
    const transaction = await Transaction.findById(transaction_id)
    res.json(transaction)
  } catch (err) {
    res.status(404).json({ error: 'Transaction not found' })
  }
})

app.put('/api/transactions/:id', async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    try {
      const transaction = await Transaction.findByIdAndUpdate(
        id, 
        { status }, 
        { new: true } 
      )
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' })
      }
      res.json(transaction)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Server error' })
    }
  })
  
  app.delete('/api/transactions/:id', async (req, res) => {
    try {
      const transaction = await Transaction.findByIdAndDelete(req.params.id)
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' })
      }
      res.status(200).json({ message: 'Transaction deleted successfully' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error deleting transaction' })
    }
  })
  
  
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
