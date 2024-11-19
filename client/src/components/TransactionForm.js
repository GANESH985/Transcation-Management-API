import { useState } from 'react'

function TransactionForm({ onSubmit }) {
  const [amount, setAmount] = useState('')
  const [transactionType, setTransactionType] = useState('DEPOSIT')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      const payload = {
        amount: parseFloat(amount),
        transaction_type: transactionType,
        user: "1",
      }
      onSubmit(payload)
      setAmount('')
    }
  }
  return (
    <form className="p-4 m-14" onSubmit={handleSubmit}>
      <div>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Transaction Type</label>
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="DEPOSIT">Deposit</option>
          <option value="WITHDRAWAL">Withdrawal</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 mt-4 rounded">Submit</button>
    </form>
  )
}

export default TransactionForm
