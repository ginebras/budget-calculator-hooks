import React, { useState, useEffect } from 'react';
import './css/app.css';
import { v4 as uuid } from 'uuid';

//COMPONENTS
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';

/*const initialExpenses = [
  { id: uuid(), charge: 'car payment', amount: 1233 },
  { id: uuid(), charge: 'water', amount: 163 },
  { id: uuid(), charge: 'department', amount: 2000 },
];*/

var initialExpenses = [];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);

  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');

  const [alert, setAlert] = useState({ show: false });

  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    console.log('useEffect ejecutado');

    initialExpenses = localStorage.getItem('expenses')
      ? JSON.parse(localStorage.getItem('expenses'))
      : [];

    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

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

    if (charge !== '' && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: 'success', msg: 'Se ha editado un gasto' });
      } else {
        var singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({
          type: 'success',
          msg: 'Se ha añadido el gasto a la lista',
        });
      }

      setCharge('');
      setAmount('');
      setEdit(false);
    } else {
      handleAlert({ type: 'danger', msg: 'Los campos están vacios' });
    }
  };

  const handleClear = () => {
    if (!expenses) {
      handleAlert({ type: 'danger', msg: 'No hay gastos qué eliminar' });
    } else {
      setExpenses([]);
    }
    handleAlert({ type: 'success', msg: 'Se han eliminado todos los gastos' });
  };

  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: 'success', msg: 'Se ha eliminado un gasto' });
  };

  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id == id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
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
          edit={edit}
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
