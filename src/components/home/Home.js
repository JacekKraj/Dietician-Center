import React from 'react';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { connect } from 'react-redux'

import classes from './home.module.scss'
import Button from './../UI/button/Button'
import result from './../../assets/icons/badanie2.png';
import PageFeature from './pageFeature/PageFeature';
import Opinions from './opinions/Opinions';
import * as actions from './../../actions/index';
import LoginForm from './authForm/loginForm/LoginForm';
import RegisterForm from './authForm/registerForm/RegisterForm'


const Home = (props) => {

    let introLeft = (<div className={classes.introLeft}>
        <h1 className={classes.introTitle}>Work with body tests results</h1>
        <p className={classes.pageDesc}>Working and analysing patietns body results has never been easier. Gather patietns data to be able to work with it in the clearest and the most friendly way. Try now for free!</p>
        <Button className={classes.authButton} onClick={props.onChangeToLoginMode} type="button">Sign In</Button>
    </div>)

    introLeft = props.isLoginMode ? <LoginForm /> : introLeft;

    introLeft = props.isRegisterMode ? <RegisterForm /> : introLeft;

    return <div className={classes.home}>
        <div className={classes.pageIntro}>
            {introLeft}
            <div className={classes.introRight}>
                <img className={classes.testResultImage} src={result} alt="photo of test results"></img>
            </div>
        </div>
        <div className={classes.pageFeatures}>
            <PageFeature Icon={ScheduleIcon} name="Easy to use" text="Add test resaults to be able to start wokring with data. Add more that one results to be able to compare changes over the time." />
            <PageFeature Icon={FormatListNumberedIcon} name="Clear user interface" text="Test results are displayed in clear and easy to understand way what allowes to work with passed data in most efficient way." />
            <PageFeature Icon={MonetizationOnIcon} name="Totally free" text="Using the page is totally free and you are garanted that it will never change." />
        </div>
        <Opinions />
        <div className={classes.opinionButtonContainer}>
            <Button className={classes.opinionButton} type="button">Add your opinion</Button>
        </div>
    </div>
}

const mapStateToProps = state => {
    return {
        isLoginMode: state.auth.loginMode,
        isRegisterMode: state.auth.registerMode
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeToLoginMode: () => dispatch(actions.setLoginMode())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)