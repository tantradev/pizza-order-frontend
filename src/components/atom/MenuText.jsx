import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    menuTitle: {
        fontWeight: 'bold',
        color: theme.palette.black.main,
        textAlign: 'left'
    },
    menuDescription: {
        color: theme.palette.black.main,
        textAlign: 'left'
    },
    menuPrice: {
        textAlign: 'left',
        fontWeight: 'bold'
    },
}))

export function MenuDescription({ children }) {
    const classes = useStyles()
    return (
        <div className={classes.menuDescription}>
            {children}
        </div>
    )
}

export function MenuTitle({ children }) {
    const classes = useStyles()
    return (
        <div className={classes.menuTitle}>
            {children}
        </div>
    )
}
export function MenuPrice({ children }) {
    const classes = useStyles()
    return (
        <div className={classes.menuPrice}>
            {children}
        </div>
    )
}