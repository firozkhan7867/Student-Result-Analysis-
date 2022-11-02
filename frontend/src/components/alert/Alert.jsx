import React from 'react';

const  Alert = ({type,msg,onclick,bb}) => {
  return (
        <div className={`alert alert-${bb} alert-dismissible fade show d-flex justify-content-between`} role="alert">
            <div className="" >
                <strong>{type} ...!!</strong> {msg}
            </div>
            <button type="button" onClick={() => {onclick('')}} className="rounded p-2 bg-danger text-white close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
  )
}

export default Alert;