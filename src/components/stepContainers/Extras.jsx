import React, { Component } from 'react'
import { Grid, withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { get } from '../../utils/requests'
import { connect } from 'react-redux'
import CustomContainer from '../../components/CustomContainer'
import { MenuTitle, MenuDescription, MenuPrice } from '../../components/atom/MenuText'
import actions from '../../redux/actions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    menuItem: {
        marginBottom: 10
    },
    calculationWrapper: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end'
    },
    calculationElements: {
        display: 'flex',
        flexFlow: 'row',
        width: theme.spacing(10) + 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    extrasWrapper: {
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'flex-start'
    }
})

class Extras extends Component {

    state = {
        extras: [],
        fetching: false,
        updatedItem: [],

    }

    fetchExtras = async () => {
        this.setState({
            fetching: true
        })
        let res = await get('/extras')
        this.setState({
            extras: res.data,
            fetching: true
        }, () => this.props.isFetching(this.state.fetching))
    }

    componentDidMount() {
        this.fetchExtras()
        this.setState({
            selectedItems: this.props.selectedItems.map((next, index) => {
                return { ...next, extras: [], idSelected: index, totalPrice: 0 }
            })
        })
    }


    handleChange = (e, mainItem, extra, remove) => {
        e.preventDefault()
        let findItem = this.state.selectedItems.find(next => next.idSelected === mainItem.idSelected)
        let filterItems = this.state.selectedItems && this.state.selectedItems.filter(next => next.idSelected !== mainItem.idSelected)

        let filterExtras = findItem.extras && findItem.extras.filter(next => next.name !== extra.name)
        findItem['extras'] = !remove ? [...filterExtras, { name: extra.name, price: extra.price }] : [...filterExtras]

        let extras = findItem['extras'].map(next => next.price)
        let totalExtra = extras.reduce((a, b) => a + b, 0)
        findItem['totalPrice'] = totalExtra + findItem.price

        this.setState((state) => ({
            selectedItems: [...filterItems, findItem].sort((a, b) => a.idSelected - b.idSelected)
        }))

        this.props.selectItem([...filterItems, findItem].sort((a, b) => a.idSelected - b.idSelected))
        this.props.calculateTotal(remove ? this.props.total - extra.price : this.props.total + extra.price);
    }

    renderMenu = (item) => {
        const { classes, currency } = this.props
        const { extras, fetching } = this.state

        return (
            <Grid item lg={12} className={classes.menuItem}>
                <Paper className={classes.paper}>
                    <div className={classes.itemWrapper}>
                        <MenuTitle>{item.name}</MenuTitle>
                        <MenuDescription>{item.description}</MenuDescription>
                        <MenuPrice>{item.totalPrice !== 0 ? item.totalPrice : item.price}{currency == "€" ? '€' : '$'}</MenuPrice>
                    </div>
                    <div className={classes.extrasWrapper}>
                        {extras.map(next => {
                            let findChecked = item.extras && item.extras.find(which => which.name === next.name)
                            return (
                                <FormControlLabel
                                    label={{ fontSize: 12 }}
                                    control={
                                        <Checkbox
                                            checked={findChecked ? next.name : null}
                                            onChange={findChecked ? (e) => this.handleChange(e, item, next, true) : (e) => this.handleChange(e, item, next, false)}
                                            name={next.name}
                                            color="primary"
                                        />
                                    }
                                    label={`${next.name} (${next.price + currency})`}
                                />
                            )
                        })}
                    </div>
                </Paper>
            </Grid>
        )
    }

    render() {
        const { selectedItems } = this.state
        return (
            <CustomContainer>
                {selectedItems && selectedItems.map(next => this.renderMenu(next))}
            </CustomContainer>
        )
    }
}


const mapStateToProps = state => {
    return {
        total: state.orders.calculateTotal,
        currency: state.orders.currency,
        selectedItems: state.orders.selectedItems
    }
}
Extras = withStyles(useStyles, { name: 'extras' })(Extras);
export default connect(mapStateToProps, actions)(Extras);
