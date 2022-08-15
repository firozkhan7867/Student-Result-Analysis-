import React from 'react'
import "./widgetlg.css"
import btns from "./semsbtn.json"
export default function WidgetLg() {
    const s=btns.data;
    const Button = ({type}) => {
        return <button className={'widgetLgButton ' + type} >{type}</button>
    }

    return (
        <div className='widgetLg'>
            <h3 className="widgetLgTitle">
                Toppers Data
            </h3>
            <table className="widgetLgTable">
                <tr className="widgetLgTr">
                    <th className="widgetLgTh">Rank</th>
                    <th className="widgetLgTh">R.No</th>
                    <th className="widgetLgTh">Name</th>
                    <th className="widgetLgTh">CGPA</th>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                        <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                        alt="" className='widgetLgImg' />
                    <span className="widgetLgNa">Firoz Khan</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgAmount">$122.00</td>
                    <td className="widgetLgStatus">
                    <Button type="Approved" />
                    </td>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                        <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                        alt="" className='widgetLgImg' />
                    <span className="widgetLgNa">Firoz Khan</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgAmount">$122.00</td>
                    <td className="widgetLgStatus">
                    <Button type="Declined" />
                    </td>
                </tr><tr className="widgetLgTr">
                    <td className="widgetLgUser">
                        <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                        alt="" className='widgetLgImg' />
                    <span className="widgetLgNa">Firoz Khan</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgAmount">$122.00</td>
                    <td className="widgetLgStatus">
                    <Button type="Pending" />
                    </td>
                </tr><tr className="widgetLgTr">
                    <td className="widgetLgUser">
                        <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                        alt="" className='widgetLgImg' />
                    <span className="widgetLgNa">Firoz Khan</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgAmount">$122.00</td>
                    <td className="widgetLgStatus">
                    <Button type="Approved" />
                    </td>
                </tr>
            </table>

            <div>
                {s.map(function(d, idx){
                    return (<button key={idx}>{d.name}</button>)
                })}
             </div>
        </div>
    )
}
 