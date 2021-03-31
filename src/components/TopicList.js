import React from 'react';
import Topic from './Topic.js';
import StyledComponents from 'styled-components';

export default function TopicList({ topicList }) {
    return (
        topicList.map(currentTopic => <Topic key={currentTopic.topicID} topic={currentTopic} />)
    )
}
