import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

function CreateTicket(){

const navigate=useNavigate();

const [loading,setLoading]=useState(false);

const [formData,setFormData]=useState({

customer_name:"",
customer_email:"",
subject:"",
description:""

});

const handleChange=(e)=>{

setFormData({

...formData,
[e.target.name]:e.target.value

});

};

const handleSubmit=async(e)=>{

e.preventDefault();

try{

setLoading(true);

await api.post(
"/tickets",
formData
);

toast.success(
"Ticket created"
);

navigate("/");

}
catch(err){

console.log(err);

toast.error(
"Failed creating ticket"
);

}
finally{

setLoading(false);

}

};

return(

<div
style={{

minHeight:
"calc(100vh - 75px)",

display:"flex",

justifyContent:"center",

alignItems:"center",

padding:"30px",

background:
"linear-gradient(135deg,#081120,#0f172a)"

}}
>

<div
style={{

width:"100%",
maxWidth:"700px",

padding:"35px",

borderRadius:"24px",

background:"#162236",

boxShadow:
"0 20px 60px rgba(0,0,0,.45)"

}}
>

<h1
style={{
color:"white",
marginBottom:"8px"
}}
>
Create Ticket
</h1>

<p
style={{
color:"#94a3b8",
marginBottom:"25px"
}}
>
Register customer issue
</p>

<form
onSubmit={handleSubmit}
>

<input
name="customer_name"
placeholder="Customer Name"
onChange={handleChange}
style={inputStyle}
/>

<input
name="customer_email"
placeholder="Customer Email"
onChange={handleChange}
style={inputStyle}
/>

<input
name="subject"
placeholder="Issue Subject"
onChange={handleChange}
style={inputStyle}
/>

<textarea
rows="5"
name="description"
placeholder="Issue Description"
onChange={handleChange}
style={inputStyle}
/>

<button
style={buttonStyle}
>

{
loading
?
"Creating..."
:
"Create Ticket"
}

</button>

</form>

</div>

</div>

);

}

const inputStyle={

width:"100%",

padding:"16px",

marginBottom:"16px",

background:"#243247",

border:"1px solid rgba(255,255,255,.05)",

borderRadius:"14px",

color:"white"

};

const buttonStyle={

width:"100%",

padding:"16px",

background:
"linear-gradient(90deg,#2563eb,#3b82f6)",

border:"none",

borderRadius:"14px",

color:"white",

fontSize:"16px",

cursor:"pointer"

};

export default CreateTicket;