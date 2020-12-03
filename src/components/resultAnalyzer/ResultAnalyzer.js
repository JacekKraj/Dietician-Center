import React, { Fragment, useState } from "react";

import StepOne from "./stepOne/StepOne";

const ResultAnalyzer = (props) => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [step, setStep] = useState(1);

  const acceptFiles = (accFiles) => {
    setAcceptedFiles(accFiles);
  };

  const moveToNextStepHandler = () => {
    setStep((currState) => currState + 1);
  };
  return (
    <Fragment>
      {step === 1 && <StepOne setFiles={acceptFiles} moveToNextStepHandler={moveToNextStepHandler} />}
      {step === 2 && console.log(2)}
    </Fragment>
  );
};

export default ResultAnalyzer;
