import React from 'react'

import classes from './home.module.scss'
import Button from './../UI/button/Button'
import result from './../../assets/icons/badanie2.png'


const Home = () => {
    return <div className={classes.home}>
        <div className={classes.pageIntro}>
            <div className={classes.introLeft}>
                <h1 className={classes.introTitle}>Work with body tests results</h1>
                <p className={classes.pageDesc}>Working and analysing patietns body results has never been easier. Gather patietns data to be able to work with it in the clearest and the most friendly way. Try now for free!</p>
                <Button className={classes.button} type="button">Sign In</Button>
            </div>
            <div className={classes.introRight}>
                <img className={classes.testResultImage} src={result} alt="photo of test results"></img>
            </div>
        </div>
    </div>
}

export default Home