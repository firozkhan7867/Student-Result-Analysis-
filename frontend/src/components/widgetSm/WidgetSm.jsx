import { Visibility } from '@material-ui/icons'
import React from 'react'
import "./widgetsm.css"
import btns from "./semsbtn.json"
export default function WidgetSm() {
    
    //  btns =[{"name":"sem-1"},{"name":"sem-2"}];
    const s=btns.data;
    return (
        <div className='widgetSm'>
            <span className="widgetSmTitle"> 
            New Join Members
            </span>
                <ul className="widgetSmList">
                    <li className='widgetSmListItem'>
                        <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                        alt="" className='widgetSmImg' />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">Anna keller</span>
                            <span className="widgetSmUserTitle">Software Engineer</span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className='widgetSmIcon' />
                            Display
                        </button>
                    </li>
                    <li className='widgetSmListItem'>
                        <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                        alt="" className='widgetSmImg' />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">Anna keller</span>
                            <span className="widgetSmUserTitle">Software Engineer</span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className='widgetSmIcon' />
                            Display
                        </button>
                    </li>
                    <li className='widgetSmListItem'>
                        <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                        alt="" className='widgetSmImg' />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">Anna keller</span>
                            <span className="widgetSmUserTitle">Software Engineer</span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className='widgetSmIcon' />
                            Display
                        </button>
                    </li>
                    <li className='widgetSmListItem'>
                        <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                        alt="" className='widgetSmImg' />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">Anna keller</span>
                            <span className="widgetSmUserTitle">Software Engineer</span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className='widgetSmIcon' />
                            Display
                        </button>
                    </li>
                    <li className='widgetSmListItem'>
                        <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                        alt="" className='widgetSmImg' />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">Anna keller</span>
                            <span className="widgetSmUserTitle">Software Engineer</span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className='widgetSmIcon' />
                            Display
                        </button>
                    </li>
                </ul>
                 <div>
                {s.map(function(d, idx){
                    return (<button key={idx}>{d.name}</button>)
                })}
             </div>
        </div>
    )
}