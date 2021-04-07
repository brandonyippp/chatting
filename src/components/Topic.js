import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import styled from 'styled-components';

const IconHumanMale = (props) => {
    return (
      <SvgIcon {...props}>
        <path fill="currentColor" d="M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12,6A2,2 0 0,1 10,4A2,2 0 0,1 12,2M10.5,7H13.5A2,2 0 0,1 15.5,9V14.5H14V22H10V14.5H8.5V9A2,2 0 0,1 10.5,7Z" />
      </SvgIcon>
    );
}
const IconHome = (props) => {
    return (
        <SvgIcon {...props}>
            <path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
        </SvgIcon>
    )
}
const IconHumanWave = (props) => {
    return (
        <SvgIcon {...props}>
            <path fill="currentColor" d="M1.5,4V5.5C1.5,9.65 3.71,13.28 7,15.3V20H22V18C22,15.34 
            16.67,14 14,14C14,14 13.83,14 13.75,14C9,14 5,10 5,5.5V4M14,4A4,4 0 0,0 10,8A4,4 0 0,
            0 14,12A4,4 0 0,0 18,8A4,4 0 0,0 14,4Z" />
        </SvgIcon>
    )
}

/* STILL HAVE TO FIGURE OUT HOW TO FADE-IN BUTTON HOVER */
const TopicIcon = styled(IconHumanWave)`
    margin: 0px;
    opacity: 0.9;
    &:hover {
        opacity: 1;
    }
    &:active {
        color: black;
    }
`;
const TopicContainer = styled.div`
    border: 3px solid black;
    border-radius: 100px;
    left: ${props => props.topic.x ? props.topic.x : 100}vw;
    top: ${props => props.topic.y ? props.topic.y : 100}vh;
    min-height: 60px;
    max-height: 110px;
    min-width: 60px;
    max-width: 110px;
    padding: 10px;
    position: absolute;
    text-align: center;
    font: 15px Garamond, "Times New Roman", Arial, serif;
    font-weight: 1000;
    overflow: hidden;
    color: #9932CC;
    cursor: pointer;
    &:active {
        color: black;
    }
`;

export default function Topic({ topic }) {
    return (
        <>
        <TopicContainer topic={topic}>
            <TopicIcon style={{ fontSize: 40 }} topic={topic}></TopicIcon>
            <br />
            {topic.topicNameShortened}
        </TopicContainer>
        </>
    )
}