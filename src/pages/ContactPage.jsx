import { Component } from 'react'
import { Link } from 'react-router-dom'
import { ContactFilter } from '../components/ContactFilter'
import { ContactList } from '../components/ContactList'
import { contactService } from '../services/contactService'

export class ContactPage extends Component {

    state = {
        contacts: null,
        filterBy: null
    }

    componentDidMount() {
        this.loadContacts()
    }

    async loadContacts() {
        try {
            const contacts = await contactService.getContacts(this.state.filterBy)
            this.setState({ contacts })
        }
        catch (err) {
            console.log('err: ', err)
        }
    }

    onChangeFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadContacts)
    }

    render() {
        const { contacts } = this.state
        if (!contacts) return
        return (
            <section className='page'>
                <ContactFilter onChangeFilter={this.onChangeFilter} />
                <ContactList contacts={contacts} />
                <Link to="/contact/edit" className='add-contect-btn'>+</Link>
            </section>
        )
    }
}
