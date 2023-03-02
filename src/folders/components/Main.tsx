import { Button } from "@mui/material";
import React, { useState } from "react";
import Deduction from "./Deduction";
import DotsMobileStepper from "./DotsMobileStepper";
import Income from "./Income";
import Invoice from "./Invoice";

// var totalSalary: number = 0;
var deduction: number = 0;
// var totalDeduction: number = 0;
// var taxableIncome: number = 0;
var HRA2: number = 0;
var HRA3: number = 0;

const Main = () => {
  const [activeStep, setActiveStep] = useState(0);
  var [incomeInp, setIncomeInp] = useState([
    { label: "Yearly Basic Salary", value: "", error: false },
    { label: "Yearly HRA", value: "", error: false },
    { label: "Yearly LTA", value: "", error: false },
    { label: "Yearly Other Allowance", value: "", error: false },
  ]);
  var [deductionInp, setDeductionInp] = useState([
    { label: "80C", value: "", max: 150000, error: false },
    { label: "80D", value: "", max: 12000, error: false },
    { label: "80TTA", value: "", max: 8000, error: false },
  ]);
  var [checkInp, setCheckInp] = useState(false);
  var [rentInp, setrentInp] = useState({
    label: "Yearly Rent Paid",
    error: false,
    value: "",
  });
  var [calculateFinal, setcalculateFinal] = useState({
    totalSalary: 0,
    totalDeduction: 0,
    taxableIncome: 0,
  });

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
    setcalculateFinal({
      taxableIncome: calculateFinal.taxableIncome,
      totalSalary: calculateFinal.totalSalary,
      totalDeduction: calculateFinal.totalDeduction,
    });
    existingTaxRegime();
    newTaxregime();
  };

  const existingTaxRegime = () => {
    var existTax: number = 0;
    if (calculateFinal.taxableIncome <= 250000) {
      existTax = 0;
    }
    if (
      250000 > calculateFinal.taxableIncome &&
      calculateFinal.taxableIncome <= 500000
    ) {
      existTax = (5 / 100) * (calculateFinal.taxableIncome - 250000);
    }
    if (
      500000 > calculateFinal.taxableIncome &&
      calculateFinal.taxableIncome <= 1000000
    ) {
      existTax = (12500 + 20 / 100) * (calculateFinal.taxableIncome - 500000);
    }
    if (calculateFinal.taxableIncome > 1000000) {
      existTax = (112500 + 30 / 100) * (calculateFinal.taxableIncome - 1000000);
    }
    console.log(existTax);
  };

  const newTaxregime = () => {
    var newTax: number = 0;
    if (calculateFinal.taxableIncome <= 250000) {
      newTax = 0;
    }
    if (
      250000 > calculateFinal.taxableIncome &&
      calculateFinal.taxableIncome <= 500000
    ) {
      newTax = (5 / 100) * (calculateFinal.taxableIncome - 250000);
    }
    if (
      500000 > calculateFinal.taxableIncome &&
      calculateFinal.taxableIncome <= 750000
    ) {
      newTax = (12500 + 10 / 100) * (calculateFinal.taxableIncome - 500000);
    }
    if (
      750000 > calculateFinal.taxableIncome &&
      calculateFinal.taxableIncome <= 1000000
    ) {
      newTax = (37500 + 15 / 100) * (calculateFinal.taxableIncome - 750000);
    }
    if (
      1000000 > calculateFinal.taxableIncome &&
      calculateFinal.taxableIncome <= 1250000
    ) {
      newTax = (75000 + 20 / 100) * (calculateFinal.taxableIncome - 1000000);
    }
    if (
      1250000 > calculateFinal.taxableIncome &&
      calculateFinal.taxableIncome <= 1500000
    ) {
      newTax = (1250000 + 25 / 100) * (calculateFinal.taxableIncome - 1250000);
    }
    if (calculateFinal.taxableIncome > 1500000) {
      newTax = (187500 + 30 / 100) * (calculateFinal.taxableIncome - 1500000);
    }
    console.log(newTax);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="container">
      {activeStep === 0 ? (
        <Income incomeInp={incomeInp} setIncomeInp={setIncomeInp} />
      ) : (
        <></>
      )}
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
      {activeStep === 2 ? (
        <>
          <Invoice
            incomeInp={incomeInp}
            deductionInp={deductionInp}
            checkInp={checkInp}
            calculateTax={calculateTax}
            calculateFinal={calculateFinal}
          />
          <Button>Reset</Button>
        </>
      ) : (
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
