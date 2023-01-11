import { Component } from 'react'
import { Chart } from '../components/Chart'
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
        <section className='charts-page'>
            <Chart data={marketPrice} />
            <Chart data={confirmedTransactions} />
        </section>
    )
}
}
