import { useState } from "react";
import axios from "axios";

function Enquiry(){



	const[name, setName] = useState("");
	const[phone,setPhone] = useState("");
	const[query,setQuery] = useState("");


	const hName = (event) => { setName(event.target.value);}
	const hPhone = (event) => { setPhone(event.target.value);}
	const hQuery = (event) => { setQuery(event.target.value);}

	const save = (event) => {

		event.preventDefault();
		let urladd = "http://localhost:9000/save";
		axios.post(urladd, {name, phone, query})
		.then(res=>{

			alert("We will call you in 2 hrs");
			setName("");
			setPhone("");
			setQuery("");
		})
		.catch(err=> console.log(err));
	}

	return(
		
		<>
		<center>
			<h1> Fill the Form </h1>
			<form onSubmit = {save} >
				<input type="text" placeholder="Enter Name" onChange={hName} value={name} /><br/><br/>
				<input type="number" placeholder="Enter Phone"  onChange={hPhone} value={phone} /><br/><br/>
				<textarea placeholder="Enter Query" cols={50} onChange={hQuery} value={query}></textarea><br/><br/>
				<input type="submit" value="Save"/>
			</form>
		</center>
		</>
	);
}
export default Enquiry;