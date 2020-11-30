import React, { useCallback, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import classnames from 'classnames'

import classes from './addNewResult.module.scss';
import customResult from './../../assets/icons/badanie2.png';
import Button from './../UI/button/Button';

const AddNewResult = () => {
    const inputText = useRef(null)
    const [scan, setScan] = useState(customResult)
    const onDrop = useCallback(acceptedFiles => {
        inputText.current.textContent = `${acceptedFiles[0].name} - ${(
            acceptedFiles[0].size /
            (1024 * 1024)
        ).toFixed(2)}mb`;
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onload = () => {
                const binaryStr = reader.result
                setScan(binaryStr)
            }
            reader.readAsDataURL(acceptedFiles[0])
        })
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (<div className={classes.container}>
        <div className={classes.formContainer}>
            <div {...getRootProps()} className={classes.dropzoneContainer} >
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the file here ...</p> :
                        <p ref={inputText}>Drag and drop scan of results here, or click to select from your desktop</p>
                }
            </div>
            <Button className={classnames(classes.button, classes.buttonOverImage)}>Analyze scan</Button>
        </div>
        <div className={classes.scan}  >
            <img src={scan} alt="result scan" />
        </div>
        <Button className={classnames(classes.button, classes.buttonUnderImage)}>Analyze scan</Button>
    </div >)
}

export default AddNewResult;