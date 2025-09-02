import React from 'react';
import './App.css' 
import apple from '/icons/apple.svg'
import banana from '/icons/banana.svg'
import diamond from '/icons/diamond.svg'
import play from '/icons/play.svg'
import replay from '/icons/replay.svg'
import pause from '/icons/pause.svg'

const App = () => {
  return (
    <div id='app'>
      <header>
        <div className='header-left'>
          <div>
            <img src={apple} alt="" />
            <p>2</p>
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
          <button>
            <img src={play} alt="" />
          </button>
          <button>
            <img src={replay} alt="" />
          </button>

        </div>
      </header>
    </div>
  );
};

export default App;
