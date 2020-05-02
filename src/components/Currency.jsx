import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux'
import CustomContainer from '../components/CustomContainer'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import actions from '../redux/actions';
const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuItem: {
        marginBottom: 10
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    currencyWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        zIndex: 0,
        marginBottom: theme.spacing(3)
    }
})

class Currency extends Component {

    state = {
        currency: 'euro',
    }


    handleChangeCurrency = (e) => {
        this.setState({
            currency: e.target.value
        })
        let signCurrency = e.target.value == "euro" ? '€' : '$'
        this.props.changeCurrency(signCurrency)
        this.props.calculateTotal(0);
    }

    renderCurrency = () => {
        const { currency } = this.state
        const { classes } = this.props
        return (
            <div className={classes.currencyWrapper}>
                <FormControl className={classes.formControl}>
                    <Select
                        value={currency}
                        onChange={this.handleChangeCurrency}
                        displayEmpty
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'Without label' }}>
                        <MenuItem value="" disabled>
                            Currency
                        </MenuItem>
                        <MenuItem value="euro">€</MenuItem>
                        <MenuItem value="dollar">$</MenuItem>
                    </Select>
                </FormControl>
            </div>
        )
    }

    render() {
        const { currency } = this.state
        const { classes } = this.props
        return (
            <div className={classes.currencyWrapper}>
                <FormControl className={classes.formControl}>
                    <Select
                        value={currency}
                        onChange={this.handleChangeCurrency}
                        displayEmpty
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'Without label' }}>
                        <MenuItem value="" disabled>
                            Currency
                        </MenuItem>
                        <MenuItem value="euro">€</MenuItem>
                        <MenuItem value="dollar">$</MenuItem>
                    </Select>
                </FormControl>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        total: state.orders.calculateTotal,
        selectedItems: state.orders.selectedItems
    }
}
Currency = withStyles(useStyles, { name: 'currency' })(Currency);
export default connect(mapStateToProps, actions)(Currency);
