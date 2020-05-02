import React, { Component } from 'react'
import { withStyles, Typography } from '@material-ui/core';
import { connect } from 'react-redux'
import CustomContainer from '../components/CustomContainer'
import Button from '@material-ui/core/Button';
import actions from '../redux/actions';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { STEPS } from "../utils/constants"
import Menu from '../components/stepContainers/Menu'
import Extras from '../components/stepContainers/Extras'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import { post } from '../utils/requests'
import Alert from '@material-ui/lab/Alert';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    margin: 20
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
  },
  stepperWrapper: {
    padding: 0,
    width: '100%',
    marginBottom: theme.spacing(3)
  },
  textField: {
    width: '100%',
    margin: 10
  },
  messageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexFlow: 'row',
    height: '80vh'
  },
  messageBoxWrapper: {
    height: 200,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20
  },
  actionButtonWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    margin: 20
  }
})

class Home extends Component {

  state = {
    activeStep: 0,
    showSuccessfulMsg: false

  }


  handleBack = () => {
    this.setState((state) => ({
      activeStep: state.activeStep - 1
    }))
  }

  handleNext = () => {
    this.setState((state) => ({
      activeStep: state.activeStep + 1
    }))
  }

  renderSteps = () => {
    const { activeStep } = this.state
    const { classes } = this.props
    return (
      <Stepper activeStep={activeStep} alternativeLabel style={{ padding: 0 }} className={classes.stepperWrapper}>
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    )
  }

  handleReset = () => {
    this.setState({
      activeStep: 0
    })
  }

  isFetching = (value) => {
    this.setState({
      fetching: value
    })
  }



  onMakeOrder = async () => {
    let { name, email, phoneNumber, address } = this.state
    let body = { name, email, phoneNumber, address }

    let postClient = await post('/clients', body)
    let bodyOrders = {
      clientId: postClient.data.id,
      total: this.props.total
    }
    let postOrder = await post('/orders', bodyOrders)
    let bodyItems = this.props.selectedItems.map(next => {
      let getExtras = next.extras.map(next => next.name)
      return {
        orderId: postOrder.data.id,
        item: next.name,
        extras: getExtras.join() || 'none',
        price: next.totalPrice
      }
    })
    let postSelectedItems = await post('/orderItems', { bodyItems: bodyItems })
    if (postSelectedItems.status === 200) {
      this.setState({
        showSuccessfulMsg: true
      })
    }

  }

  renderActionButtons = () => {
    const { menu, currency, activeStep } = this.state
    const { classes } = this.props
    return (

      <div className={classes.actionButtonWrapper} >
        {activeStep !== 2 && < Button variant="contained" color="primary" onClick={this.handleNext} style={{ color: '#fff' }}>
          Next
        </Button>}
        {activeStep === 2 && < Button variant="contained" color="primary" onClick={this.onMakeOrder} style={{ color: '#fff' }}>
          Order
        </Button>}
      </div>

    )
  }

  onChangeClientField = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  renderClient = () => {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Typography variant="h5" component="h2" style={{ margin: 20 }}>Enter Your Information, Please!</Typography>
        <TextField
          onChange={this.onChangeClientField}
          name="name"
          id="standard-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start">Name</InputAdornment>,
          }}
        />
        <TextField
          onChange={this.onChangeClientField}
          name="email"
          id="standard-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start">Email</InputAdornment>,
          }}
        />
        <TextField
          onChange={this.onChangeClientField}
          name="phoneNumber"
          id="standard-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start">Phone Number</InputAdornment>,
          }}
        />
        <TextField
          onChange={this.onChangeClientField}
          name="address"
          id="standard-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start">Address</InputAdornment>,
          }}
        />
      </div>
    )
  }
  renderSuccessfulMessage = () => {
    const { classes } = this.props
    return (
      <div className={classes.messageWrapper}>
        <Alert severity="success" className={classes.messageBoxWrapper}>Your Order is done Successfuly!</Alert>
      </div>
    )
  }
  render() {
    const { activeStep, showSuccessfulMsg, fetching } = this.state
    const { classes } = this.props
    return (
      <CustomContainer>

        {/* {activeStep === 0 && <Currency />} */}
        {!showSuccessfulMsg && this.renderSteps()}
        {(activeStep === 0 && !showSuccessfulMsg) && <Menu />}
        {(activeStep === 1 && !showSuccessfulMsg) && <Extras isFetching={this.isFetching} />}
        {(activeStep === 2 && !showSuccessfulMsg) && this.renderClient()}
        {!showSuccessfulMsg && this.renderActionButtons()}
        {showSuccessfulMsg && this.renderSuccessfulMessage()}
      </CustomContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    total: state.orders.calculateTotal,
    selectedItems: state.orders.selectedItems
  }
}
Home = withStyles(useStyles, { name: 'home' })(Home);
export default connect(mapStateToProps, actions)(Home);
