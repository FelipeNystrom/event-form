import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './App';
import Ambassador from './forms/ambassador';
import Newsletter from './forms/newsletter';
import Order from './forms/order';
import Orderform from './forms/orderform';
import Platinum from './forms/platinum';
import Buy from './forms/buy';
import Logo from './logo';
// import Platinum from './forms/platinum';

class Routes extends Component {
  render() {
    return (
      <Fragment>
        <Logo />
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/ambassador" component={Ambassador} />
          <Route path="/newsletter" component={Newsletter} />
          <Route path="/buy" component={Buy} />
          <Route exact path="/order" component={Order} />
          <Route
            exact
            path="/order/basic"
            render={props => <Orderform {...props} basic />}
          />
          <Route
            exact
            path="/order/premium"
            render={props => <Orderform {...props} premium />}
          />
          <Route exact path="/order/platinum" component={Platinum} />
        </Switch>
      </Fragment>
    );
  }
}
export default Routes;
