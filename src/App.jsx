import React, { useEffect, useRef, useState } from 'react';
import './App.css' 
import applee from '/icons/apple.svg'
import bananna from '/icons/banana.svg'
import diamondd from '/icons/diamond.svg'
import play from '/icons/play.svg'
import replay from '/icons/replay.svg'
import pause from '/icons/pause.svg'
import Window from './Window';

const GridSize = 20
const AreaSize = 29

const App = () => {
  const [isActive,setIsActive] = useState(false)

  const [score,setScore] = useState(0)

  const [snake,setSnake] = useState([[Math.floor(Math.random()*AreaSize),Math.floor(Math.random()*AreaSize)]])

  const [apple,setApple] = useState([Math.floor(Math.random()*AreaSize),Math.floor(Math.random()*AreaSize)])

  const [banana,setBanana] = useState(null)

  const [scoreBanana,setScoreBanana] = useState(0)

  const [diamond,setDiamond] = useState(null)

  const [scoreDiamond,setScoreDiamond] = useState(0)

  const [direction,setDirection] = useState([1,0])

  const nextDirection = useRef ([1,0])

  const intervalRef = useRef(null)

  const diamondRef = useRef(null)

  const [isWin,setIsWin] = useState(false)

  const randomPos = () => [
    Math.floor(Math.random()*AreaSize),
    Math.floor(Math.random()*AreaSize)
  ]

  useEffect (() => {
    if (scoreBanana>=3 && scoreDiamond>=1 && score>=10) {
      setIsActive (false)
      setIsWin (true)
    }
  },[scoreBanana,scoreDiamond,score])

  useEffect (() => {
   const handleKeyDown = (e) => {
    let newDir = (null)
    if (e.key == "ArrowUp" ) {
      newDir = [0,-1]
    }
    if (e.key == "ArrowDown" ) {
      newDir = [0,1]
    }
    if (e.key == "ArrowRight" ) {
      newDir = [1,0]
    }
    if (e.key == "ArrowLeft" ) {
      newDir = [-1,0]
    }

    if (newDir){
      if (
        newDir[0] !== -direction[0] || 
        newDir[1] !== -direction[1]
      ){
        nextDirection.current = newDir
      }
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

  useEffect(() => {
    if (!banana && Math.random () < 0.02) {
      setBanana (randomPos())
    }
  },[snake])

  useEffect (() => {
    if (!diamond && Math.random () < 0.008) {
      const newDiamond = randomPos()
      setDiamond (newDiamond) 

      //исчезновение 5 сек
      if (diamondRef.current) {
        clearTimeout (diamondRef.current)
      }
      diamondRef.current = setTimeout(() => {
        setDiamond (null)
      },5000)

    }
  },[snake])

  const moveSnake = () => {
    setDirection (nextDirection.current)
    const newSnake = [...snake]
    const dir = nextDirection.current
    const head = [
      newSnake[0][0] + dir[0],
      newSnake[0][1] + dir[1],

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
      banana && head[0] == banana[0] && head[1] == banana[1]){
      setScoreBanana(scoreBanana+1)
      setBanana([
      Math.floor(Math.random() * AreaSize ),
      Math.floor(Math.random() * AreaSize )
      ])
      eatFood = true
    } 
    if (
      diamond && head[0] == diamond[0] && head[1] == diamond[1]){
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
    setSnake([randomPos(

    )])
    setScore(0)
    setScoreBanana(0)
    setScoreDiamond(0)
    setDirection([1,0])
    nextDirection.current=[1,0]
    setIsActive(false)
    setBanana(null)
    setDiamond(null)
    setApple(randomPos())
    setIsWin(false)
  }

  return (
    isWin ? (
      <Window apple={score} diamond={scoreDiamond} banana={scoreBanana} restart={resetGame}/>  
    ) : (
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
        width: AreaSize*GridSize ,
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
          borderRadius:'150px',
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

        {banana && (
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
        )}

        {diamond && (
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
        )}

      </div>
    </div>
    ) 
    
   
  );
};

export default App;
