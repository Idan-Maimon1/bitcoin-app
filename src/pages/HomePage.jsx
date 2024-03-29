import { Component } from 'react'
import { connect } from 'react-redux'
import { MoveList } from '../components/MoveList'
import { bitcoinService } from '../services/bitcoinService'
import { loadUser } from '../store/actions/userActions'
import AnimatedPage from '../components/AnimatedPage'
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
      <AnimatedPage>
        <div className='homepage'>
          <section className='home-page-top'>
            <div className='hero'>
              <img src={backgorundImg1} />
              <div>
                <p className='greeting'> Hey {loggedInUser.name} </p>
                <p>
                  Welcome to our website,
                  where you can easily transfer coins to your contacts.
                  Our user-friendly platform offers fast
                  service for managing your coins. Try us out today for seamless and
                  convenient transactions.
                  (The coins on this website dosent have any real value,
                  the rates shown on the website calculated as if 1 coin was worth 1 usd)
                </p>
                <p>
                  you currently have <span className='home-page-balance'>{loggedInUser.balance} coins!</span>
                </p>
                <p>
                  thats worth {bitcoinRate} in BTC
                </p>
              </div>
            </div>
          </section>
          <section className='home-page-center'>
            <img src={wave} className='wave-img' />
            <div className='hero'>
              <img src={backgorundImg2} className='bkg-img' />
              <p>Our website is designed to provide the best viewing experience on any device. Our responsive design automatically adjusts to fit all screen sizes, ensuring easy navigation and clear readability on desktop, tablet, and mobile.</p>
            </div>
          </section>
          <section className='home-page-bottom'>
            <div className="hero">
              <img src={backgorundImg3} alt="" />
              <p>Bitcoin app is a platform where users get 100 coins when
                signing up, and then they can transfer those coins to their contacts.
                The contacts can be managed, including the ability to add
                new ones, edit existing ones, or delete them.you can also
                see the worth of your coins in BTC (Assumin 1 coin equals 1 USD).
                You can also see your lasts transactions in the homepage and your last
                transfer to a spesific contact in the contact page.
              </p>
            </div>
            <MoveList />
          </section>
        </div>
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
  loadUser
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)
