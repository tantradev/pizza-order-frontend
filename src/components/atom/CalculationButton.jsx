import React from 'react'
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: theme.spacing(2) + 4,
        color: theme.palette.white.main
    },

}))

function CalculationButton({ sign, color, onClick }) {
    const classes = useStyles()
    return (
        <Button variant="contained" color={color} className={classes.root} style={{ background: color }} onClick={onClick}>
            {sign}
        </Button>
    )
}


export default CalculationButton
