import React from 'react'
import "./Model.css"

function ModelContent({ setOpenModal }) {
    
    return (
        <div class="maincontainer">
            <div class="close">
            <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
            </div>
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
            </div>
            </div>
            );
}

export default ModelContent