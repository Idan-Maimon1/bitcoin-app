import { Component } from 'react'
import { contactService } from '../services/contactService.js'

export class ContactDetailsPage extends Component {

    state = {
        contact: null
    }

    async componentDidMount() {
        this.loadContact()
    }
    
    async loadContact() {
        const contactId = this.props.match.params.id
        const contact = await contactService.getContactById(contactId)
        this.setState({ contact })
    }

    onBack = () => {
        this.props.history.push('/')
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
                <button onClick={this.onBack}>&#8592; &nbsp; Back &nbsp; &nbsp;</button>
            </article>
        )
    }
}
