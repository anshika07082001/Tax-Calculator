import React from "react";

// type for DotsMobileStepper components props
export type stepperprops = {
  activeStep: number;
  handleBack: () => void;
  handleNext: () => void;
};

// type for income component props
export type incomeProps = {
  incomeInp: incomeInp[];
  setIncomeInp: React.Dispatch<React.SetStateAction<incomeInp[]>>;
};

// type for deduction component props
export type deductionprops = {
  incomeInp: incomeInp[];
  deductionInp: deductionInp[];
  setDeductionInp: React.Dispatch<React.SetStateAction<deductionInp[]>>;
  checkInp: boolean;
  setCheckInp: React.Dispatch<React.SetStateAction<boolean>>;
  rentInp: rentInp;
  setrentInp: React.Dispatch<React.SetStateAction<rentInp>>;
};

// type for invoice component props
export type invoiceProps = {
  calculateTax: () => void;
  calculateFinal: calculate;
};

export type incomeInp = {
  label: string;
  value: string;
  error: boolean;
};
export type deductionInp = {
  label: string;
  value: string;
  max: number;
  error: boolean;
};
export type rentInp = {
  label: string;
  value: string;
  error: boolean;
};

export type calculate = {
  totalSalary: number;
  totalDeduction: number;
  taxableIncome: number;
  newTax: number;
  existTax: number;
  HRADeduction: number;
};
