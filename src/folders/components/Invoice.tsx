import React, { useEffect } from "react";
import { invoiceProps } from "../type/Type";

const Invoice = (props: invoiceProps) => {
  // console.log(props.deductionInp, props.incomeInp, props.checkInp);
  useEffect(() => {
    props.calculateTax();
  },[]);
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
        <p>Total Salary : &nbsp;&nbsp; {props.calculateFinal.totalSalary}</p>
        <p>
          Total Deduction : &nbsp;&nbsp; {props.calculateFinal.totalDeduction}
        </p>
        <p>
          Taxable Income : &nbsp;&nbsp; {props.calculateFinal.taxableIncome}
        </p>
      </div>
    </div>
  );
};

export default Invoice;
