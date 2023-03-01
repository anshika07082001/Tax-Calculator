import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React from "react";
import { deductionprops } from "../type/Type";

const Deduction = (props: deductionprops) => {
  const deductionhandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    item: any
  ) => {
    var val = e.currentTarget.value;
    if (val.match(/^[0-9]*$/)) {
      props.deductionInp.map((ele) => {
        if (item.label === ele.label) {
          if (Number(val) < 150000) {
            ele.value=val
          } 
          // else {
          //   ele.error = true;
          // }
        }
        if (item.label === ele.label) {
        }
        if (item.label === ele.label) {
        }
      });
    } else {
      e.currentTarget.value.slice(-1);
    }
    props.setDeductionInp([...props.deductionInp]);
  };

  return (
    <div className="deduction">
      <h2>Deductions</h2>
      <form className="deduction__form">
        {props.deductionInp.map((item, i) => {
          return (
            <TextField
              error={item.error}
              id="outlined-error-helper-text"
              label={item.label}
              value={item.value}
              helperText={`Maximum Value : ${item.max}`}
              onChange={(e) => deductionhandler(e, item)}
            />
          );
        })}
        <TextField
          disabled
          id="outlined-disabled"
          label="Disabled"
          defaultValue="Standard Deduction is ₹50,000"
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Do You live in Metro City"
        />

        <Button variant="contained">Submit</Button>
      </form>
    </div>
  );
};

export default Deduction;
