import React from 'react'
import { NavLink } from "react-router-dom";
import { NAVIGATION } from '../utils/constants'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    list: {
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-between',
        width: 200,
        marginLeft: 100
    },
    item: {
        textDecoration: 'none',
        fontSize: 15,
        fontWeight: 'bold'
    },
    active: {
        color: theme.palette.white.main
    },
    notActive: {
        color: theme.palette.blue.main
    }

}))


function NavigationList() {
    const location = useLocation();
    const classes = useStyles()
    return (
        <div className={classes.list}>
            {NAVIGATION.map((next, index) => {
                return (
                    <NavLink
                        key={index}
                        className={classNames(classes.item, (location.pathname == next.to) ? classes.active : classes.notActive)}
                        to={next.to}>
                        {next.label}
                    </NavLink>
                )
            })}
        </div>
    )
}

export default NavigationList