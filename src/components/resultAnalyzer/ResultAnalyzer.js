import React, { Fragment, useState } from "react";

import StepOne from "./stepOne/StepOne";

const ResultAnalyzer = (props) => {
  const [acceptedFile, setAcceptedFile] = useState([]);
  const [step, setStep] = useState(1);

  const acceptFile = (accFiles) => {
    setAcceptedFile(accFiles);
    setStep(2);
  };
  return (
    <Fragment>
      {step === 1 && <StepOne setFile={acceptFile} />}
      {step === 2 && console.log(2)}
    </Fragment>
  );
};

export default ResultAnalyzer;
