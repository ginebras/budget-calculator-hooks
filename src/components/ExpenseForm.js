import React from 'react';

const ExpenseForm = ({
  charge,
  amount,
  handleCharge,
  handleSubmit,
  handleAmount,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">Gasto</label>
          <input
            type="text"
            placeholder="e.g. renta"
            name="charge"
            className="form-control"
            id="charge"
            value={charge}
            onChange={handleCharge}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Cantidad</label>
          <input
            type="text"
            placeholder="e.g. cantidad"
            name="amount"
            className="form-control"
            id="amount"
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      <button className="btn btn-primary" type="submit">
        Agregar gasto
      </button>
    </form>
  );
};

export default ExpenseForm;
