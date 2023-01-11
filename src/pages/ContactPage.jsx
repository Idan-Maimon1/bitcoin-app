import { Component } from 'react'
import { ContactFilter } from '../components/ContactFilter'
import { ContactList } from '../components/ContactList'
import { contactService } from '../services/contactService'
import { ContactDetailsPage } from './ContactDetailsPage'

export class ContactPage extends Component {

    state = {
        contacts: null,
        selectedContactId: null,
        filterBy: null
    }

    componentDidMount() {
        this.loadContacts()
    }

    async loadContacts() {
        try {
            const contacts = await contactService.getContacts()
            this.setState({ contacts })
        }
        catch (err) {
            console.log('err: ', err)
        }
    }

    onSelectContactId = (contactId) => {
        this.setState({ selectedContactId: contactId })
    }

    render() {
        const { contacts,selectedContactId } = this.state
        if (!contacts) return
        return (
            <section className='page'>
                {selectedContactId ?
                    <ContactDetailsPage onBack={() => this.onSelectContactId(null)} contactId={selectedContactId} /> :
                    <>
                        <ContactFilter onChangeFilter={this.onChangeFilter} />
                        <ContactList onSelectContactId={this.onSelectContactId} contacts={contacts} />
                    </>
                }
            </section>
        )
    }
}
