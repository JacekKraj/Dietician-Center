import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { connect } from "react-redux";

import classes from "./resultsSection.module.scss";
import SearchInput from "./../../../UI/searchInput/SearchInput";
import { namesMorphology } from "./../../../resultAnalyzer/readResults/readResults";
import Spinner from "./../../../UI/spinner/Spinner";
import Result from "./result/Result";

const ResultsSection = (props) => {
  const [patientResults, setPatientResults] = useState([]);
  const [resultsToDisplayNames, setResultsToDisplayNames] = useState([...namesMorphology, "weight"]);

  useEffect(() => {
    firebase
      .database()
      .ref(`${props.fireUser.uid}/patientsResults/${props.name}`)
      .once("value")
      .then((snapshot) => {
        const values = Object.values(snapshot.val());
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
        result.push({ date: element.date, result: `${element[el]} kg, ${element["kcal"]} kcal` });
      } else {
        const singleResultValue = element.results.filter((res) => {
          return el === res.name;
        });

        result.push({ date: element.date, result: singleResultValue[0].value });
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
        {patientResults.length ? (
          <div className={classes.results}>{resultsToDisplay}</div>
        ) : (
          <div className={classes.spinnerContainer}>
            <Spinner />
          </div>
        )}
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
