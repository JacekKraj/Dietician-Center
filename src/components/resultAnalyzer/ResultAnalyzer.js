import React, { Fragment, useState } from "react";

import StepOne from "./stepOne/StepOne";
import StepTwo from "./stepTwo/StepTwo";
import { readResults } from "./readResults/readResults";

const ResultAnalyzer = (props) => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [step, setStep] = useState(1);
  const [results, setResults] = useState(null);
  const [isReadingData, setIsReadingData] = useState(true);

  const acceptFiles = (accFiles) => {
    setAcceptedFiles(accFiles);
  };

  const moveToNextStepHandler = () => {
    setStep((currState) => currState + 1);
  };

  const readResultsHandler = (results, pattern) => {
    let data = {};
    switch (pattern) {
      case "diagnostyka":
        data = [...readResults(results)];
    }
    setResults(data);
    setIsReadingData(false);
    console.log(data);
  };

  return (
    <Fragment>
      {step === 1 && <StepOne setFiles={acceptFiles} moveToNextStepHandler={moveToNextStepHandler} />}
      {step === 2 && <StepTwo files={acceptedFiles} isReadingData={isReadingData} readResultsHandler={readResultsHandler} results={results} />}
    </Fragment>
  );
};

export default ResultAnalyzer;
