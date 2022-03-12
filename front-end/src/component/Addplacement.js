import React, {useState, useContext} from 'react'
import Modecontext from './context/Modecontext';
const Addplacement = () => {
    const {mode, darkText, lightText, darkBg} = useContext(Modecontext);
    const [placement, setPlacement] = useState({});
    const handleOnChange = (e)=>{
        e.preventDefault();
        setPlacement({...placement, [e.target.name]:e.target.value});
        console.log(placement)
    }
    const darkInput = {
        color:lightText,
        background:'rgba(255,255,255,0.1)',
    }
  return (
    <div style={mode==='light'?{color:darkText}:{background:darkBg, color:lightText}} className="c-container c-add-placement-page">
        <form  className='c-d-flex c-placement-form'>
            <input style={mode==='light'?{color:darkText}:darkInput} type="text" placeholder='Company' onChange={handleOnChange} name='company' required/>
            <input style={mode==='light'?{color:darkText}:darkInput} type="number" placeholder='No of Job' onChange={handleOnChange}  name="jobs" required/>
            <input style={mode==='light'?{color:darkText}:darkInput} type="number" placeholder='Salary' onChange={handleOnChange}  name="salary" required/>
            <input style={mode==='light'?{color:darkText}:darkInput} type="text" placeholder='Department' onChange={handleOnChange} name='company' required/>

            <input type="submit" value="Add"/>
        </form>
    </div>
  )
}

export default Addplacement