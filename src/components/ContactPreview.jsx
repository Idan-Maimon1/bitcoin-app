import React from 'react'

export function ContactPreview({ contact, onSelectContactId }) {
  if (!contact) return
  const { _id, name } = contact
  return (
    <section className='contact-preview'>
      <img src={`https://robohash.org/${_id}`} alt="" />
      <div onClick={() => onSelectContactId(_id)}>{name}</div>
    </section>
  )
}
