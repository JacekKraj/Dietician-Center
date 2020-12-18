import React, { useEffect, useState, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import fire from "./firebaseConfig";
import { fireAuth } from "./firebaseConfig";

import HeaderNav from "./components/headerNav/HeaderNav";
import Home from "./components/home/Home";
import * as actions from "./actions/index";
import Spinner from "./components/UI/spinner/Spinner";
import classes from "./app.module.scss";
import { showFailToast } from "./utility/toastify/toastify";

const App = (props) => {
  const [loading, setLoading] = useState(true);
  const [patientsRoutes, setPatientsRoutes] = useState(null);

  const Faq = React.lazy(() => {
    return import("./components/faq/Faq");
  });

  const Contact = React.lazy(() => {
    return import("./components/contact/Contact");
  });

  const ResultAnalyzer = React.lazy(() => {
    return import("./components/resultAnalyzer/ResultAnalyzer");
  });

  useEffect(() => {
    props.onGetOpinions();
    setLoading(true);
    fire.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        if (fire.auth().currentUser.emailVerified) {
          props.onGetPatientsNames();
          props.onAutoLogin(fire.auth().currentUser);
        } else {
          showFailToast("Verification email has been sent to your email address. Verify to sign in.");
          props.onAutoLogout();
        }
        setLoading(false);
      } else {
        props.onAutoLogout();
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    const patientsRts =
      props.patientsNames.length &&
      props.patientsNames.map((el, index) => {
        return <Route key={index} exact path={`/${el}`} />;
      });
    setPatientsRoutes(patientsRts);
  }, [props.patientsNames]);

  let routes = props.isAuthenticated ? (
    <Switch>
      {patientsRoutes}
      <Route exact path="/" component={Home} />
      <Route exact path="/faq" render={(props) => <Faq {...props} />} />
      <Route exact path="/contact" render={(props) => <Contact {...props} />} />
      <Route exact path="/add-new-result" render={(props) => <ResultAnalyzer {...props} />} />
      <Redirect to="/" />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/faq" render={(props) => <Faq {...props} />} />
      <Route exact path="/contact" render={(props) => <Contact {...props} />} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div>
      <ToastContainer />
      <HeaderNav />
      {loading ? (
        <div></div>
      ) : (
        <Suspense
          fallback={
            <div className={classes.spinnerContainer}>
              <Spinner />
            </div>
          }
        >
          {routes}
        </Suspense>
      )}
    </div>
  );
};

const mapDistpatchToProps = (dispatch) => {
  return {
    onAutoLogin: (fireUser) => dispatch(actions.autoLogin(fireUser)),
    onAutoLogout: () => dispatch(actions.autoLogout()),
    onGetOpinions: () => dispatch(actions.getOpinions()),
    onGetPatientsNames: () => dispatch(actions.getPatientsNames()),
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.authenticated,
    patientsNames: state.patients.patientsNames,
  };
};

export default connect(mapStateToProps, mapDistpatchToProps)(App);
