import React, { useState, Fragment } from "react";

import classes from "./image.module.scss";
import Backdrop from "./../../../../UI/backdrop/Backdrop";

const Image = (props) => {
  const [fullSizePhotoShown, setFullSizePhotoShown] = useState(false);

  return (
    <Fragment>
      {fullSizePhotoShown ? (
        <Fragment>
          <Backdrop
            onClick={() => {
              setFullSizePhotoShown(false);
            }}
          />
          <div className={classes.fullSizePhotoContainer}>
            <img className={classes.fullSizePhoto} src={props.imageData.url} alt="result scan full size"></img>
          </div>
        </Fragment>
      ) : null}
      <div
        className={classes.container}
        onClick={() => {
          setFullSizePhotoShown(true);
        }}
      >
        <div className={classes.imageMiniatureContainer}>
          <img className={classes.imageMiniature} src={props.imageData.url} alt="result scan" />
          <p className={classes.imgDescription}>{props.imageData.date}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default Image;
