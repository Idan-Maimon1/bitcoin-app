import React, { Component } from 'react'
import { contactService } from '../services/contactService'

export class contactEdit extends Component {

  state = {
    contact: null,
    contactParams: ['name', 'phone', 'email']
  }

  async componentDidMount() {
    const contactId = this.props.match.params.id
    const contact = contactId ? await contactService.getContactById(contactId) : contactService.getEmptyContact()
    this.setState({ contact })
  }

  handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? (+target.value || '') : target.value
    this.setState(prevState => ({ contact: { ...prevState.contact, [field]: value } }))
  }

  onSaveContact = async (ev) => {
    ev.preventDefault()
    const { name, email, phone } = this.state.contact
    if (!name || !email || !phone) {
      alert('Please fill out all of the fields')
      return
    }
    await contactService.saveContact({ ...this.state.contact })
    this.props.history.push('/contact')
  }

  onDeleteContact = async () => {
    contactService.deleteContact(this.state.contact._id)
    this.props.history.push('/contact')
  }

  onBack = () => {
    this.props.history.goBack()
  }

  render() {
    const { contact, contactParams } = this.state
    if (!contact || !contactParams) return <div>Loading...</div>

    return (
      <section className='contact-edit'>
        <button onClick={this.onBack} className='edit-back-btn'>back</button>
        <h1>{contact._id ? 'Edit' : 'Add'} Contact</h1>
        <form onSubmit={this.onSaveContact}>
          {contactParams.map(param =>
            <div key={param + 7}>
              <label htmlFor={param}>{param}</label>
              <input value={contact[param]} onChange={this.handleChange} type="text" name={param} id={param} />
            </div>
          )}
          <section className='edit-form-btns'>
            {contact._id && <button onClick={this.onDeleteContact} className='edit-delete' type="button">delete</button>}
            <button type="submit">Save</button>
          </section>
        </form>
      </section>
    )
  }
}

