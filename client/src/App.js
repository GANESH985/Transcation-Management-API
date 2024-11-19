import React from 'react'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import axios from 'axios'

function App() {
  const handleTransactionSubmit = (transactionData) => {
    console.log("Payload to be sent:", transactionData)
    axios.post("https://transcation-management-api.onrender.com/api/transactions", transactionData)
      .then((response) => {
        console.log("Transaction Created:", response.data)
      })
      .catch((error) => {
        console.error("Error creating transaction:", error.response?.data || error.message)
      })
  }

  return (
    <div className="App">
      <h1 className="text-2xl font-bold flex justify-center pt-6">Transaction Management</h1>
      <TransactionForm onSubmit={handleTransactionSubmit} />
      <TransactionList />
    </div>
  )
}

export default App
