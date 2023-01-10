import './assets/scss/global.scss'
import { AppHeader } from './components/AppHeader'
import { HomePage } from './pages/HomePage'
import { ContactPage } from './pages/ContactPage'
import { StatisticPage } from './pages/StatisticPage'
import { Component } from 'react'


const Outlet = ({ page }) => {

  switch (page) {
    case 'home':
      return <HomePage />
    case 'contacts':
      return <ContactPage />
    case 'statistics':
      return <StatisticPage />
    default:
      return <HomePage />
  }
}

class App extends Component {

  state = {
    page: 'home'
  }

  onChangePage = ({ target }) => {
    this.setState({ page: target.dataset.name })
  }

  render() {
    return (
      <div className="main-app">
        <AppHeader onChangePage={this.onChangePage} />
        <main>
          <Outlet page={this.state.page} />
        </main>
        <footer>
          <section>
            coffeeRights 2022 &copy;
          </section>
        </footer>
      </div>
    )
  }

}

export default App;
