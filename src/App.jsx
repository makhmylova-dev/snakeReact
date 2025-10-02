import React, { useEffect, useRef, useState } from 'react';
import './App.css' 
import applee from '/icons/apple.svg'
import redapple from '/icons/red-apple.svg'
import banana from '/icons/banana.svg'
import diamond from '/icons/diamond.svg'
import play from '/icons/play.svg'
import replay from '/icons/replay.svg'
import pause from '/icons/pause.svg'


const GridSize = 20
const AreaSize = 29

const App = () => {
  const [isActive,setIsActive] = useState(false)

  const [score,setScore] = useState(0)

  const [snake,setSnake] = useState([[8,8]])

  const [apple,setApple] = useState([5,5])

  const [direction,setDirection] = useState([1,0])

  const intervalRef = useRef (null)

  useEffect (() => {
   const handleKeyDown = (e) => {
    if (e.key == "ArrowUp" && direction[1] !== 1) {
      setDirection([0,-1])
    }
    if (e.key == "ArrowDown" && direction[1] !== -1) {
      setDirection([0,1])
    }
    if (e.key == "ArrowRight" && direction[0] !== 1) {
      setDirection([1,0])
    }
    if (e.key == "ArrowLeft" && direction[0] !== -1) {
      setDirection([-1,0])
    }
   }
   window.addEventListener('keydown',handleKeyDown)
   return () => window.removeEventListener ('keydown',handleKeyDown)
  },[direction])

  useEffect (() => {
    if (isActive) {
      intervalRef.current = setInterval (moveSnake,200)
      
    } else {
      clearInterval(intervalRef.current)}
      return () => clearInterval(intervalRef.current) 
  },[isActive,snake,direction])
  const moveSnake = () => {
    const newSnake = [...snake]
    const head = [
      newSnake[0][0] + direction[0],
      newSnake[0][1] + direction[1],

    ]

//проверка сталкновения
    if (
      head[0]<0 || head[1]<0 ||
      head[0]>= AreaSize || head[1]>= AreaSize ||
      newSnake.some ((seg) => seg[0] == head[0] && seg[1] == head[1] ) 
    ){
      setIsActive (false)
    
      return
    }
    newSnake.unshift (head)

//сьесть еду
    if (
      head[0] == apple[0] && head[1] == apple[1]){
      setScore(score+1)
      setApple([
      Math.floor(Math.random() * AreaSize ),
      Math.floor(Math.random() * AreaSize )
      ])
    }

    newSnake.pop()
    setSnake (newSnake)
  }

  const startGame = () => {
    setIsActive(prev => !prev)
  }
  const resetGame = () => {
    setSnake([[8,8]])
    setScore(0)
    setDirection([1,0])
    setIsActive(false)
    setApple([5,5])
  }

  return (
    <div id='app'>
      <header>
        <div className='header-left'>
          <div>
            <img src={applee} alt="" />
            <p>{score}</p>
          </div>
          <div>
            <img src={banana} alt="" />
            <p>4</p>
          </div>
          <div>
            <img src={diamond} alt="" />
            <p>7</p>
          </div>
        </div>
        <div className='header-right'>
          <button onClick={startGame}>
            {isActive ? (
              <img src={pause} alt="" />
            ) : (
              <img src={play} alt="" />
            )}
          </button>
          <button onClick={resetGame} className='repBtn'>
            <img src={replay} alt="" />
          </button>

        </div>
      </header>
      <div className='area' style={{
        position: "relative",
        width: AreaSize*GridSize + 80,
        height: AreaSize*GridSize
      }}>

        {snake.map((seg,index) => (

        <div  key={index} style = {{
          position:"absolute",
          width: GridSize,
          height: GridSize,
          background:"limegreen",
          left:seg[0] *GridSize,
          top:seg[1] *GridSize,
          }}>
        </div>
        ))}
          
        <div style={{
          position:"absolute",
          left:apple[0] *GridSize,
          top:apple[1] *GridSize,
          width: GridSize,
          height: GridSize,
          backgroundImage:`url(${redapple})`,
          backgroundSize:"cover",
        }}>

        </div>



      </div>
    </div>
  );
};

export default App;
