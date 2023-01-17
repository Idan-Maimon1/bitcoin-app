import { Component } from 'react'
import { connect } from 'react-redux'
import { transferCoins } from '../store/actions/userActions'

class _MoveList extends Component {

    filterMoves = (moves, { _id }) => {
        return moves.filter(move => {
            return move.toId === _id
        }).slice(-3)
    }

    formatDate(timeStamp) {
        const day = new Date(timeStamp).getDate()
        const month = (new Date(timeStamp).getMonth() + 1)
        const hour = new Date(timeStamp).getHours()
        const minutes = new Date(timeStamp).getMinutes()
        return day + '/' + month + ' ' + hour + ':' + minutes
    }

    render() {
        const { loggedInUser, contact } = this.props
        if (!loggedInUser) return
        const moves = contact ? this.filterMoves(loggedInUser.moves, contact) : loggedInUser.moves
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
