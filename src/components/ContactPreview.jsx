import React from 'react'

export function ContactPreview({ contact, onSelectContactId }) {
  return (
    <section className='contact-preview'>
      <div onClick={() => onSelectContactId(contact._id)}>{contact.name}</div>
    </section>
  )
}
