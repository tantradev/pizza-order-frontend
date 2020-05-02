import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { get } from '../utils/requests'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
const useStyles = theme => ({
    table: {
        minWidth: 500,
        width: '90%',
        margin: 30
    }
})

class OrderedItems extends Component {

    state = {
        orderItems: []
    }

    fetchItemOrders = async () => {
        let res = await get(`/orderItems/${this.props.match.params.id}`)
        this.setState({
            orderItems: res.data
        })
    }

    componentDidMount() {
        this.fetchItemOrders()
    }
    render() {
        const { classes } = this.props
        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>OrderId</TableCell>
                            <TableCell >Item</TableCell>
                            <TableCell >Extras</TableCell>
                            <TableCell >Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.orderItems.map((row, key) => (
                            <TableRow key={key}>
                                <TableCell>{row.orderId}</TableCell>
                                <TableCell>{row.item}</TableCell>
                                <TableCell>{row.extras}</TableCell>
                                <TableCell>{row.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}
OrderedItems = withStyles(useStyles, { name: 'orders' })(OrderedItems);
export default OrderedItems;

