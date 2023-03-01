import React, { useState } from "react";
import Deduction from "./Deduction";
import DotsMobileStepper from "./DotsMobileStepper";
import Income from "./Income";
import Invoice from "./Invoice";

const Main = () => {
  const [activeStep, setActiveStep] = useState(0);
  var [incomeInp, setIncomeInp] = useState([
    { label: "Salary", value: "" },
    { label: "HRA", value: "" },
    { label: "LTA", value: "" },
    { label: "Other", value: "" },
  ]);
  var [deductionInp,setDeductionInp]=useState([
    {label:'80C',value:'',max:150000,error:false},
    {label:'80D',value:'',max:12000,error:false},
    {label:'80TTA',value:'',max:8000,error:false}
  ])

  const handleNext = () => {
    var flg = true;
    incomeInp.map((item) => {
      if (item.value === "") {
        flg = false;
      }
    });
    if (flg) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    else{
      alert('fill all fields')
    }
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
      {activeStep === 1 ? <Deduction incomeInp={incomeInp} deductionInp={deductionInp} setDeductionInp={setDeductionInp}/> : <></>}
      {activeStep === 2 ? <Invoice /> : <></>}
      <DotsMobileStepper
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </div>
  );
};

export default Main;
