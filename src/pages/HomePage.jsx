import { Component } from 'react'
import { connect } from 'react-redux'
import { MoveList } from '../components/MoveList'
import { bitcoinService } from '../services/bitcoinService'
import { loadUser } from '../store/actions/userActions'

class _HomePage extends Component {

  state = {
    bitcoinRate: null,
  }
  componentDidMount() {
    if (this.props.loggedInUser.name) {
      this.getRate(this.props.loggedInUser.balance)
    }
  }
  componentDidUpdate() {
    const { loggedInUser } = this.props
    if (this.state.bitcoinRate === null && loggedInUser) {
      this.getRate(loggedInUser.balance)
    }
  }

  async getRate(balance) {
    try {
      const bitcoinRate = await bitcoinService.getRate(balance)
      this.setState({ bitcoinRate })
    }
    catch (err) {
      console.log('err: ', err)
    }
  }

  render() {
    const { bitcoinRate } = this.state
    const { loggedInUser } = this.props
    if (!loggedInUser || !bitcoinRate) return
    return (
      <div>
        <div>
          <h4>
            Welcome, {loggedInUser.name} you have {loggedInUser.balance} coins!
          </h4>
          <h4>
            BTC: {bitcoinRate}
          </h4>
        </div>
        <MoveList />
      </div>
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

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)
