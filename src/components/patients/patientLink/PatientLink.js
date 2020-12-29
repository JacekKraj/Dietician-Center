import React, { useState } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./patientLink.module.scss";
import Backdrop from "../../UI/backdrop/Backdrop";
import Button from "../../UI/button/Button";
import * as actions from "../../../actions/index";
import { showFailToast } from "../../../utility/toastify/toastify";

const Patient = (props) => {
  const [showModal, setShowModal] = useState(false);

  const path = props.name.replace(/\s/g, "");

  const removeUserModal = (
    <React.Fragment>
      <Backdrop
        onClick={() => {
          setShowModal(false);
        }}
      />
      <div className={classes.modal}>
        <p>Are you sure you want to remove this user? All data related to it will be lost.</p>
        <div>
          <Button
            className={classes.button}
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            className={classes.button}
            onClick={() => {
              props.onRemovePatient(props.name);
              showFailToast("Patient has been removed.");
            }}
          >
            Remove
          </Button>
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {showModal ? removeUserModal : null}
      <NavLink
        to={`/${path}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={classes.container}>
          <p className={classes.name}>{props.name}</p>
          <ClearIcon
            className={classes.icon}
            onClick={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
          />
        </div>
      </NavLink>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemovePatient: (name) => dispatch(actions.removePatientName(name)),
  };
};

export default connect(null, mapDispatchToProps)(Patient);
