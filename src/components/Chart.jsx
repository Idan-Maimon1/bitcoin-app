import React from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines';

export function Chart(props) {

    const { name, description, values, color } = props.data
    if (!values) return <div>Loading...</div>
    return (
        <article className="chart-preview">
            <h2>{name}</h2>
            <Sparklines data={values} width={120} height={60} margin={5}>
                <SparklinesLine color={color} style={{ fill: "none" }} />
            </Sparklines>
            <p>{description}</p>
        </article>
    )
}
