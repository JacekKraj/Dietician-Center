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
    if (acceptedFiles.length === 1) {
      inputText.current.textContent = `${acceptedFiles[0].name} - ${(acceptedFiles[0].size / (1024 * 1024)).toFixed(2)}mb`;
      const image = window.URL.createObjectURL(acceptedFiles[0]);
      props.setFile(image);
    } else {
      showFailToast("You try to add more than one file, or file format is incorrect (only jpg and png).");
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ accept: "image/jpeg, image/png", onDrop });
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
        <Button className={classnames(classes.button, classes.buttonOverImage)}>Analyze scan</Button>
      </div>
      <div className={classes.scan}>
        <img src={customResult} alt="result scan" />
      </div>
      <Button className={classnames(classes.button, classes.buttonUnderImage)}>Analyze scan</Button>
    </div>
  );
};

export default AddNewResult;
