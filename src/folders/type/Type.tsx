import React from "react";

export type stepperprops = {
  activeStep: number;
  handleBack: () => void;
  handleNext: () => void;
};

export type incomeProps = {
  incomeInp: incomeInp[];
  setIncomeInp: React.Dispatch<React.SetStateAction<incomeInp[]>>;
};

export type deductionprops = {
  incomeInp: incomeInp[];
  deductionInp: deductionInp[];
  setDeductionInp:React.Dispatch<React.SetStateAction<deductionInp[]>>
};

export type incomeInp = {
  label: string;
  value: string;
};
export type deductionInp = {
  label: string;
  value: string;
  max: number;
  error:boolean;
};
