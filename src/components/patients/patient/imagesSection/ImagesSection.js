import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { connect } from "react-redux";

import classes from "./imagesSection.module.scss";
import NoPatientData from "./../noPatientData/NoPatientData";
import Image from "./image/Image";

const ImagesSection = (props) => {
  const [imagesTouched, setImagesTouched] = useState(false);
  const [images, setImages] = useState([]);

  const getImagesUrls = (date) => {
    return new Promise((resolve, reject) => {
      firebase
        .storage()
        .ref(`${props.fireUser.uid}/${props.name}/${date}`)
        .getDownloadURL()
        .then((url) => {
          resolve({ date: date, url: url });
        });
    });
  };

  useEffect(() => {
    firebase
      .database()
      .ref(`${props.fireUser.uid}/patientsResults/${props.name}`)
      .once("value")
      .then((snapshot) => {
        const dates = Array.from(Object.keys(snapshot.val()));
        Promise.all(dates.map((el) => getImagesUrls(el))).then((results) => {
          setImagesTouched(true);
          setImages(results);
        });
      });
  }, []);

  const imagesToDisplay = images.map((el) => {
    return <Image imageData={el} key={el.url} />;
  });

  return (
    <div className={classes.container}>
      {images.length ? <div className={classes.imagesContainer}>{imagesToDisplay}</div> : <NoPatientData touched={imagesTouched} />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fireUser: state.auth.fireUser,
  };
};

export default connect(mapStateToProps)(ImagesSection);
