import React, {useContext} from 'react'
import Modecontext from './context/Modecontext';
const About = () => {
    const {darkText, darkBg, lightBg, lightText, mode} = useContext(Modecontext);
  return (
    <>
    <div style={mode==='light'?{backgroundColor:lightBg, color:darkText, minHeight:'100vh', paddingTop:'15px'}:{backgroundColor:darkBg, color:lightText, minHeight:'100vh', paddingTop:'15px'}} className="c-container c-text-center  c-d-flex c-fd-col c-bs-bb">
    CollegeQuora is a paltform where students can ask questions and get answers from the classmate/seniors/faculties. 
    <div className="c-container c-text-center">
    Created with <i style={{color:'red'}} class="bi bi-heart-fill"></i> by <a style={mode==='light'?{color:darkText}:{color:lightText}} href="https://aulth.github.io/usman">Mohd Usman</a>
    </div>
    </div>
    </>
  )
}

export default About