import React from 'react'
import { ContactPreview } from './ContactPreview'

export function ContactList({ contacts }) {
  return (
    <section className='contact-list'>
      {contacts.map(contact => <ContactPreview key={contact._id} contact={contact}/>
      )}
    </section >
  )
}
