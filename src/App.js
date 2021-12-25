import React, { useState } from 'react';
import './css/app.css';
import { v4 as uuid } from 'uuid';

//COMPONENTS
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';

const initialExpenses = [
  { id: uuid(), charge: 'car payment', amount: 1233 },
  { id: uuid(), charge: 'water', amount: 163 },
  { id: uuid(), charge: 'department', amount: 2000 },
];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);

  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');

  const [alert, setAlert] = useState({ show: false });

  const [edit, setEdit] = useState(false);

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleAlert = ({ type, msg }) => {
    setAlert({ show: true, type, msg });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(charge, amount);

    if (charge !== '' && amount > 0) {
      var singleExpense = { id: uuid(), charge, amount };
      setExpenses([...expenses, singleExpense]);
      setCharge('');
      setAmount('');
      handleAlert({
        type: 'success',
        msg: 'Se ha añadido el gasto a la lista',
      });
    } else {
      handleAlert({ type: 'danger', msg: 'Los campos están vacios' });
    }
  };

  const handleClear = () => {
    setExpenses([]);
    handleAlert({ type: 'success', msg: 'Se han eliminado todos los gastos' });
  };

  const handleDelete = (id) => {
    var tempExpenses = expenses.filter((expense) => {
      expense.id !== id;
    });
    setExpenses([tempExpenses]);
    handleAlert({ type: 'success', msg: 'Se ha eliminado un gasto' });
  };

  const handleEdit = (id) => {
    console.log('edit ' + id);
  };

  return (
    <div>
      {alert.show && <Alert type={alert.type} msg={alert.msg} />}
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

        <ExpenseList
          expenses={expenses}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleClear={handleClear}
        />
      </main>

      <h1>
        Gastos totales:
        <span className="total">
          $
          {expenses.reduce((total, current) => {
            return (total += parseInt(current.amount));
          }, 0)}
        </span>
      </h1>
    </div>
  );
}

export default App;
