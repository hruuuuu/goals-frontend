import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import Shipping from './Shipping';
import Checkout from './Checkout';

const steps = ['購物車', '運送資訊', '付款資訊'];

function CartStepper(props) {
  const [activeStep, setActiveStep] = React.useState(1);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  //   const handleBack = () => {
  //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
  //   };

  //   const handleSkip = () => {
  //     if (!isStepOptional(activeStep)) {
  //       // You probably want to guard against something like this,
  //       // it should never occur unless someone's actively trying to break something.
  //       throw new Error("You can't skip a step that isn't optional.");
  //     }

  //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //     setSkipped((prevSkipped) => {
  //       const newSkipped = new Set(prevSkipped.values());
  //       newSkipped.add(activeStep);
  //       return newSkipped;
  //     });
  //   };

  const handleReset = () => {
    setActiveStep(1);
  };
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>已下單</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <button onClick={props.handleClose}>返回</button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 3, mb: 1 }}>
              {activeStep === steps.length - 1 ? <Checkout /> : <Shipping />}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <div className="container mb-1">
                <hr />
                <div className="row justify-content-between">
                  <div className="col-6 mt-2">
                    <div className="d-grid">
                      <button
                        className="btn_grn p-2"
                        onClick={props.handleClose}
                      >
                        取消
                      </button>
                    </div>
                  </div>
                  <div className="col-6 mt-2">
                    <div className="d-grid">
                      <button className="btn_grn p-2" onClick={handleNext}>
                        {activeStep === steps.length - 1
                          ? '確認付款'
                          : '前往結帳'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </>
  );
}

export default CartStepper;
