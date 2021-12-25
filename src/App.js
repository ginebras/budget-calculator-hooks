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

  return (
    <div>
      <Alert />
      <h1>Budget calculator</h1>
      <main className="App">
        <ExpenseForm />
        <ExpenseList />
      </main>
      <h1>
        Total spending:
        <span>
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
