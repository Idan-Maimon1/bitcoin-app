import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { Component } from 'react';
import './assets/scss/global.scss'
import { AppHeader } from './components/AppHeader'
import { HomePage } from './pages/HomePage'
import { ContactPage } from './pages/ContactPage'
import { StatisticPage } from './pages/StatisticPage'
import { ContactDetails } from './pages/ContactDetails'
import { contactEdit } from './pages/contactEdit';
import { SignUp } from './components/SignUp'
import { connect } from 'react-redux'
import { loadUser } from './store/actions/userActions'

class _App extends Component {

  async componentDidMount() {
    await this.props.loadUser()
  }

  render() {
    const { loggedInUser } = this.props
    return (
      <Router>
        <div className="main-app">
          <AppHeader />
          <main>
            <Switch>
              <Route path='/contact/edit/:id?' component={contactEdit} />
              <Route path='/contact/:id' component={ContactDetails} />
              <Route path='/contact' component={ContactPage} />
              <Route path='/statistic' component={StatisticPage} />
              <Route path='/' component={HomePage} />
            </Switch>
          </main>
          {loggedInUser === null && <SignUp />}
        </div>
      </Router >
    )
  }

}

const mapStateToProps = state => {
  return {
    loggedInUser: state.userModule.loggedInUser
  }
}

const mapDispatchToProps = {
  loadUser
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)
