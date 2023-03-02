import React, { useEffect } from "react";
import { invoiceProps } from "../type/Type";

const Invoice = (props: invoiceProps) => {
  // calling calculateTax function when component renders
  useEffect(() => {
    props.calculateTax();
  }, []);

  return (
    <div>
      <h3>Results</h3>
      <div className="results">
        {/* total salary calculated */}
        <p>
          Total Salary : &nbsp;&nbsp; ₹
          {parseInt(props.calculateFinal.totalSalary.toString())}
        </p>
        <p>
          {/* total deduction calculated */}
          Total Deduction : &nbsp;&nbsp; ₹
          {parseInt(props.calculateFinal.totalDeduction.toString())}
        </p>
        {/* total taxable income calculated */}
        <p>
          Taxable Income : &nbsp;&nbsp; ₹
          {parseInt(props.calculateFinal.taxableIncome.toString())}
        </p>
        {/* existing regime calculated */}
        <p>
          Existing Tax Regime : &nbsp;&nbsp; ₹
          {parseInt(props.calculateFinal.existTax.toString())}
        </p>
        {/* new regime calculated */}
        <p>
          New Tax Regime : &nbsp;&nbsp; ₹
          {parseInt(props.calculateFinal.newTax.toString())}
        </p>
      </div>
    </div>
  );
};

export default Invoice;
