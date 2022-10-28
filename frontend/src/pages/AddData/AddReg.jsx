import React, { useState } from "react";
import "./dashboard.css"
 
function App() {
  const [inputList, setInputList] = useState([{ firstName: "mm", lastName: "mmm" }]);
 
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
 
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
 
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { firstName: "aa", lastName: "bb" }]);
  };
 

  return (
    <div className='h-100'>
    <div className="d-flex justify-content-center text-center">
     <form className='text-center my-2' >
    <div className="w-100 d-flex justify-content-center">
    <div className="">
    <p className='fw-bolder fs-2 my-2'>ADD New Regulation</p>
      <br />
     <input type="text" name="branch" placeholder='Regulation Name' className='form-control my-2'  />
     <input type="text" name="branch" placeholder='year' className='form-control'  />
         </div>
     </div>
     </form>
     </div>
     
     
     {inputList.map((x, i) => {
        return(
        <div>

   
    
    <div className=" my-2 w-100 px-4">
                    <div className="d-flex ">
                        <div className="d-flex w-60 grades">
                            <input type="text" placeholder='grade' className='rounded-start grade1' name="grade" onChange={e => handleInputChange(e, i)} />
                            <input type="text" placeholder='value' name="value"  className=' rounded-end grade1' onChange={e => handleInputChange(e, i)} />
                        </div>

                        <div className="mx-2">
                        {inputList.length !== 1 && <button className='btn btn-danger' onClick={() => handleRemoveClick(i)}>Delete</button>}
                        </div>
                        <div className="mx-2 ">
                        {inputList.length - 1 === i && <button className='btn btn-primary '  onClick={handleAddClick}>Add</button>}
                        </div>

                    </div>

                </div>

        </div>
        
        );
     })}  

    </div>
  );
}
 
export default App;
