import React from 'react';
import "./App.css" 
import applee from '/icons/apple.svg'
import bananna from '/icons/banana.svg'
import diamondd from '/icons/diamond.svg'



const Window = ({apple,diamond,banana,restart}) => {
    return (
        <div id='window'>
            <h3>
                You win
            </h3>
            <button onClick={restart}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="#ffffffff" stroke-linecap="round" stroke-width="2" d="M4 4v5h5M5.07 8a8 8 0 1 1-.818 6"/></svg>
            </button>
            <h4>You picked</h4>
            <div className='window_info'>
                <div>
                    <img src={applee} alt="" />
                    <p>{apple}</p>
                </div>
                <div>
                    <img src={diamondd} alt="" />
                    <p>{diamond}</p>
                </div>
                <div>
                    <img src={bananna} alt="" />
                    <p>{banana}</p>
                </div>
            </div>
        </div>
    );
};

export default Window;