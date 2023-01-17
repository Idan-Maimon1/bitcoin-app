import { type } from '@testing-library/user-event/dist/type'
import { Component } from 'react'
import { connect } from 'react-redux'
import { transferCoins } from '../store/actions/userActions'

class _MoveList extends Component {

    formatDate(timeStamp) {
        var tempDate = new Date(timeStamp).toLocaleString()
        var date = tempDate.slice(-10, -9) + tempDate.slice(-2) + ' ' + tempDate.slice(0, -12)
        return date
    }

    render() {
        const { loggedInUser, contactName } = this.props
        const moves = contactName ? loggedInUser.moves.splice(0, 3) : loggedInUser.moves
        if (!moves.length || !loggedInUser) return
        return (
            <section className='move-list'>
                <h1>MoveList</h1>
                {moves.map(move =>
                    <section key={move.at}>
                        <p>To: {move.to}</p>
                        <p>Amount: {move.amount}</p>
                        <p>At: {this.formatDate(move.at)}</p>
                    </section>
                )}
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

export const MoveList = connect(mapStateToProps, mapDispatchToProps)(_MoveList)
