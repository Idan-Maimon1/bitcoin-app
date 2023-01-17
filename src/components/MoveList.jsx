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

    filterMoves = (moves, contactName) => {
        return moves.filter(move => {
            return move.to.toLocaleLowerCase() === contactName.toLocaleLowerCase()
        }).slice(-3)
    }

    render() {
        const { loggedInUser, contactName } = this.props
        const moves = contactName ? this.filterMoves(loggedInUser.moves, contactName) : loggedInUser.moves
        if (!moves || !moves.length) return
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
