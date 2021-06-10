import React from 'react';
import Topic from './Topic.js';

export default function AllTopics({ allTopics }) {
    return (
        allTopics.map(currentTopic => 
            <Topic key={currentTopic.topicID} topic={currentTopic}/>)
    )
}