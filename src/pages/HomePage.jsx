import { Component } from 'react'
import { userService } from '../services/userService'
import { bitcoinService } from '../services/bitcoinService'

export class HomePage extends Component {

  state = {
    user: null,
    bitcoinRate: 0,
  }

  async componentDidMount() {
    const user = await userService.getUser()
    this.setState({ user }, () => this.getRate())
  }

  async getRate() {
    try {
      const bitcoinRate = await bitcoinService.getRate(this.state.user.coins)
      this.setState({ bitcoinRate })
    }
    catch (err) {
      console.log('err: ', err)
    }
  }

  render() {
    const { user, bitcoinRate } = this.state
    if (!user || !bitcoinRate) return
    return (
      <div>
        <div>
          <h4>
            Welcome, {user.name} you have {user.coins} coins!
          </h4>
          <h4>
            BTC: {bitcoinRate}
          </h4>
        </div>
      </div>
    )
  }
}
