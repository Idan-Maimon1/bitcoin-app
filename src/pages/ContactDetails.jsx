import { Component } from 'react'
import { contactService } from '../services/contactService.js'
import { Link } from 'react-router-dom'

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
        this.props.history.push('/')
    }

    render() {
        const { contact, prevNextContactIds } = this.state
        if (!contact || !prevNextContactIds) return <div>Loading...</div>
        return (
            <article className='contact-details'>
                <p className='details-name'>{contact.name}</p>
                <Link to={`/contact/${prevNextContactIds.prev}`} className="prev-next-btns">prev</Link>
                <Link to={`/contact/${prevNextContactIds.next}`} className="prev-next-btns">next</Link>
                <div>
                    <img src={`https://robohash.org/${contact._id}`} alt="" />
                    <p className='details-phone'>Phone: {contact.phone}</p>
                    <p className='details-email'>Email: {contact.email}</p>
                </div>
                <Link className='details-edit-btn' to={`/contact/edit/${contact._id}`} >Edit</Link>
                <button onClick={this.onBack}>&#8592; &nbsp; Back &nbsp; &nbsp;</button>
            </article>
        )
    }
}
