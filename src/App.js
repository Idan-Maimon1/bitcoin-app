import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import './assets/scss/global.scss'
import { AppHeader } from './components/AppHeader'
import { HomePage } from './pages/HomePage'
import { ContactPage } from './pages/ContactPage'
import { StatisticPage } from './pages/StatisticPage'
import { ContactDetails } from './pages/ContactDetails'
import { contactEdit } from './pages/contactEdit';

function App() {

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
        <footer>
          <section>
            coffeeRights 2022 &copy;
          </section>
        </footer>
      </div>
    </Router>
  )

}

export default App;
