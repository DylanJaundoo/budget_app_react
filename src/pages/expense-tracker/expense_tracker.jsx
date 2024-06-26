import React, { useState } from 'react';
import { useAddTransaction } from '../../hooks/useAddTransaction';
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import {useNavigate} from "react-router-dom" 
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import "./styles.css";

export const ExpenseTracker = () => {

  //Custom Hook Imports 
  const {addTransaction} = useAddTransaction();
  const {transactions,transactionTotals} = useGetTransactions();
  const {name, profilePhoto} = useGetUserInfo();
  const navigate = useNavigate();

//State imports 
  const [description, setDescripton] = useState("");
  const [transactionAmount,setTransactionAmount] = useState(0);
  const [transactionType,setTransactionType] = useState("expense");
  
  //Destructuring Transaction Totals to make it usable. 
  const {balance, income, expenses} = transactionTotals;


  const onSubmit = async (e) => {
    e.preventDefault();
    addTransaction({description,transactionAmount,transactionType});
    
    setDescripton("");
    setTransactionAmount(0);
  }

  //Sign Out Button, Clearling local storage.
  const signUserOut = async () => {
    try{
      await signOut(auth);
      localStorage.clear();
      navigate("/")
    }
    catch (error){
      console.error(error);
    }
  }

  //UI
  return (
    <>
    <div className='expense-tracker'>
    {profilePhoto && (
        <div className='details'>
          <img src={profilePhoto}/>
          <button onClick={signUserOut}>Sign Out</button>
        </div>
      )}
      <div className="balance-container">
        <h1>{name}'s Expense Tracker</h1>       
      <div className="summary">
        <div className='balance'>
          <h3>Your Balance</h3>
          <h2>${balance}</h2>
        </div>
      <div className="income">
          <h4>Income</h4>
          <p>${income}</p>
      </div>
      <div className="expenses">
           <h4>Expenses</h4>
           <p>${expenses}</p>
     </div>
        </div>
        <form className="add-transaction" onSubmit={onSubmit}>
          <input 
          type="text" 
          placeholder='Transaction' 
          required 
          value={description}
          onChange={(e) => setDescripton(e.target.value)}/>
          <input type="number"
           placeholder='Amount'
           value={transactionAmount} 
           required 
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
          <button  className='transaction-btn' type='submit'>Submit</button>
        </form>
      </div>
    </div>

    <div className="transactions">
      <h3>Transactions</h3>
        {transactions.map((trans) => {
            const { description, transactionAmount, transactionType } =
            trans;
            return (
              <>
                <div className='transaction-entry'>
                  <div className='description'><h4>{description}</h4></div>
                  <div className='amount'>
                    <p> - {transactionAmount}</p>
                    <p className='type' style={{ color: transactionType === "expense" ? "red" : "green", }}>{transactionType}</p>
                  </div>
                </div>
              </>
            );
        })}
      </div>
    </>
  )
}



