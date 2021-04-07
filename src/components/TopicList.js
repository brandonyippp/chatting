import React from 'react';
import Topic from './Topic.js';

export default function TopicList({ topicList }) {
    return (
        topicList.map(currentTopic => 
            <Topic key={currentTopic.topicID} topic={currentTopic}/>)
    )
}
