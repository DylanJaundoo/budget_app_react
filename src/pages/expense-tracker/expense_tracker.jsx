import React, { useState } from 'react';
import { useAddTransaction } from '../../hooks/useAddTransaction';

export const ExpenseTracker = () => {

  const {addTransaction} = useAddTransaction();

  const [description, setDescripton] = useState("");
  const [transactionAmount,setTransactionAmount] = useState(0);
  const [transactionType,setTransactionType] = useState("expense");


  const onSubmit = async (e) => {
    e.preventDefault();
    addTransaction({description,transactionAmount,transactionType})
  }

  return (
    <>
    <div className='expense-tracker'>
      <div className="container">
        <h1>Expense Tracker</h1>
        <div className="balance">
          <h3>Your Balance</h3>
          <h2>$100</h2>
        </div>
        <div className="summary">
          <div className="income">
            <h4>Income</h4>
            <p>$100</p>
          </div>
          <div className="expenses">
            <h4>Expsneses</h4>
            <p>$100</p>
          </div>
        </div>
        <form className="add-transaction" onSubmit={onSubmit}>
          <input 
          type="text" 
          placeholder='Transaction' 
          required 
          onChange={(e) => setDescripton(e.target.value)}/>
          <input type="number" placeholder='Amount' required 
          onChange={(e) => setTransactionAmount(e.target.value)}
          />
          <input type="radio" id='expense' value="expense" 
          required
          onChange={(e) => setTransactionType(e.target.value)} 
          checked = {transactionType === "expense"}
          />
          <label htmlFor="expense">Expense</label>
          <input type="radio" id='income' value="income" 
          required 
          onChange={(e) => setTransactionType(e.target.value)}
          checked = {transactionType === "income"}
          />
          <label htmlFor="income">Income</label>


          <button type='submit'>Transaction</button>
        </form>
      </div>
    </div>

    <div className="transactions">
      <h3>Transactions</h3>
    </div>
    </>
  )
}


