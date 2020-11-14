import React from 'react'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'

import classes from './pageFeature.module.scss'

const theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 1024,
            lg: 1280,
            xl: 1920,
        },
    },
})

const useStyles = makeStyles(() => ({
    icon: {
        color: "#3458da",
        [theme.breakpoints.up('xs')]: {
            width: 35, height: 35
        },
        [theme.breakpoints.up('sm')]: {
            width: 48, height: 48,
        },

        [`${theme.breakpoints.up('md')} and (orientation:landscape)`]: {
            marginRight: "auto", width: 55, height: 55,
        },
    }

}))

const PageFeature = ({ Icon, name, text }) => {
    const iconStyles = useStyles()
    return <div className={classes.pageFeature}>
        <div className={classes.container}>
            <Icon className={iconStyles.icon} />
            <h6 className={classes.featureName}>{name}</h6>
        </div>
        <p className={classes.featureDesc}>{text}</p>
    </div>
}

export default PageFeature