import React, { useState, useEffect } from 'react'
import axios from 'axios'

const TransactionList = () => {
  const [transactions, setTransactions] = useState([])
  const [editStatus, setEditStatus] = useState({})
  const userId = 1

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`/api/transactions?user_id=${userId}`)
      setTransactions(response.data.transactions)
    } catch (error) {
      console.error("Error fetching transactions:", error)
    }
  };

  const handleStatusUpdate = async (transactionId) => {
    if (!editStatus[transactionId]) return

    try {
      const response = await axios.put(`/api/transactions/${transactionId}/`, {
        status: editStatus[transactionId],
      })
      console.log("Updated transaction:", response.data)
      fetchTransactions()
    } catch (error) {
      console.error("Error update status:", error)
    }
  }

  const handleDelete = async (transactionId) => {
    try {
      const response = await axios.delete(`/api/transactions/${transactionId}`)
      console.log('Transaction deleted:', response)
      fetchTransactions()
    } catch (error) {
      console.error("Error deleting transaction:", error)
      alert('Failed to delete transaction')
    }
  }

  const handleUpdateStatus = async (transactionId, newStatus) => {
    try {
      await axios.put(`/api/transactions/${transactionId}`, { status: newStatus })
      fetchTransactions()
    } catch (error) {
      console.error("Error status:", error)
    }
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">All Transactions</h3>
        <button onClick={fetchTransactions} className="bg-blue-500 text-white px-4 py-2 rounded">
          Refresh
          </button>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Timestamp</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={transaction.transaction_id}>
              <td className="border px-4 py-2">{index + 1}</td> 
              <td className="border px-4 py-2">{transaction.amount}</td>
              <td className="border px-4 py-2">{transaction.transaction_type}</td>
              <td className="border px-4 py-2">
              <select
                  value={transaction.status}
                  onChange={(e) => handleUpdateStatus(transaction._id, e.target.value)}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="FAILED">FAILED</option>
                </select>
              </td>
              <td className="border px-4 py-2">{new Date(transaction.timestamp).toLocaleString()}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleStatusUpdate(transaction.transaction_id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(transaction._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList
