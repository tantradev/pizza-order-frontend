
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme'
import "./style/index.css";
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import Home from "./containers/home";
import Orders from "./containers/orders";
import OrderedItems from "./containers/orderedItems";
import Notfound from "./containers/notfound";
import Navigation from './components/Navigation'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './redux/reducers'
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk))

const routing = (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation />
        <div style={{ marginTop: 100 }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/orders" component={Orders} />
            <Route path="/orderedItems/:id" component={OrderedItems} />
            <Route component={Notfound} />
          </Switch>
        </div>

      </Router >
    </ThemeProvider>
  </Provider>
);

ReactDOM.render(routing, document.getElementById("root"));
