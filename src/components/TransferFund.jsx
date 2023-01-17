import { Component } from 'react'
import { connect } from 'react-redux'
import { transferCoins } from '../store/actions/userActions'

class _TransferFund extends Component {
    state = {
        amount: ''
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = +target.value || ''
        this.setState({ [field]: value })
    }

    onTransferCoins = async (ev) => {
        ev.preventDefault()
        this.props.transferCoins(this.props.contact, this.state.amount)
        this.state.amount = ''
    }

    render() {
        const { amount } = this.state
        const { name } = this.props.contact
        return (
            <section className='transfer-funds'>
                <h1>Transfer coins to {name}:</h1>
                <form onSubmit={this.onTransferCoins}>
                    <label htmlFor="amount">Amount: </label>
                    <input value={amount} onChange={this.handleChange} type="number" name="amount" placeholder='Amount' />
                    <button disabled={amount <= 0}>Transfer</button>
                </form>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    transferCoins
}

export const TransferFund = connect(mapStateToProps, mapDispatchToProps)(_TransferFund)
