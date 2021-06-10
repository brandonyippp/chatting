import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import FadeIn from 'react-fade-in';

/* Different Icons */
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

/* Main container that holds the icon, doesn't do much else */
const TopicContainer = styled.div`
    left: ${props => props.topic.x ? props.topic.x : 100}vw;
    top: ${props => props.topic.y ? props.topic.y : 100}vh;
    position: absolute;
    color: #9932CC;
    z-axis: 99;
    &:active ${TopicIcon} {
        color: black;
    }
`;

/* Container that holds everything that pops up when topic is pressed */
const ModalContainer = styled.div`
    font-size: 15px;
    color: #ffffff;
    border-radius: 8px;
    background: black;
    overflow: visible;
    text-align: center;
    justify-content: center;
    padding: 8px;
`;

/* Styling for things that appear in popup window on topic press */
const ModalCloseButton = styled.button`
    cursor: pointer;
    position: absolute;
    display: block;
    padding: 2px 5px;
    line-height: 20px;
    right: -10px;
    top: -10px;
    font-size: 24px;
    background: #ffffff;
    border-radius: 18px;
    border: 1px solid #cfcece;
`;
const ModalHeader = styled.div`
    width: 100%;
    border-bottom: 1px solid gray;
    font-size: 18px;
    padding-top: 10px;
    padding-bottom: 10px;
`;
const ModalContent = styled.div`
    width: 100%;
    padding-top: 20px;
    padding-bottom: 10px;
    padding-left: 5px;
    padding-right: 5px;
`;
const ModalActions = styled.div`
    width: 100%;
    padding: 5px 0;
    margin: auto;
    text-align: center;
    border-top: 1px solid grey;
`;
const ModalActionButton = styled.button`
    color: #fff !important;
    text-transform: uppercase;
    margin: 0 1px;
    text-decoration: none;
    background: #ed3330;
    padding: 20px;
    border-radius: 5px;
    border: none;
    transition: all 0.4s ease 0s;

    &:hover {
        background: #434343;
        letter-spacing: 1px;
        -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
        -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
        box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
        transition: all 0.4s ease 0s;
    }
`;


export default function Topic({ topic }) {
    return (
        <TopicContainer topic={topic}>
            <Popup trigger={<TopicIcon style={{ fontSize: 40 }}></TopicIcon>}
            modal 
            nested
            >
                {close => (
                    <FadeIn>
                        <ModalContainer>

                            <ModalCloseButton onClick={close}>
                                &times;
                            </ModalCloseButton>

                            <ModalHeader>CHAT TOPIC</ModalHeader>

                            <ModalContent>
                                {' '}
                                {topic.topicName}
                            </ModalContent>

                            <ModalActions>
                                <ModalActionButton>talk</ModalActionButton>
                                <ModalActionButton>close</ModalActionButton>
                            </ModalActions>

                        </ModalContainer>
                    </FadeIn>
                )}
            </Popup>
        </TopicContainer>
    )
}