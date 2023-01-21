import { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { transferCoins } from '../store/actions/userActions'
import transferImg from '../assets/imgs/transfer-img.png'

class _MoveList extends Component {

    filterMovesById = (moves, id) => {
        return moves.filter(move => {
            return move.toId === id
        })
    }

    sortMoves(moves) {
        return moves.sort((a, b) => b.at - a.at)
    }

    formatDate(timeStamp) {
        const date = new Date(timeStamp)
        const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        const minutes = date.getMinutes()
        const day = date.getDate()
        const month = (date.getMonth() + 1)
        const year = (date.getYear() + '').slice(-2)
        return hours + ':' + minutes + ' ' + day + '/' + month + '/' + year
    }

    getMoves({ moves }, contact) {
        return this.sortMoves(contact ?
            this.filterMovesById(moves, contact._id).slice(-3)
            : moves.slice(-9))
    }

    render() {
        const { loggedInUser, contact } = this.props
        if (!loggedInUser) return
        const moves = this.getMoves(loggedInUser, contact)
        if (!moves || !moves.length) return
        return (
            <section className='move-list'>
                <div className='move-list-header'>
                    <h1><span className="blue-color">
                        Recent</span> Moves</h1>
                    <p>In this section you can see your last {contact ? 3 : 9} approved moves {contact ? 'to ' + contact.name : ''}</p>
                </div>
                <div className='transfers-container'>
                    {moves.map(move =>
                        <Link to={`/contact/${move.toId}`} key={move.at}>
                            <div className='transfer-block-top'>
                                <img src={transferImg} alt="" />
                                <p>{move.to}</p>
                            </div>
                            <div>
                                <p>You successfully transferd {move.amount} coins</p>
                                <p>To {move.to}</p>
                            </div>
                            <p className='transfer-date'> {this.formatDate(move.at)}</p>
                        </Link>
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
