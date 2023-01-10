import { Component } from 'react'
import { userService } from '../services/userService'

export class HomePage extends Component {

  state = {
    user:  null,
    bitcoinRate: 0,
  }

  componentDidMount() {
    this.getUser()
  }

  async getUser() {
    try {
      const user = await userService.getUser()
      this.setState({ user })
    }
    catch (err) {
      console.log('err: ', err)
    }
  }

  render() {
    const { user } = this.state
    return (
      <div>
        <h1>
          HomePage
        </h1>
        {JSON.stringify(user)}
      </div>
    )
  }
}
