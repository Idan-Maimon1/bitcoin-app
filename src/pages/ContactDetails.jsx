import { Component } from 'react'
import { contactService } from '../services/contactService.js'
import { Link } from 'react-router-dom'
import { TransferFund } from '../components/TransferFund'
import { MoveList } from '../components/MoveList.jsx'
import AnimatedPage from '../components/AnimatedPage'


export class ContactDetails extends Component {

    state = {
        contact: null,
        prevNextContactIds: null
    }

    async componentDidMount() {
        await this.loadContact()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadContact()
        }
    }

    async loadContact() {
        const contactId = this.props.match.params.id
        const contact = await contactService.getContactById(contactId)
        this.setState({ contact }, () => {
            this.getNextPrevContactIds(this.state.contact._id)
        })
    }

    async getNextPrevContactIds() {
        const prevNextContactIds = await contactService.getNextAndPrevContactIds(this.state.contact._id)
        this.setState({ prevNextContactIds }, () => {
        })
    }

    onBack = () => {
        this.props.history.goBack()
    }

    render() {
        const { contact, prevNextContactIds } = this.state
        if (!contact || !prevNextContactIds) return <div>Loading...</div>
        return (
            <AnimatedPage>
                <section className='contact-details'>
                    <article className='contact-details-hero'>
                        <p className='details-name'>{contact.name}</p>
                        <div>
                            <img src={`https://robohash.org/${contact._id}`} alt="" />
                            <p className='details-phone'>Phone: {contact.phone}</p>
                            <p className='details-email'>Email: {contact.email}</p>
                        </div>
                        <Link className='details-edit-btn' to={`/contact/edit/${contact._id}`} >Edit</Link>
                        <button onClick={this.onBack} className='details-back-btn'>&#8592; <span>Back</span></button>
                    </article>
                    <div className="prev-next-btns">
                        {['prev', 'next'].map(direction => <Link to={`/contact/${prevNextContactIds[direction]}`} key={direction}>{direction}</Link>)}
                    </div>
                    <TransferFund contact={contact} />
                    <MoveList contact={contact} />
                </section>
            </AnimatedPage>
        )
    }
}
