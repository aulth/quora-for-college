import React, {useContext} from 'react'
import Modecontext from './context/Modecontext';

const Footer = () => {
    const {darkText, lightText, mode} = useContext(Modecontext);
  return (
    <>
    <div style={mode==='light'?{color:darkText, position:'fixed', bottom:'0'}:{color:lightText, position:'fixed', bottom:'0'}}  className="c-container">
    Created with <i style={{color:'red'}} className="bi bi-heart-fill"></i> by <a style={mode==='light'?{color:darkText}:{color:lightText}} href="https://aulth.github.io/usman">Mohd Usman</a>
    </div>
    </>
  )
}

export default Footer