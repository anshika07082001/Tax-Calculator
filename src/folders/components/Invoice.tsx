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
        {props.incomeInp.map((item) => {
          return (
            <p>
              {item.label.toLocaleUpperCase()} : &nbsp;&nbsp;
              {item.value}
            </p>
          );
        })}
        {props.deductionInp.map((item) => {
          return (
            <p>
              {item.label} -&nbsp;&nbsp;
              {item.value}
            </p>
          );
        })}
        <p>
          {props.checkInp
            ? "live in Delhi, Mumbai, Kolkata or Chennai"
            : "Not lives in Delhi, Mumbai, Kolkata or Chennai"}
        </p>
        <h4>Outputs</h4>
        {/* total salary calculated */}
        <p>Total Salary : &nbsp;&nbsp; {props.calculateFinal.totalSalary}</p>
        <p>
          {/* total deduction calculated */}
          Total Deduction : &nbsp;&nbsp; {props.calculateFinal.totalDeduction}
        </p>
        {/* total taxable income calculated */}
        <p>
          Taxable Income : &nbsp;&nbsp; {props.calculateFinal.taxableIncome}
        </p>
        {/* existing regime calculated */}
        <p>
          Existing Tax Regime : &nbsp;&nbsp; {props.calculateFinal.existTax}
        </p>
        {/* new regime calculated */}
        <p>New Tax Regime : &nbsp;&nbsp; {props.calculateFinal.newTax}</p>
      </div>
    </div>
  );
};

export default Invoice;
