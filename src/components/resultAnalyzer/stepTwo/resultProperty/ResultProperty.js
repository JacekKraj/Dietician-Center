import React from "react";
import { Field } from "formik";

import classes from "./resultProperty.module.scss";
import MyFormikInput from "../../../../utility/myFormikInput/MyFormikInput";
import Input from "./../../../UI/input/Input";
import { namesUnits } from "./../../readResults/readResults";

const ResultProperty = (props) => {
  return (
    <div className={classes.resultProperty}>
      <p className={classes.name}>{props.name}</p>
      <div className={classes.inputsContainer}>
        <MyFormikInput as={Input} name={props.name} type="number" className={classes.textInput} />
        <Field as="select" name={props.unitName} className={classes.selectInput}>
          <option value={props.unit}>{props.unit}</option>
          {namesUnits.map((el, index) => {
            if (el !== props.unit) {
              return (
                <option value={el} key={`${el}${index}`}>
                  {el}
                </option>
              );
            }
          })}
        </Field>
        <p className={classes.norm}>{props.norm}</p>
      </div>
    </div>
  );
};

export default ResultProperty;
