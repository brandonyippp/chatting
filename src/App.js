import React, { useState, useRef, useEffect } from 'react';
import container from 'react-indiana-drag-scroll';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import SvgIcon from '@material-ui/core/SvgIcon';
import {v4 as uuidv4} from 'uuid';
import AllTopics from './components/AllTopics.js';
import './css/styles.css';

/* 
Known bugs:
  1) behavior: "smooth" for returnHome only works if top-level View (entire browser area) is changed to be outside of
      centered position for home icon in middle. Non-smooth (auto by default) behavior works regardless of top-level
      position and clicking home icon will return home icon to center of screen. Only with behavior: smooth does 
      the behavior change
*/

/* Global Variables */
const MAX_TOPICNAME_LENGTH = 50;
const MIN_TOPICNAME_LENGTH = 2;
let initialDragScrollArea = {x: "199.6vw", y:"199.6vh"};
let initialLoad = true;

/* Remove space on left-most edge of screen */
const RemoveLeftSpacing = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
`;

/* Home button styling */
const IconHome = (props) => {
  return (
      <SvgIcon {...props}>
          <path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
      </SvgIcon>
  )
}
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
  z-index: 2;
  opacity: 1;
`;

/* Everything contained within here */
const ParentContainer = styled.div`
  display: flex;
  position: absolute;
  border: 1px solid red;
  width: 100%;
  height: 100%;
`;

/* Draggable scroll container; Contains area that we want to scroll over */
const DragScrollContainer = styled(container)`
  position: relative;
  border: 5px solid black;
  width: 87%;
  height: 90%;
`;

/* Area contained within ScrollContainer with specified (x, y) size */
const DragScrollArea = styled.div`
  display: flex;
  min-width: ${initialDragScrollArea.x};
  min-height: ${initialDragScrollArea.y};
`;


function App() {
  const [topics, setTopics] = useState([]);
  const TopicNameRef = useRef();

  /* Not sure if needed */
  const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  }

  /* Helper functions for addTopic() */
  const topicCoordinate = (value) => {
    return Math.floor(Math.random() * (value + 1));
  }
  const isValidTopic = topicName => {
    if (topicName.length <= MIN_TOPICNAME_LENGTH || 
      topicName.length >= MAX_TOPICNAME_LENGTH ||
      topicName.trim() === "") {
        return false;
      }
    return true;
  }

  const addTopic = () => {
    const topicName = TopicNameRef.current.value;

    if (!isValidTopic(topicName)) {
      alert("Please enter a valid topic.");
      return;
    }

    const x = topicCoordinate(parseInt(initialDragScrollArea.x));
    const y = topicCoordinate(parseInt(initialDragScrollArea.y));

    setTopics(allTopics => [...allTopics, {topicName: topicName, 
      topicID: uuidv4(), x: x, y: y}]
    );

    TopicNameRef.current.value = null;
  }

  const removeRandomTopic = () => {
    if (topics.length === 0) {
      alert("No topics currently exist.");
      return;
    }

    const elementToDelete = topics[Math.floor(Math.random() * topics.length)];
    const tempTopics = topics.filter((currentTopic => currentTopic.topicID !== elementToDelete.topicID));
    setTopics(tempTopics);
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
      <RemoveLeftSpacing />

      <input ref={TopicNameRef} type="text" placeholder="Chat topic?" />
      <div>
        <button onClick={addTopic}>Add Topic</button>
        <button onClick={removeRandomTopic}>Delete Random Topic</button>
        <h1>{topics.length} topics have been created.</h1>
      </div>

      <ParentContainer>
        <DragScrollContainer>
          <DragScrollArea>

            <AllTopics allTopics={topics} />
            <HomeButton id="homeButtonRef" style={{ fontSize: 60 }} onClick={returnHome} />

          </DragScrollArea>
        </DragScrollContainer>
        <div>yo</div>
      </ParentContainer>
    </>
  );
}

export default App;