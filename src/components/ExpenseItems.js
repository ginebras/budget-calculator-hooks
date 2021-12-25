import React from 'react';

const ExpenseItems = ({ expense }) => {
  const { id, charge, amount } = expense;

  return (
    <li className="item">
      <div className="info">
        <span className="expense">{charge}</span>
        <span className="amount">${amount}</span>
      </div>
      <div>
        <button className="btn btn-success">EDITAR</button>
        <button className="btn btn-danger">ELIMINAR</button>
      </div>
    </li>
  );
};

export default ExpenseItems;
