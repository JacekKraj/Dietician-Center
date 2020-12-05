import React, { Fragment, useEffect, useRef } from "react";
import { createWorker } from "tesseract.js";
import Tesseract from "tesseract.js";

import classes from "./stepTwo.module.scss";
import Backdrop from "./../../UI/backdrop/Backdrop";
import Spinner from "./../../UI/spinner/Spinner";

const StepTwo = (props) => {
  const rejectTesseract = useRef(false);

  const tesseractRecognize = (file, i) =>
    new Promise((resolve, reject) => {
      const worker = createWorker({
        logger: (m) => {
          // console.log(m);
        },
      });

      (async () => {
        await worker.load();
        await worker.loadLanguage("pol+eng");
        await worker.initialize("pol+eng");
        const result = await worker.recognize(file);
        resolve(result.data.lines);
        await worker.terminate();
      })();
    });

  const doOCR = () => {
    Promise.all(props.files.map((file, i) => tesseractRecognize(file, i))).then((results) => {
      props.readResultsHandler(
        results.flat().map((result) => result.text),
        "diagnostyka"
      );
    });
  };

  useEffect(() => {
    doOCR();
    return () => {
      rejectTesseract.current = true;
    };
  }, []);

  const testResults = props.results ? <div></div> : null;

  return (
    <Fragment>
      <Backdrop />
      <div className={classes.container}>
        {props.isReadingData && (
          <div className={classes.spinnerContainer}>
            <Spinner />
            <p>Analyzing in progess</p>
            <p>It may take a few minutes</p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default StepTwo;
