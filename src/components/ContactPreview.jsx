import React from 'react'
import { Link } from 'react-router-dom'

export function ContactPreview({ contact }) {
  if (!contact) return
  const { _id, name } = contact
  return (
    <section>
      <Link to={`/contact/${_id}`} className='contact-preview'>
        <img src={`https://robohash.org/${_id}`} alt="" />
        <div>{name}</div>
      </Link>
    </section>
  )
}
