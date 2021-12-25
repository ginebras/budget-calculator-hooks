import React from 'react';
import ExpenseItems from './ExpenseItems';

const ExpenseList = ({ expenses, handleEdit, handleDelete, handleClear }) => {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <ExpenseItems
              key={expense.id}
              expense={expense}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          );
        })}
      </ul>

      {expenses.length > 0 && <button className="btn">Limpiar gastos</button>}
    </>
  );
};

export default ExpenseList;
