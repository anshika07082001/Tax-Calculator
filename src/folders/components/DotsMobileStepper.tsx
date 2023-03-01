import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { stepperprops } from "../type/Type";

const DotsMobileStepper = (props: stepperprops) => {
  const theme = useTheme();

  return (
    <MobileStepper
      variant="dots"
      steps={3}
      position="static"
      activeStep={props.activeStep}
      sx={{ maxWidth: 200, flexGrow: 1 }}
      nextButton={
        <Button
          size="small"
          onClick={props.handleNext}
          disabled={props.activeStep === 2}
        >
          Next
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button
          size="small"
          onClick={props.handleBack}
          disabled={props.activeStep === 0}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  );
};

export default DotsMobileStepper;
