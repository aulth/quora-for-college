import React, {useContext, useState, useEffect} from 'react'
import Placementitem from './Placementitem'
import Modecontext from './context/Modecontext'
const Placement = () => {
    const {mode, darkText, lightText, darkBg, lightBg} = useContext(Modecontext);
    const [placement, setPlacement] = useState({})
    const getPlacement = async ()=>{
        const url = "https://quoracollegebackend.herokuapp.com/placement/get"
        const response = await fetch(url, {
            method:'GET'
        })
        const data = await response.json();
        if(data.success){
            setPlacement(data.result)
        }else{
            console.log(data.error)
        }
    }
    useEffect(()=>{
        getPlacement()
        //eslint-disable-next-line
    }, [])
    return (
        <>
            <div style={mode==='light'?{background:lightBg }:{background:darkBg}} className="c-container c-placement-page c-bs-bb">
                <div style={mode==='light'?{color:darkText , padding:'20px 0px 20px 0px'}:{color:lightText, background:darkBg, padding:'20px 0px 20px 0px'}} className="c-contaier c-d-flex c-jc-center">
                    <h2>Placement record </h2>
                    {/* <select name="p-session"  className='c-mx-5' defaultValue="2020-21" id="p-session">
                        <option value="2010-11">2010-11</option>
                        <option value="2011-12">2011-12</option>
                        <option value="2012-13">2012-13</option>
                        <option value="2013-14">2013-14</option>
                        <option value="2014-15">2014-15</option>
                        <option value="2015-16">2015-16</option>
                        <option value="2016-17">2016-17</option>
                        <option value="2017-18">2017-18</option>
                        <option value="2018-19">2018-19</option>
                        <option value="2019-20">2019-20</option>
                        <option value="2020-21">2020-21</option>
                    </select> */}
                </div>
                <table>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Package</th>
                        <th>Profile</th>
                        <th>Que Topics</th>
                        <th>Campus</th>
                        <th>Department</th>
                        <th>Session</th>
                        </tr>
                    </thead>
                    <tbody style={mode==='light'?{color:darkText }:{color:lightText}}>
                        {placement && placement.length>0 && placement.map((placement, index)=>{
                            return <Placementitem key={index} name={placement.name} company={placement.company} salary={placement.package} profile={placement.jobprofile} questionTopic={placement.questiontopic} campus={placement.campus} department={placement.department} session={placement.session} />
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Placement