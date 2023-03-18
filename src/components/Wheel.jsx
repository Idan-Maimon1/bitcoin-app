import { Component } from 'react'

export class Wheel extends Component {

    state = {
        wheelData: [
            { color: '#db7093', value: 100 },
            { color: '#0fc8bd', value: 1 },
            { color: '#d63e92', value: 20 },
            { color: '#daa520', value: 0 },
            { color: '#ff340f', value: 1000 },
            { color: '#ff7f50', value: 10 },
            { color: '#3cb371', value: 50 },
            { color: '#4169e1', value: 500 }
        ],
        wheelValue: 0,
        isModalOn: false,
        wheelValueIdx: 0,
    }

    initSpin = ({ target }) => {
        if (this.props.balance < 100) {
            alert(`You dont have enough coins, you need ${100 - this.props.balance} more coins to spin the wheel.`)
            return
        }
        target.disabled = true
        var { wheelValue } = this.state
        this.props.onSubtractCoins(100)
        wheelValue += 1500 + Math.ceil(Math.random() * 3600)
        this.setState({ wheelValue, wheelValueIdx: Math.floor(((wheelValue % 360) + 23) / (360 / 8)) })
        let { style } = document.querySelector('.wheel')
        style.transform = "rotate(" + -wheelValue +
            "deg)"
        setTimeout(() => this.toggleModal(true, target), 4300);
    }

    toggleModal = (isModalOn, target) => {
        isModalOn ? target.disabled = false : this.setState({ wheelValueIdx: 0 })
        this.setState({ isModalOn })
        if (isModalOn) {
            const { wheelData, wheelValueIdx } = this.state
            setTimeout(() => this.props.onAddCoins(wheelData[wheelValueIdx].value), 1000);
        }
    }

    render() {
        const { wheelData, wheelValueIdx, isModalOn } = this.state
        return (
            <section className='wheel-layout'>
                {isModalOn &&
                    <div className='wheel-modal' style={{ 'background': wheelData[wheelValueIdx].color }}>
                        <div>
                            <h3>Congratulations you won {wheelData[wheelValueIdx].value} &#8383; !</h3>
                            <button onClick={() => this.toggleModal(false)}>ok</button>
                        </div>
                    </div>}
                <div className="wheel-container">
                    <button onClick={this.initSpin} className="spin-btn">
                        Spin
                        <div className='wheel-pointer'></div></button>
                    <div className="wheel">
                        {wheelData.map((currData, idx) =>
                            <div className="number" key={currData.color} style={{ '--i': idx + 1, '--clr': currData.color }}><span>{currData.value}</span></div>)}
                    </div>
                </div>
            </section>
        )
    }
}
