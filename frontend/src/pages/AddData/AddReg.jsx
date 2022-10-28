import React, { useState } from "react";
import "./dashboard.css"

const App = ({ }) => {
	const [inputList, setInputList] = useState([{ grade: "asdds", value: "ksdn" }]);
	const [formdata,setFormData] = useState({
		reg:"",
		year:""
	});

	
    const onChange = e => setFormData({ ...formdata, [e.target.name]: e.target.value});

	const {reg,year} = formdata;

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
		setInputList([...inputList, { grade: "", value: "" }]);
	};

	const onSubmit = (e) =>{
		e.preventDefault();
		console.log(inputList);
		console.log(reg,year);
		// console.log(b)
	}


	return (
		<div className='h-100'>
			<div className="d-flex justify-content-center text-center">
				<form className='text-center my-2' onSubmit={(e) => onSubmit(e)} >
					<div className="w-100 d-flex justify-content-center">
						<div className="">
							<p className='fw-bolder fs-2 my-2'>ADD New Regulation</p>
							<br />
							<input type="text" name="reg" required placeholder='Regulation Name' onChange={(e) => onChange(e)} className='form-control my-3' />
							<input type="text" name="year" required placeholder='year' onChange={(e) => onChange(e)} className='form-control mb-4' />
						</div>
					</div>
					
					<div className="d-flex justify-content-center">
						<div className="">
							
						{inputList.map((x, i) => {
							return (
								<div key={i}>



									<div className="my-2 w-100 px-2 d-flex justify-content-center ">
										<div className="d-flex justify-content-center w-75">
											<div className="d-flex w-60 grades pl-4">
												<input type="text" required placeholder={x.grade?x.firstName : "Grade"} className='rounded-start grade1' name="grade"  onChange={e => handleInputChange(e, i)} />
												<input type="text" required placeholder={x.value? x.lastName : "value"} name="value" className=' rounded-end grade1'  onChange={e => handleInputChange(e, i)} />
											</div>

											<div className="mx-2">
												{inputList.length !== 1 && <button className='btn btn-danger' onClick={() => handleRemoveClick(i)}>Delete</button>}
											</div>
											<div className="mx-2 ">
												{inputList.length - 1 === i && <button className='btn btn-primary ' onClick={handleAddClick}>Add</button>}
											</div>

										</div>

									</div>

								</div>

							);
						})}
						</div>
					</div>

					<div className="mt-3">
						<button className="btn btn-success w-50 form-control">Submit</button>
					</div>
				</form>
			</div>



		</div>
	);
}

export default App;
