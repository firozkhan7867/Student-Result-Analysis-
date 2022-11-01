import React from 'react';

const  Alert = ({type,msg,onclick}) => {
  return (
        <div className={`alert alert-${type} alert-dismissible fade show d-flex justify-content-between`} role="alert">
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