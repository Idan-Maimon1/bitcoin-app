import React from 'react'
import { ContactPreview } from './ContactPreview'

export function ContactList({ contacts, onSelectContactId }) {
  return (
    <section className='contact-list'>
      {contacts.map(contact => <ContactPreview key={contact._id} contact={contact} onSelectContactId={onSelectContactId}/>
      )}
    </section >
  )
}
