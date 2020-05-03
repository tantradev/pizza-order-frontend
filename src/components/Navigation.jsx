import React, { Component } from 'react'
import { Grid, withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import NavigationList from './NavigationList'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = theme => ({
    list: {
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-between',
        width: theme.spacing(30),
        marginLeft: theme.spacing(10)
    },
    wrapper: {
        height: 80,
        background: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        position: 'fixed',
        top: 0,
        zIndex: 2,
    },
    item: {
        textDecoration: 'none',
        fontSize: theme.spacing(2),
        fontWeight: 'bold'
    },
    active: {
        color: theme.palette.white.main
    },
    notActive: {
        color: theme.palette.blue.main
    },
    cardWrapper: {
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '90%'
    }
})

class Navigation extends Component {

    render() {

        const { classes } = this.props
        return (
            <Grid className={classes.wrapper}>
                <Grid item lg={3} sm={3} xs={3}>
                    <NavigationList />
                </Grid>
                <Grid item lg={12} sm={12} xs={12}>
                    <div className={classes.cardWrapper}>
                        <ShoppingCartIcon style={{ fill: "#fff" }} />
                        <div style={{ color: '#fff', paddingLeft: 5, fontSize: 15, fontWeight: 'bold' }}>
                            {this.props.total} {this.props.currency}
                        </div>
                    </div>
                </Grid>
            </Grid>
        )
    }
}


const mapStateToProps = state => {
    return {
        total: state.orders.calculateTotal,
        currency: state.orders.currency
    }
}

Navigation = withStyles(useStyles, { name: 'navigation' })(Navigation);
export default connect(mapStateToProps)(Navigation);
