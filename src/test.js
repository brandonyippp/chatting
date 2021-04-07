import React, { useState, useRef, useEffect } from 'react';
import container from 'react-indiana-drag-scroll';
import styled, { createGlobalStyle } from 'styled-components';
import SvgIcon from '@material-ui/core/SvgIcon';
import {v4 as uuidv4} from 'uuid';

import TopicList from './components/TopicList';
import './css/styles.css';

let initialDragScrollArea = {x: "199.6vw", y:"199.6vh"};

const IconHome = (props) => {
  return (
      <SvgIcon {...props}>
          <path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
      </SvgIcon>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
  
  html {
    margin: 0;
    padding: 0;
  }
`;
const ScrollContainer = styled(container)`
border: solid red;
border-width: thin;
min-width: 99.9vw;
max-width: 98.9vw;
min-height: 99.8vh;
max-height: 99.8vh;
position: absolute;
}
`;
const DragScrollArea = styled.div`
  display: flex;
  min-width: ${initialDragScrollArea.x};
  min-height: ${initialDragScrollArea.y};
`;
const DragScrollCenter = styled(IconHome)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  margin: auto;
  z-index: 99;
`;

function App() {
  const [topics, setTopics] = useState([]);
  const TopicNameRef = useRef();

  const topicCoordinate = (value) => {
    return Math.floor(Math.random() * (value + 1));
  }
  const addTopic = () => {
    const topicName = TopicNameRef.current.value;
    if (topicName === '') { return; }

    let x = topicCoordinate(parseInt(initialDragScrollArea.x));
    let y = topicCoordinate(parseInt(initialDragScrollArea.y));

    setTopics(allTopics => [...allTopics, {topicName: topicName, 
      topicID: uuidv4(), x: x, y: y}]
    );
      
    TopicNameRef.current.value = null;
  }
  const initialPageLoad = () => {
      document.getElementById("centerRef").scrollIntoView(
        { block: "center", inline: "center" }
      );
  }
  const returnHome = () => {
    document.getElementById("centerRef").scrollIntoView(
      { block: "center", inline: "center", behavior: "smooth" }
    );
  }

  window.onload = initialPageLoad;

  return (
    <>
      <GlobalStyle />
      
      <input ref={TopicNameRef} type="text" placeholder="Chat topic?"></input>
      <div>
        <button onClick={addTopic}>Add Topic</button>
        <h1>{topics.length} topics have been created.</h1>
      </div>

      <ScrollContainer className="scroll-container">
        <DragScrollArea>
          <TopicList topicList={topics}></TopicList>
          <DragScrollCenter id="centerRef" style={{ fontSize: 60 }} onClick={returnHome}>center</DragScrollCenter>
        </DragScrollArea>
      </ScrollContainer>
    </>
  );
}

export default App;