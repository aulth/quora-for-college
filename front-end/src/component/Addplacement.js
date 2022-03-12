import React, {useState, useContext} from 'react'
import swal from 'sweetalert';
import Modecontext from './context/Modecontext';
const Addplacement = () => {
    const [placement, setPlacement] = useState({name:'', company:'', package:'', jobProfile:'', questionTopic:'', campus:'On Campus', department:'Computer', session:'2018-19'})
    const {mode, darkText, lightText, darkBg} = useContext(Modecontext);
    const handleOnChange = (e)=>{
        e.preventDefault();
        setPlacement({...placement, [e.target.name]:e.target.value});
    }
    const darkInput = {
        color:lightText,
        background:'rgba(255,255,255,0.1)',
    }
    const add = async (e)=>{
        e.preventDefault();
        const url = 'https://quoracollegebackend.herokuapp.com/placement/add';
        const response = await fetch(url, {
            method:'POST',
            headers:{
                'content-Type':'application/json'
            },
            body:JSON.stringify(placement)
        })
        const data = await response.json();
        if(data.success){
            swal('Placement', 'Placement record added successfully', 'success');
            setPlacement({name:'', company:'', package:'', jobProfile:'', questionTopic:'', campus:'On Campus', department:'Computer', session:'2018-19'})
        }else{
            swal('Placement', 'Placement record not added', 'error');
        }
    }
  return (
    <div style={mode==='light'?{color:darkText}:{background:darkBg, color:lightText}} className="c-container c-add-placement-page">
        <form onSubmit={add}  className='c-d-flex c-placement-form'>
            <input style={mode==='light'?{color:darkText}:darkInput} value={placement.name} type="text" placeholder='Name' onChange={handleOnChange} name='name' required/>
            <input style={mode==='light'?{color:darkText}:darkInput} value={placement.company} type="text" placeholder='Company' onChange={handleOnChange}  name="company" required/>
            <input style={mode==='light'?{color:darkText}:darkInput} value={placement.package} type="number" placeholder='Package' onChange={handleOnChange}  name="package" required/>
            <input style={mode==='light'?{color:darkText}:darkInput} value={placement.jobProfile} type="text" placeholder='Job Profile' onChange={handleOnChange} name='jobProfile' required/>
            <input style={mode==='light'?{color:darkText}:darkInput} value={placement.questionTopic} type="text" placeholder='Question Topic' onChange={handleOnChange} name='questionTopic' required/>
            <select className='c-placement-page-select-tag'  style={mode==='light'?{color:darkText}:darkInput}  onChange={handleOnChange} name="campus" id="campus">
                <option value="On Campus" style={mode==='light'?{color:darkText}:{color:lightText, background:darkBg}}  >On Campus</option>
                <option value="Off Campus" style={mode==='light'?{color:darkText}:{color:lightText, background:darkBg}} >Off Campus</option>
            </select>
            <select className='c-placement-page-select-tag'  style={mode==='light'?{color:darkText}:darkInput}  onChange={handleOnChange} name="department" id="department">
                <option value="Computer" style={mode==='light'?{color:darkText}:{color:lightText, background:darkBg}}  >Computer</option>
                <option value="Electronics" style={mode==='light'?{color:darkText}:{color:lightText, background:darkBg}} >Electronics</option>
                <option value="Electrical" style={mode==='light'?{color:darkText}:{color:lightText, background:darkBg}} >Electrical</option>
                <option value="Mechanical" style={mode==='light'?{color:darkText}:{color:lightText, background:darkBg}} >Mechanical</option>
                <option value="Civil" style={mode==='light'?{color:darkText}:{color:lightText, background:darkBg}} >Civil</option>
            </select>
            <select className='c-placement-page-select-tag' required style={mode==='light'?{color:darkText}:darkInput} onChange={handleOnChange} name="session" id="session">
                <option  style={mode==='light'?{color:darkText}:{color:lightText, background:darkBg}}  >Choose session</option>
                <option value="2018-19" style={mode==='light'?{color:darkText}:{color:lightText, background:darkBg}}  >2018-19</option>
                <option value="2019-20" style={mode==='light'?{color:darkText}:{color:lightText, background:darkBg}}  >2019-20</option>
                <option value="2020-21" style={mode==='light'?{color:darkText}:{color:lightText, background:darkBg}} >2020-21</option>
                <option value="2021-22" style={mode==='light'?{color:darkText}:{color:lightText, background:darkBg}} >2021-22</option>
            </select>

            <input type="submit" value="Add"/>
        </form>
    </div>
  )
}

export default Addplacement