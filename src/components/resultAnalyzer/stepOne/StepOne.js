import React, { useCallback, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import classnames from "classnames";

import classes from "./stepOne.module.scss";
import customResult from "./../../../assets/icons/badanie2.png";
import Button from "../../UI/button/Button";
import { showFailToast } from "./../../../utility/toastify/toastify";

const AddNewResult = (props) => {
  const inputText = useRef(null);
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length > 0) {
      const imageList = acceptedFiles.map((el) => window.URL.createObjectURL(el));
      inputText.current.textContent = `Accepted ${acceptedFiles.length} files`;
      props.setFiles(imageList);
    } else if (rejectedFiles.length) {
      showFailToast("Some files has been rejected. Check if format is correct(jpg, png) or total files size(max 50mb).");
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ maxSize: 52428800, accept: "image/jpeg, image/png", onDrop });
  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
        <div {...getRootProps()} className={classes.dropzoneContainer}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the file here ...</p>
          ) : (
            <p ref={inputText}>Drag and drop scan of results here, or click to select from your desktop (jpg, png)</p>
          )}
        </div>
        <Button className={classnames(classes.button, classes.buttonOverImage)} onClick={props.moveToNextStepHandler}>
          Analyze scan
        </Button>
      </div>
      <div className={classes.scan}>
        <img src={customResult} alt="result scan" />
      </div>
      <Button className={classnames(classes.button, classes.buttonUnderImage)}>Analyze scan</Button>
    </div>
  );
};

export default AddNewResult;
