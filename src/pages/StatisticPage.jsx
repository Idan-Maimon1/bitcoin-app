import { Component } from 'react'
import { Chart } from '../components/Chart'
import AnimatedPage from '../components/AnimatedPage'
import { bitcoinService } from '../services/bitcoinService'

export class StatisticPage extends Component {
  state = {
    marketPrice: null,
    confirmedTransactions: null,
    isLoading: true
  }

  async componentDidMount() {
    const marketPrice = await bitcoinService.getMarketPrice()
    const confirmedTransactions = await bitcoinService.getConfirmedTransactions()
    this.setState({ marketPrice, confirmedTransactions, isLoading: false })
  }

  render() {
    const { marketPrice, confirmedTransactions, isLoading } = this.state
    if (isLoading) return <div>Loading...</div>
    return (
      <AnimatedPage>
        <section className='charts-page'>
          <h1>Statistics</h1>
          <div className='charts-container'>
            <Chart data={{ ...marketPrice, color: '#64e7bb' }} />
            <Chart data={{ ...confirmedTransactions, color: '#7047da' }} />
          </div>
        </section>
      </AnimatedPage>
    )
  }
}
