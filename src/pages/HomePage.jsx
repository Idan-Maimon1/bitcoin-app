import { Component } from 'react'
import { connect } from 'react-redux'
import { MoveList } from '../components/MoveList'
import { bitcoinService } from '../services/bitcoinService'
import { loadUser } from '../store/actions/userActions'
import wave from '../assets/imgs/wave.svg'
import backgorundImg1 from '../assets/imgs/backgorund-img1.svg'
import backgorundImg2 from '../assets/imgs/backgorund-img2.svg'
import backgorundImg3 from '../assets/imgs/backgorund-img3.svg'

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
        <section className='home-page-top'>
          <img src={backgorundImg1} />
          <div>
            <h4>
              Welcome, {loggedInUser.name} you have {loggedInUser.balance} coins!
            </h4>
            <h4>
              BTC: {bitcoinRate}
            </h4>
          </div>
        </section>
        <img src={wave} className='wave-img' />
        <section className='home-page-bottom'>
          <MoveList />
        </section>
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
