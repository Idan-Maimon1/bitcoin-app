import { Component } from 'react'
import { contactService } from '../services/contactService.js'

export class ContactDetailsPage extends Component {

    state = {
        contact: null
    }

    async componentDidMount() {
        const contact = await contactService.getContactById(this.props.contactId)
        this.setState({ contact })
    }

    render() {
        const { contact } = this.state
        if (!contact) return <div>Loading...</div>
        return (
            <article className='contact-details'>
                <p className='details-name'>{contact.name}</p>
                <div>
                    <img src={`https://robohash.org/${contact._id}`} alt="" />
                    <p className='details-phone'>Phone: {contact.phone}</p>
                    <p className='details-email'>Email: {contact.email}</p>
                </div>
                <button onClick={this.props.onBack}>&#8592; &nbsp; Back &nbsp; &nbsp;</button>
            </article>
        )
    }
}
