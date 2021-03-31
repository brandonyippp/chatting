import React, { useState, useRef, useEffect } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import StyledComponents, { createGlobalStyle } from 'styled-components';
import TopicList from './components/TopicList.js';
import {v4 as uuidv4} from 'uuid';
import "./css/styles.css"

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

const DragScrollArea = StyledComponents.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 199.8vw;
  min-height: 199.6vh;
  position: relative;
`;

const DragScrollAreaCenter = StyledComponents.div`
  margin: 0 auto;
  position: relative;
  padding: 10px;
  height: auto;
  width: 20px;
  border: solid red;
  background: red;
`;

function App() {
  const TopicNameRef = useRef();
  const DragScrollAreaCenterRef = useRef();


  const [topics, setTopics] = useState([]);

  function addTopic() {
    const topicName = TopicNameRef.current.value;
    if (topicName === '') { return; }

    setTopics(allTopics => [...allTopics, {topicName: topicName, topicID: uuidv4()}])
    TopicNameRef.current.value = null;
  }

  function scrollToCenter() {
    DragScrollAreaCenterRef.scrollIntoView({
      behavior: "smooth"
    });
  }
    
  return (
    <>
      <GlobalStyle />
      <input ref={TopicNameRef} type="text" placeholder="Chat topic?"></input>
      <div>
        <button onClick={addTopic}>Add Topic</button>
        <h1>You have {topics.length} topics created!</h1>
      </div>

      <ScrollContainer className="scroll-container">
        <DragScrollArea>
          <TopicList topicList={topics}></TopicList>
          <DragScrollAreaCenter ref={DragScrollAreaCenterRef}>AA</DragScrollAreaCenter>
        </DragScrollArea>
      </ScrollContainer>
    </>
  );
}

export default App;