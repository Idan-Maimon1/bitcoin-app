import { Component } from 'react'
import { connect } from 'react-redux'
import { bitcoinService } from '../services/bitcoinService'
import { loadUser } from '../store/actions/userActions'

class _HomePage extends Component {

  state = {
    bitcoinRate: 0,
  }

  async componentDidMount() {
    const user = await this.props.loadUser()
    this.getRate(user)
  } 

  async getRate({balance}) {
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
