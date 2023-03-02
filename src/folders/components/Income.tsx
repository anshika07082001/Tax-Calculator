import { TextField } from "@mui/material";
import React from "react";
import { incomeProps } from "../type/Type";

const Income = (props: incomeProps) => {
  // income change handler for input box
  const incChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    item: any
  ) => {
    let value = e.currentTarget.value;
    if (value.match(/^[0-9]*$/)) {
      props.incomeInp.map((ele) => {
        if (item.label == ele.label) {
          ele.value = value;
        }
      });
    } else {
      e.currentTarget.value.slice(-1);
    }
    props.setIncomeInp([...props.incomeInp]);
  };

  return (
    <div className="income">
      <h2>Income Details</h2>
      <form className="income__form">
        {/* dynamic rendering of input boxes */}
        {props.incomeInp.map((item, i) => {
          return (
            <TextField
              error={item.error}
              id="outlined-basic"
              key={i}
              label={`${item.label}*`}
              variant="outlined"
              type="text"
              onChange={(e) => incChangeHandler(e, item)}
              value={item.value}
            />
          );
        })}
      </form>
    </div>
  );
};

export default Income;
