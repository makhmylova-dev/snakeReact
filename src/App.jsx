import React, { useEffect, useRef, useState } from 'react';
import './App.css' 
import applee from '/icons/apple.svg'
import bananna from '/icons/banana.svg'
import diamondd from '/icons/diamond.svg'
import play from '/icons/play.svg'
import replay from '/icons/replay.svg'
import pause from '/icons/pause.svg'


const GridSize = 20
const AreaSize = 29

const App = () => {
  const [isActive,setIsActive] = useState(false)

  const [score,setScore] = useState(0)

  const [snake,setSnake] = useState([[Math.floor(Math.random()*AreaSize),Math.floor(Math.random()*AreaSize)]])

  const [apple,setApple] = useState([Math.floor(Math.random()*AreaSize),Math.floor(Math.random()*AreaSize)])

  const [banana,setBanana] = useState([Math.floor(Math.random()*AreaSize),Math.floor(Math.random()*AreaSize)])

  const [scoreBanana,setScoreBanana] = useState(0)

  const [diamond,setDiamond] = useState([Math.floor(Math.random()*AreaSize),Math.floor(Math.random()*AreaSize)])

  const [scoreDiamond,setScoreDiamond] = useState(0)

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

    let eatFood = false

//сьесть еду
    if (
      head[0] == apple[0] && head[1] == apple[1]){
      setScore(score+1)
      setApple([
      Math.floor(Math.random() * AreaSize ),
      Math.floor(Math.random() * AreaSize )
      ])
      eatFood = true
    } 
    if (
      head[0] == banana[0] && head[1] == banana[1]){
      setScoreBanana(scoreBanana+1)
      setBanana([
      Math.floor(Math.random() * AreaSize ),
      Math.floor(Math.random() * AreaSize )
      ])
      eatFood = true
    } 
    if (
      head[0] == diamond[0] && head[1] == diamond[1]){
      setScoreDiamond(scoreDiamond+1)
      setDiamond([
      Math.floor(Math.random() * AreaSize ),
      Math.floor(Math.random() * AreaSize )
      ])
      eatFood = true
    } 

    if (
      !eatFood 
    ) 
    {
      newSnake.pop()
    }


    setSnake (newSnake)
  }

  const startGame = () => {
    setIsActive(prev => !prev)
  }
  const resetGame = () => {
    setSnake([[Math.floor(Math.random()*AreaSize),Math.floor(Math.random()*AreaSize)]])
    setScore(0)
    setScoreBanana(0)
    setScoreDiamond(0)
    setDirection([1,0])
    setIsActive(false)
    setBanana([Math.floor(Math.random()*AreaSize),Math.floor(Math.random()*AreaSize)])
    setDiamond([Math.floor(Math.random()*AreaSize),Math.floor(Math.random()*AreaSize)])
    setApple([Math.floor(Math.random()*AreaSize),Math.floor(Math.random()*AreaSize)])
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
            <img src={bananna} alt="" />
            <p>{scoreBanana}</p>
          </div>
          <div>
            <img src={diamondd} alt="" />
            <p>{scoreDiamond}</p>
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
          background: index == 0 ?  "black" : "yellow",
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
          backgroundImage:`url('/icons/red-apple.svg')`,
          backgroundSize:"cover",
        }}>
        </div>

        <div style={{
          position:"absolute",
          left:banana[0] *GridSize,
          top:banana[1] *GridSize,
          width: GridSize,
          height: GridSize,
          backgroundImage:`url('/icons/banana.svg')`,
          backgroundSize:"cover",
        }}>
        </div>
        <div style={{
          position:"absolute",
          left:diamond[0] *GridSize,
          top:diamond[1] *GridSize,
          width: GridSize,
          height: GridSize,
          backgroundImage:`url('/icons/diamond.svg')`,
          backgroundSize:"cover",
        }}>
        </div>



      </div>
    </div>
  );
};

export default App;
