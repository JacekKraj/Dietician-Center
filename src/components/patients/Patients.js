import React, { useState } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import AddIcon from "@material-ui/icons/Add";

import classes from "./patients.module.scss";
import Input from "./../UI/input/Input";
import Button from "./../UI/button/Button";
import * as actions from "./../../actions/index";
import { showSuccessToast } from "./../../utility/toastify/toastify";
import Spinner from "./../UI/spinner/Spinner";
import Patient from "./patient/Patient";
import SearchInput from "./../UI/searchInput/SearchInput";

const Patients = (props) => {
  const [isAddingNewPatient, setIsAddingNewPatient] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [patientsNamesToDisplay, setPatientsNamesToDisplay] = useState([...props.patientsNames]);

  const rerenderPatientsListHandler = (inputValue) => {
    if (inputValue.trim() === "") {
      setPatientsNamesToDisplay([...props.patientsNames]);
    } else {
      const newNames = props.patientsNames.filter((el) => {
        return el.toLowerCase().includes(inputValue.toLowerCase().trim());
      });
      setPatientsNamesToDisplay(newNames);
    }
  };

  const noPatients = (
    <div className={classes.noPatientsInfo}>
      You don't have any patients yet. Click{" "}
      <span
        className={classes.addPatientLink}
        onClick={() => {
          setIsAddingNewPatient(true);
        }}
      >
        here
      </span>{" "}
      to add one.
    </div>
  );

  const newPatientInput = isAddingNewPatient ? (
    <div className={classes.formContainer}>
      <Input
        type="text"
        class={classes.input}
        placeholder="Name"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <Button
        className={classes.button}
        type="submit"
        onClick={() => {
          if (inputValue.trim()) {
            props.onAddUser([inputValue]);
            setIsAddingNewPatient(false);
            showSuccessToast("Patient has been added.");
          }
        }}
      >
        Add
      </Button>
    </div>
  ) : null;

  const names = patientsNamesToDisplay?.map((el) => {
    return <Patient name={el} key={el} />;
  });

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Your Patients</h1>
      <div className={classnames(!props.patientsNames.length && classes.noPatientsWrapper)}>
        {!props.patientsNamesGot ? (
          <div className={classes.spinnerContainer}>
            <Spinner />
          </div>
        ) : !props.patientsNames.length ? (
          <div>
            {noPatients}
            {newPatientInput}
          </div>
        ) : null}
      </div>
      {props.patientsNames.length ? (
        <div className={classes.patientsWrapper}>
          <SearchInput rerenderPatientsListHandler={rerenderPatientsListHandler} />
          {names}
          {newPatientInput}
          <div
            className={classes.addPatientButton}
            onClick={() => {
              setIsAddingNewPatient(true);
            }}
          >
            <AddIcon />
            <p>Add new patient</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patientsNames: state.patients.patientsNames,
    patientsNamesGot: state.patients.patientsNamesGot,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddUser: (name) => dispatch(actions.setPatientsNames(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
