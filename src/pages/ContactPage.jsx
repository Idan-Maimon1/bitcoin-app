import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ContactFilter } from '../components/ContactFilter'
import { ContactList } from '../components/ContactList'
import { loadContacts, setFilterBy } from '../store/actions/contactActions'
import AnimatedPage from '../components/AnimatedPage'

class _ContactPage extends Component {

    async componentDidMount() {
        this.props.loadContacts()
    }

    onChangeFilter = (filterBy) => {
        this.props.setFilterBy(filterBy)
        this.props.loadContacts()
    }

    render() {
        const { contacts } = this.props
        if (!contacts) return <div>Loading...</div>
        return (
            <AnimatedPage>
                <section className='contacts-page'>
                    <ContactFilter onChangeFilter={this.onChangeFilter} />
                    <ContactList contacts={contacts} />
                    <Link to="/contact/edit" className='add-contect-btn'>+</Link>
                </section>
            </AnimatedPage>
        )
    }
}


const mapStateToProps = state => {

    return {
        contacts: state.contactModule.contacts
    }
}

const mapDispatchToProps = {
    loadContacts,
    setFilterBy,
}

export const ContactPage = connect(mapStateToProps, mapDispatchToProps)(_ContactPage)
