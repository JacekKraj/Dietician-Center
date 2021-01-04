import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import classes from "./opinions.module.scss";
import Opinion from "./opinion/Opinion";
import Button from "./../../UI/button/Button";
import NewOpinionModal from "./newOpinionModal/NewOpinionModal";

const Opinions = (props) => {
  const [showAddOpinionModal, setShowAddOpinionModal] = useState(false);

  const showAddOpinionModalHandler = () => {
    setShowAddOpinionModal(!showAddOpinionModal);
  };
  return (
    <Fragment>
      <div className={classes.opinions}>
        {props.opinions?.map((el, index) => {
          return <Opinion key={index} email={el.email} text={el.opinion} defaultValue={el.stars} />;
        })}
      </div>
      <div className={classes.opinionButtonContainer}>
        {props.isAuthenticated ? (
          <Button className={classes.opinionButton} onClick={showAddOpinionModalHandler} type="button">
            Add your opinion
          </Button>
        ) : (
          <p>Sign in to be able to add your opinion.</p>
        )}
      </div>
      {showAddOpinionModal && <NewOpinionModal backdropClick={showAddOpinionModalHandler} />}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    opinions: state.opinion.opinions,
    isAuthenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps)(Opinions);
