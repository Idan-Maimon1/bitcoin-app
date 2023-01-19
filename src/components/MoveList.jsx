import { Component } from 'react'
import { connect } from 'react-redux'
import { transferCoins } from '../store/actions/userActions'
import transferImg from '../assets/imgs/transfer-img.png'

class _MoveList extends Component {

    filterMoves = (moves, { _id }) => {
        return moves.filter(move => {
            return move.toId === _id
        }).slice(-3)
    }

    formatDate(timeStamp) {
        const hour = new Date(timeStamp).getHours()
        const minutes = new Date(timeStamp).getMinutes()
        const day = new Date(timeStamp).getDate()
        const month = (new Date(timeStamp).getMonth() + 1)
        const year = (new Date(timeStamp).getYear() + '').slice(-2)
        return hour + ':' + minutes + ' ' + day + '/' + month + '/' + year
    }

    render() {
        const { loggedInUser, contact } = this.props
        if (!loggedInUser) return
        const moves = contact ? this.filterMoves(loggedInUser.moves, contact) : loggedInUser.moves.slice(-6)
        if (!moves || !moves.length) return
        return (
            <section className='move-list'>
                <div className='move-list-header'>
                    <h1><span className="blue-color">
                        Recent</span> Moves</h1>
                    <p>In this section you can see your last 6 approved moves</p>
                </div>
                <div className='transfers-container'>
                    {moves.map(move =>
                        <section key={move.at}>
                            <div className='transfer-block-top'>
                                <img src={transferImg} alt="" />
                                <p>{move.to}</p>
                            </div>
                            <div>
                                <p>You successfully transferd {move.amount} coins</p>
                                <p>To {move.to}</p>
                            </div>
                            <p className='transfer-date'> {this.formatDate(move.at)}</p>
                        </section>
                    )}
                </div>
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
