import React, { Component } from 'react'
import { Grid, withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { get } from '../../utils/requests'
import { connect } from 'react-redux'
import CustomContainer from '../../components/CustomContainer'
import { MenuTitle, MenuDescription, MenuPrice } from '../../components/atom/MenuText'
import CalculationButton from '../../components/atom/CalculationButton'
import actions from '../../redux/actions';
import equal from 'fast-deep-equal'

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
    }
})

class Menu extends Component {

    state = {
        menu: [],
        fetching: false,
        selectedItems: [],
        total: 0,
    }

    fetchMenu = async () => {
        this.setState({
            fetching: true
        })
        let res = await get('/menu')
        this.setState({
            menu: res.data,
            fetching: false
        })

    }

    componentDidMount() {
        this.fetchMenu()
    }

    componentDidUpdate(prevProps) {
        if (!equal(this.props.currency, prevProps.currency)) {
            this.state.menu.forEach(next => {
                this.setState({
                    [`total${next.name}`]: 0,
                    [`count${next.name}`]: 0,
                    total: 0
                })
            })
        }
    }

    onButtonClick = (e, type, item, price) => {
        e.preventDefault()
        /* dynamic state to every item, for the count and total */
        let targetCount = `count${item.name}`
        let targetTotal = `total${item.name}`
        this.setState((state) => ({
            [targetCount]: type == 'plus' ? (state[targetCount] ? state[targetCount] + 1 : 0 + 1) : (state[targetCount] && state[targetCount] - 1),
            [targetTotal]: type == 'plus' ? (state[targetTotal] ? state[targetTotal] + price : 0 + price) : (state[targetTotal] && state[targetTotal] - price),
            selectedItems: [
                ...state.selectedItems,
                item
            ],
            total: type == 'plus' ? state.total + price : (state.total > 0 ? state.total - price : 0)
        }), () => this.onTotalCalculation())

    }

    onTotalCalculation = () => {
        this.props.calculateTotal(this.state.total);
        this.props.selectItem(this.state.selectedItems)
    }

    renderMenu = (item, index) => {
        const { classes } = this.props
        const { currency } = this.props
        let price = currency == '€' ? item.price : item.dollarPrice
        let countItem = this.state[`count${[item.name]}`] ? this.state[`count${[item.name]}`] : 0
        let totalPrice = this.state[`total${[item.name]}`] ? this.state[`total${[item.name]}`] : 0

        return (
            <Grid item lg={12} className={classes.menuItem} key={index}>
                <Paper className={classes.paper}>
                    <div className={classes.itemWrapper}>
                        <MenuTitle>{item.name}</MenuTitle>
                        <MenuDescription>{item.description}</MenuDescription>
                        <MenuPrice>{price}{currency == "€" ? '€' : '$'}</MenuPrice>
                        <div className={classes.calculationWrapper}>
                            <div className={classes.calculationElements}>
                                <CalculationButton color="primary" sign="+" onClick={(e) => this.onButtonClick(e, 'plus', item, price)} />
                                <div>{countItem}</div>
                                <CalculationButton color="secondary" sign="-" onClick={(e) => this.onButtonClick(e, 'minus', item, price)} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: 20 }}>{`Total:${totalPrice} ${currency}`}</div>
                    </div>
                </Paper>
            </Grid>
        )
    }

    render() {
        const { menu } = this.state

        return (
            <CustomContainer>
                {menu.map((next, index) => this.renderMenu(next, index))}
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
Menu = withStyles(useStyles, { name: 'menu' })(Menu);
export default connect(mapStateToProps, actions)(Menu);
