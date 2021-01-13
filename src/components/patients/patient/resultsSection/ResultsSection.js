import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { connect } from "react-redux";

import classes from "./resultsSection.module.scss";
import SearchInput from "./../../../UI/searchInput/SearchInput";
import { namesMorphology, withPercentMorphology } from "./../../../resultAnalyzer/readResults/readResults";
import Result from "./result/Result";
import NoPatientData from "../noPatientData/NoPatientData";

const ResultsSection = (props) => {
  const [patientResults, setPatientResults] = useState([]);
  const [resultsTouched, setResultsTouched] = useState(false);

  const [resultsToDisplayNames, setResultsToDisplayNames] = useState([...namesMorphology, ...withPercentMorphology, "weight"]);

  useEffect(() => {
    firebase
      .database()
      .ref(`${props.fireUser.uid}/patientsResults/${props.name}`)
      .once("value")
      .then((snapshot) => {
        setResultsTouched(true);
        const values = snapshot.val() ? Object.values(snapshot.val()) : [];
        console.log(values);
        setPatientResults(values);
      });
  }, []);

  const rerenderResultsHandler = (value) => {
    if (value.trim() === "") {
      setResultsToDisplayNames([...namesMorphology, "weight"]);
    } else {
      const newResultsNames = [...namesMorphology, "weight"].filter((el) => {
        return el.toLowerCase().includes(value.toLowerCase().trim());
      });
      setResultsToDisplayNames(newResultsNames);
    }
  };

  const resultsToDisplay = resultsToDisplayNames?.map((el) => {
    const result = [];
    patientResults?.forEach((element) => {
      if (el === "weight") {
        result.push({ date: element.date, value: `${element[el]} kg, ${element["kcal"]} kcal` });
      } else {
        const singleResultValue = element.results.filter((res) => {
          return el === res.name;
        });
        // console.log(singleResultValue);
        result.push({ date: element.date, value: singleResultValue[0].value, norm: singleResultValue[0].norm, unit: singleResultValue[0].unit });
      }
    });
    return <Result result={result} name={el === "weight" ? "Weight/Calories" : el} key={el} />;
  });

  return (
    <div>
      <div className={classes.searchInputContainer}>
        <SearchInput placeholder="Search result" rerenderListHandler={rerenderResultsHandler} />
      </div>
      <div className={classes.resultsContainer}>
        {patientResults.length ? <div className={classes.results}>{resultsToDisplay}</div> : <NoPatientData touched={resultsTouched} />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fireUser: state.auth.fireUser,
  };
};

export default connect(mapStateToProps)(ResultsSection);
