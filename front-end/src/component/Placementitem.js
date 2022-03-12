import React from 'react'

const Placementitem = (props) => {
    const {name, company, salary, profile, questionTopic, campus, department, session} = props;
    return (
        <>
            <tr>
                <td>{name}</td>
                <td>{company}</td>
                <td>{salary}</td>
                <td>{profile}</td>
                <td>{questionTopic}</td>
                <td>{campus}</td>
                <td>{department}</td>
                <td>{session}</td>
            </tr>
        </>
    )
}

export default Placementitem