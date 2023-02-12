import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import { useAnimation } from './hooks/useAnimation';
import { useUniverse } from './hooks/useUniverse';

function App() {
  const { universe, Cell, memory } = useUniverse();
  const {genCount, canvasRef} = useAnimation({universe, memory, Cell});

  return (
    <div id="playground">
      <h3 style={{margin: '10px'}}>Generation {genCount}</h3>
      <canvas style={{outline: '1px solid grey'}} ref={canvasRef}></canvas>
    </div>
  )
}

export default App
