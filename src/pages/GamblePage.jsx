import { Component } from 'react'
import { connect } from 'react-redux'
import { Wheel } from '../components/Wheel.jsx'
import { addCoins } from '../store/actions/userActions.js'
import AnimatedPage from '../components/AnimatedPage'

class _GamblePage extends Component {

  onAddCoins = async (amount) => {
    this.props.addCoins(amount)
  }
  onSubtractCoins = async (amount) => {
    this.props.addCoins(-1 * amount)
  }

  render() {
    const { balance } = this.props.loggedInUser
    return (
      <AnimatedPage>
        <section className='gamble-page-layout'>
          <div className='gamble-page-info'>
            <h1>Welcome to our Gamble Page!</h1>
            <p>
              Where you can spin the wheel of fortune and potentially win big.
            </p>
            <p>
              Please note that <span>  each spin costs 100 coins </span> and all the coins are fictional and have no real value.
            </p>
            <p>
              Good luck and happy spinning!
            </p>
            <p >You currently have <span className='gamble-page-balance'> {balance} coins</span> </p>
          </div>
          <Wheel onAddCoins={this.onAddCoins} onSubtractCoins={this.onSubtractCoins} balance={balance} />
        </section >
      </AnimatedPage>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.userModule.loggedInUser
  }
}

const mapDispatchToProps = {
  addCoins
}

export const GamblePage = connect(mapStateToProps, mapDispatchToProps)(_GamblePage)
