import React, {useState} from 'react'
import Modecontext from './Modecontext'
const Modestate = (props) => {
    const darkText = 'black';
    // const darkBg = 'rgba(68, 74, 71, 1)';
    const darkBg = '#313131'
    const lightBg = 'rgba(243,245,247, 1)';
    const lightText = 'rgba(243,245,247, 1)';
    const [mode, setMode] = useState(localStorage.getItem('color-mode')?localStorage.getItem('color-mode'):'light');
    const modeSwitch = ()=>{
    if(mode==='light'){
    setMode('dark');
    localStorage.setItem('color-mode','dark');
    }else if(mode==='dark'){
    setMode('light');
    localStorage.setItem('color-mode','light');
    }
    }
  return (
      <Modecontext.Provider value={{darkBg, darkText, lightBg, lightText, mode, modeSwitch}}>
          {props.children}
      </Modecontext.Provider>
  )
}

export default Modestate