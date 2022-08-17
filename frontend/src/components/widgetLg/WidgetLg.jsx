import React from 'react'
// import "./widgetlg.css"
//import Button from 'react-bootstrap/Button';
import { useState } from "react";
import Modal from "../../components/model/Model";



import btns from "./semsbtn.json"
export default function WidgetLg() {
    const s=btns.data;
    const Button = ({type}) => {
        return 
        <button className={'widgetLgButton ' + type} >{type}</button>
    }
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className=''>
            <table className="widgetLgTable">
                <tr className="widgetLgTr">
                    <th className="widgetLgTh">Rank</th>
                    <th className="widgetLgTh">R.No</th>
                    <th className="widgetLgTh">Name</th>
                    <th className="widgetLgTh">CGPA</th>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                        
                    <span className="widgetLgNa">Firoz Khan</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgAmount">$122.00</td>
                    <td className="widgetLgStatus">
                    9.00
                    </td>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                        
                    <span className="widgetLgNa">Firoz Khan</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgAmount">$122.00</td>
                    <td className="widgetLgStatus">
                    8.33
                    </td>
                </tr><tr className="widgetLgTr">
                    <td className="widgetLgUser">
                       
                    <span className="widgetLgNa">Firoz Khan</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgAmount">Firoz Khan</td>
                    <td className="widgetLgStatus">
                    8.99
                    </td>
                </tr><tr className="widgetLgTr">
                    <td className="widgetLgUser">
                       
                    <span className="widgetLgNa">Firoz Khan</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgAmount">$122.00</td>
                    <td className="widgetLgStatus">
                    7.99
                    </td>
                </tr>
            </table>

            <div>
                {s.map(function(d, idx){
                    return ( 
                        <>
                    <button className="button" key={idx} onClick={() => {
                        setModalOpen(true);
                      }}>{d.name}</button>
                       {modalOpen && <Modal setOpenModal={setModalOpen} />}
                      </>
                      )
                   

                      
                    //
                })}
             </div>
        </div>
    )
}
 