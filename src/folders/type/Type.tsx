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
  setDeductionInp: React.Dispatch<React.SetStateAction<deductionInp[]>>;
  checkInp: boolean;
  setCheckInp: React.Dispatch<React.SetStateAction<boolean>>;
  rentInp: rentInp;
  setrentInp: React.Dispatch<React.SetStateAction<rentInp>>;
};

export type invoiceProps = {
  incomeInp: incomeInp[];
  deductionInp: deductionInp[];
  checkInp: boolean;
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
};
