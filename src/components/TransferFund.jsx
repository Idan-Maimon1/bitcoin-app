import { Component } from 'react'

export class TransferFund extends Component {
    render() {
        return (
            <section className='transfer-funds'>
                <h1>Transfer coins to { }:</h1>
                <form>
                    <label htmlFor="">Amount: </label>
                    <input type="text" name="" id="" />
                    <button>Transfer</button>
                </form>
            </section>
        )
    }
}
