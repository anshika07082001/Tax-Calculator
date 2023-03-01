import { Button, TextField } from "@mui/material";
import React from "react";
import { incomeProps } from "../type/Type";

const Income = (props: incomeProps) => {
  // onchange handler
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

  //   submit handler
//   const incomeHandler = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//   };

  return (
    <div className="income">
      <h2>Income Details</h2>
      <form className="income__form">
        {props.incomeInp.map((item, i) => {
          return (
            <TextField
              id="outlined-basic"
              key={i}
              label={item.label}
              variant="outlined"
              type="text"
              onChange={(e) => incChangeHandler(e, item)}
              value={item.value}
            />
          );
        })}
        {/* <Button variant="contained" type="submit">
          Submit
        </Button> */}
      </form>
    </div>
  );
};

export default Income;
