import { Button } from "@mui/material";
import React, { useState } from "react";
import Deduction from "./Deduction";
import DotsMobileStepper from "./DotsMobileStepper";
import Income from "./Income";
import Invoice from "./Invoice";

var deduction: number = 0;
var HRA2: number = 0;
var HRA3: number = 0;

const Main = () => {
  // state for stepper
  const [activeStep, setActiveStep] = useState(0);
  // state for income inputs
  var [incomeInp, setIncomeInp] = useState([
    { label: "Yearly Basic Salary", value: "", error: false },
    { label: "Yearly HRA", value: "", error: false },
    { label: "Yearly LTA", value: "", error: false },
    { label: "Yearly Other Allowance", value: "", error: false },
  ]);
  // state for deduction inputs
  var [deductionInp, setDeductionInp] = useState([
    { label: "80C", value: "", max: 150000, error: false },
    { label: "80D", value: "", max: 12000, error: false },
    { label: "80TTA", value: "", max: 8000, error: false },
  ]);
  // state for checkbox
  var [checkInp, setCheckInp] = useState(false);
  // state for rent input
  var [rentInp, setrentInp] = useState({
    label: "Yearly Rent Paid",
    error: false,
    value: "",
  });
  // state for final calculation
  var [calculateFinal, setcalculateFinal] = useState({
    totalSalary: 0,
    totalDeduction: 0,
    taxableIncome: 0,
    newTax: 0,
    existTax: 0,
  });

  // old tax regime array
  var oldTaxArr = [
    { min: 0, max: 250000, above: 0, percent: 0, addVal: 0 },
    { min: 250000, max: 500000, above: 250000, percent: 5, addVal: 0 },
    { min: 500000, max: 1000000, above: 500000, percent: 20, addVal: 12500 },
    {
      min: 1000000,
      max: Number.POSITIVE_INFINITY,
      above: 1000000,
      percent: 30,
      addVal: 112500,
    },
  ];
  // new tax regime array
  var newTaxArr = [
    { min: 0, max: 250000, above: 0, percent: 0, addVal: 0 },
    { min: 250000, max: 500000, above: 250000, percent: 5, addVal: 0 },
    { min: 500000, max: 750000, above: 500000, percent: 10, addVal: 12500 },
    { min: 750000, max: 1000000, above: 750000, percent: 15, addVal: 37500 },
    { min: 1000000, max: 1250000, above: 1000000, percent: 20, addVal: 75000 },
    {
      min: 1250000,
      max: 1500000,
      above: 1250000,
      percent: 25,
      addVal: 125000,
    },
    {
      min: 1500000,
      max: Number.POSITIVE_INFINITY,
      above: 1500000,
      percent: 30,
      addVal: 187500,
    },
  ];
  // function calculates the taxable income
  const calculateTax = () => {
    incomeInp.map((item) => {
      calculateFinal.totalSalary += parseInt(item.value);
    });
    deductionInp.map((item) => {
      deduction += parseInt(item.value);
    });
    deduction += 50000;
    calculateHRA();
  };
  // function calculates the hra
  const calculateHRA = () => {
    HRA2 = parseInt(rentInp.value) - (10 / 100) * parseInt(incomeInp[0].value);
    if (checkInp) {
      HRA3 = (50 / 100) * parseInt(incomeInp[0].value);
    } else {
      HRA3 = (40 / 100) * parseInt(incomeInp[0].value);
    }
    var hraArr = [parseInt(incomeInp[1].value), HRA2, HRA3];
    var finalHra = hraArr.sort();
    if (finalHra[0] < 0) {
      calculateFinal.totalDeduction = 0;
    } else {
      calculateFinal.totalDeduction = finalHra[0] + deduction;
    }
    calculateFinal.taxableIncome =
      calculateFinal.totalSalary - calculateFinal.totalDeduction;
    setcalculateFinal({ ...calculateFinal });
    taxRegime();
  };
  // function calculates the exists and new tex regime
  const taxRegime = () => {
    oldTaxArr.map((item) => {
      if (
        item.min < calculateFinal.taxableIncome &&
        calculateFinal.taxableIncome <= item.max
      ) {
        calculateFinal.existTax =
          (calculateFinal.taxableIncome - item.above) * (item.percent / 100) +
          item.addVal;
      }
    });

    newTaxArr.map((item) => {
      if (
        item.min < calculateFinal.taxableIncome &&
        calculateFinal.taxableIncome <= item.max
      ) {
        calculateFinal.newTax =
          (calculateFinal.taxableIncome = item.above) * (item.percent / 100) +
          item.addVal;
      }
    });
    setcalculateFinal({ ...calculateFinal });
  };
  // next button handler in stepper
  const handleNext = () => {
    if (activeStep === 0) {
      var flg = true;
      incomeInp.map((item, i) => {
        if (item.value === "") {
          item.error = true;
          flg = false;
        }
        if (item.value !== "") {
          item.error = false;
        }
      });
      setIncomeInp([...incomeInp]);
      if (flg) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
    if (activeStep === 1) {
      var flag = true;
      deductionInp.map((item) => {
        if (item.value !== "") {
          rentInp.error = false;
          if (Number(item.value) > item.max) {
            item.error = true;
            flag = false;
          }
          if (!(Number(item.value) > item.max)) {
            item.error = false;
          }
        }
        if (item.value === "") {
          flag = false;
          item.error = true;
        }
      });
      setDeductionInp([...deductionInp]);
      if (flag) {
        if (rentInp.value === "") {
          rentInp.error = true;
        }
        if (rentInp.value !== "") {
          rentInp.error = false;
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        setrentInp({ ...rentInp });
      }
    }
  };
  // back button handler in stepper
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  // reset button handler in stepper
  const resetTax = () => {
    setActiveStep(0);
    setCheckInp(false);
    incomeInp.map((item) => {
      item.value = "";
      item.error = false;
    });
    setIncomeInp([...incomeInp]);
    deductionInp.map((item) => {
      item.value = "";
      item.error = false;
    });
    setDeductionInp([...deductionInp]);
    setrentInp({ label: "Yearly Rent Paid", error: false, value: "" });
    setcalculateFinal({
      totalSalary: 0,
      totalDeduction: 0,
      taxableIncome: 0,
      newTax: 0,
      existTax: 0,
    });
  };

  return (
    <div className="container">
      {/* Rendering of income component */}
      {activeStep === 0 ? (
        <Income incomeInp={incomeInp} setIncomeInp={setIncomeInp} />
      ) : (
        <></>
      )}
      {/* rendering of deduction component */}
      {activeStep === 1 ? (
        <Deduction
          incomeInp={incomeInp}
          deductionInp={deductionInp}
          setDeductionInp={setDeductionInp}
          checkInp={checkInp}
          setCheckInp={setCheckInp}
          rentInp={rentInp}
          setrentInp={setrentInp}
        />
      ) : (
        <></>
      )}
      {/* Rendering of Invoice component */}
      {activeStep === 2 ? (
        <>
          <Invoice
            calculateTax={calculateTax}
            calculateFinal={calculateFinal}
          />
          <Button onClick={resetTax} variant="contained">
            Reset
          </Button>
        </>
      ) : (
        // rendering of stepper component
        <DotsMobileStepper
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      )}
    </div>
  );
};

export default Main;
