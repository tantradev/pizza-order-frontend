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
import { Link } from "react-router-dom"

const useStyles = theme => ({
  table: {
    minWidth: 500,
    width: '90%',
    margin: 30
  }
})

class Orders extends Component {

  state = {
    orders: []
  }

  fetchOrders = async () => {
    let res = await get('/orders')
    this.setState({
      orders: res.data
    })
  }

  componentDidMount() {
    this.fetchOrders()
  }



  render() {
    // const { menu } = this.state
    const { classes } = this.props
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell >Client Name</TableCell>
              <TableCell >Client Phone Number</TableCell>
              <TableCell >Client Email</TableCell>
              <TableCell >Client Address</TableCell>
              <TableCell >Total Price</TableCell>
              <TableCell >Go To</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.orders.map((row, key) => (
              <TableRow key={key}>
                <TableCell>
                  {row.id}
                </TableCell>
                <TableCell>
                  {row.client.name}
                </TableCell>
                <TableCell>
                  {row.client.phoneNumber}
                </TableCell>
                <TableCell>
                  {row.client.email}
                </TableCell>
                <TableCell>
                  {row.client.address}
                </TableCell>
                <TableCell>
                  {row.total}
                </TableCell>
                <TableCell>
                  <Link to={`/orderedItems/${row.id}`}>See Order</Link>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}
Orders = withStyles(useStyles, { name: 'orders' })(Orders);
export default Orders;

