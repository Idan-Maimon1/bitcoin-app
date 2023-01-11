import React from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines';

export function Chart(props) {

    const { name, description, values } = props.data
    if (!values) return <div>Loading...</div>
    return (
        <article className="chart-preview">
            <h2>{name}</h2>
            <Sparklines data={values} width={100} height={50} margin={5}>
                <SparklinesLine  color="aquamarine" style={{ fill: "none" }} />
            </Sparklines>
            <p>{description}</p>
        </article>
    )
}
