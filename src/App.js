import React, { useState, useRef, useEffect } from 'react';
import container from 'react-indiana-drag-scroll';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import SvgIcon from '@material-ui/core/SvgIcon';
import {v4 as uuidv4} from 'uuid';
import TopicList from './components/TopicList';
import './css/styles.css';

/* 
Known bugs:
  1) behavior: "smooth" for returnHome only works if top-level View (entire browser area) is changed to be outside of
      centered position for home icon in middle. Non-smooth (auto by default) behavior works regardless of top-level
      position and clicking home icon will return home icon to center of screen. Only with behavior: smooth does 
      the behavior change
*/

const MAX_TOPICNAME_LENGTH = 8;
let initialDragScrollArea = {x: "199.6vw", y:"199.6vh"};
let initialLoad = true;

const IconHome = (props) => {
  return (
      <SvgIcon {...props}>
          <path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
      </SvgIcon>
  )
}
const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
`;
const ParentContainer = styled.div`
  position: relative;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: end;
`;
const ScrollContainer = styled(container)`
  border: 2px solid #708090;
  min-width: 0%;
  max-width: 99.8%;
  min-height: 10vh;
  max-height: 90vh;
  position: relative;
`;
const DragScrollArea = styled.div`
  display: flex;
  min-width: ${initialDragScrollArea.x};
  min-height: ${initialDragScrollArea.y};
`;
const HomeButton = styled(IconHome)`
  display: flex;
  border: 2.5px solid black;
  color: black;
  border-radius: 40px;
  padding: 4px;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  margin: auto;
  z-index: 99;
  opacity: 1;
`;

function App() {
  const [topics, setTopics] = useState([]);
  const TopicNameRef = useRef();

  const topicCoordinate = (value) => {
    return Math.floor(Math.random() * (value + 1));
  }

  //maybe think of some cool logic here later
  const topicNameSubString = (topicName) => {
    let finalString = topicName;
    if (topicName.length > MAX_TOPICNAME_LENGTH) {
      finalString = topicName.substr(0, MAX_TOPICNAME_LENGTH) + '\n...';
    }
    return finalString;
}
  const addTopic = () => {
    const topicName = TopicNameRef.current.value;
    if (topicName.trim() === '') {
      alert('Please enter a valid conversation topic!');
    } else {
      const topicNameShortened = topicNameSubString(topicName);
      const x = topicCoordinate(parseInt(initialDragScrollArea.x));
      const y = topicCoordinate(parseInt(initialDragScrollArea.y));

      setTopics(allTopics => [...allTopics, {topicName: topicName, 
        topicNameShortened: topicNameShortened, topicID: uuidv4(), x: x, y: y}]
      );
    }
    TopicNameRef.current.value = null;
  }
  const returnHome = () => {
    if (initialLoad) {
      document.getElementById("homeButtonRef").scrollIntoView(
        { block: "center", inline: "center" }
      );
      initialLoad = false;
    } else {
      document.getElementById("homeButtonRef").scrollIntoView(
        { block: "center", inline: "center", behavior: "smooth" }
      );
    }
  }

  window.onload = returnHome;

  return (
    <>
      <GlobalStyle />
      {/*
      <input ref={TopicNameRef} type="text" placeholder="Chat topic?"></input>
      <div>
        <button onClick={addTopic}>Add Topic</button>
        <h1>{topics.length} topics have been created.</h1>
      </div>
      */}
      <ParentContainer>
        <ScrollContainer className="scroll-container">
          <DragScrollArea>
            <TopicList topicList={topics}></TopicList>
            <HomeButton id="homeButtonRef" style={{ fontSize: 60 }} onClick={returnHome}>center</HomeButton>
          </DragScrollArea>
        </ScrollContainer>
        <button style={{color: "red"}}>hisssss</button>
      </ParentContainer>
    </>
  );
}

export default App;