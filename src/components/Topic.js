import React from 'react'
import StyledComponents from 'styled-components'

export default function Topic({ topic }) {
    return (
        <div>
            <label>ID: {topic.topicID} <br></br>   Name: {topic.topicName}</label>
        </div>
    )
}