import React, { useState } from 'react';
import './css/app.css';
import { v4 as uuidv4 } from 'uuidv4';

//COMPONENTS
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';

const initialExpenses = [
  { id: 1, charge: 'car payment', amount: 1233 },
  { id: 2, charge: 'water', amount: 163 },
  { id: 3, charge: 'department', amount: 2000 },
];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);

  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');

  const handleCharge = (e) => {
    setCharge(e.target.value);
    console.log('charge=' + e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.targe.value);
    console.log(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit ejecutado');
  };

  return (
    <div>
      <Alert />
      <h1>Calculadora de gastos</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
        />
        <ExpenseList expenses={expenses} />
      </main>
      <h1>
        Gastos totales:
        <span className="total">
          $
          {expenses.reduce((total, current) => {
            return (total += current.amount);
          }, 0)}
        </span>
      </h1>
    </div>
  );
}

export default App;
