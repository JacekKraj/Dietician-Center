import React, { Fragment, useState, useEffect } from "react";

import StepOne from "./stepOne/StepOne";
import StepTwo from "./stepTwo/StepTwo";
import { readResults } from "./readResults/readResults";

const ResultAnalyzer = (props) => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [step, setStep] = useState(1);
  const [results, setResults] = useState(null);
  const [isReadingData, setIsReadingData] = useState(true);
  const [imagesToStorage, setImagesToStorage] = useState(null);

  const acceptFiles = (accFiles) => {
    setAcceptedFiles(accFiles);
  };

  const addStorageImages = (images) => {
    setImagesToStorage(images);
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
  };

  return (
    <Fragment>
      {step === 1 && <StepOne setFiles={acceptFiles} moveToNextStepHandler={moveToNextStepHandler} addStorageImages={addStorageImages} />}
      {step === 2 && (
        <StepTwo
          files={acceptedFiles}
          imagesToStorage={imagesToStorage}
          isReadingData={isReadingData}
          readResultsHandler={readResultsHandler}
          results={results}
        />
      )}
    </Fragment>
  );
};

export default ResultAnalyzer;
