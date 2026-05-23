import {
useEffect,
useState
} from "react";
import toast from "react-hot-toast";
import {
useParams,
useNavigate
} from "react-router-dom";

import api from "../services/api";

function TicketDetails(){

const {id}=useParams();
const navigate=
useNavigate();

const [ticket,setTicket]=
useState(null);

const [status,setStatus]=
useState("");

const [note,setNote]=
useState("");

useEffect(()=>{

fetchTicket();

},[]);

const fetchTicket=
async()=>{

try{

const res=
await api.get(
`/tickets/${id}`
);

setTicket(
res.data.ticket
);

setStatus(
res.data.ticket.status
);

}

catch(err){

console.log(err);

toast.error(
"Failed to load ticket"
);

}

};
const deleteHandler=
async()=>{

const confirmDelete=

window.confirm(
"Delete this ticket?"
);

if(
!confirmDelete
)return;

try{

const loadingToast=

toast.loading(
"Deleting ticket..."
);

await api.delete(

`/tickets/${id}`

);

toast.dismiss(
loadingToast
);
toast.success(
"Ticket deleted successfully"
);

navigate("/");

}
catch(err){

toast.error(
"Unable to delete ticket"
);

}

};

const updateTicket=
async()=>{

try{

const loadingToast=

toast.loading(
"Updating ticket..."
);

await api.put(

`/tickets/${id}`,

{
status,
note
}

);

toast.dismiss(
loadingToast
);

setNote("");

fetchTicket();

toast.success(
"Ticket updated successfully"
);

}

catch(err){

console.log(err);

toast.error(
"Failed to load ticket"
);

}

};

if(!ticket){

return(
<h1
style={{
color:"white",
padding:"40px"
}}
>
Loading...
</h1>
);

}

return(

<div
style={{

padding:"40px",

background:"#081120",

minHeight:
"calc(100vh - 75px)"

}}
>

<div
style={{

maxWidth:"900px",

margin:"auto",

background:"#162236",

padding:"35px",

borderRadius:"24px"

}}
>

<h1
style={{
color:"white",
marginBottom:"20px"
}}
>

{ticket.subject}

</h1>

<p
style={{
color:"#94a3b8",
marginBottom:"10px"
}}
>

Customer:
{ticket.customer_name}

</p>

<p
style={{
color:"#94a3b8",
marginBottom:"10px"
}}
>

Email:
{ticket.customer_email}

</p>

<p
style={{
color:"#94a3b8",
marginBottom:"20px"
}}
>

Ticket ID:
{ticket.ticket_id}

</p>

<div
style={{

padding:"20px",

background:"#243247",

borderRadius:"14px",

color:"white",

marginBottom:"25px"

}}
>

{ticket.description}

</div>

<select

value={status}

onChange={(e)=>

setStatus(
e.target.value
)

}

style={selectStyle}

>

<option>
Open
</option>

<option>
In Progress
</option>

<option>
Closed
</option>

</select>

<textarea

rows="5"

placeholder=
"Add note..."

value={note}

onChange={(e)=>

setNote(
e.target.value
)

}

style={textareaStyle}

/>

<div
style={{

display:"flex",

gap:"15px",

marginTop:"10px"

}}
>

<button

onClick={
updateTicket
}

style={buttonStyle}

>

Save Changes

</button>

<button

onClick={
deleteHandler
}

style={deleteBtn}

>

Delete Ticket

</button>

</div>

<h2
style={{

color:"white",

marginTop:"35px",

marginBottom:"20px"

}}
>

Notes

</h2>

{

ticket.notes.map(

(item,index)=>(

<div

key={index}

style={{

padding:"15px",

background:"#243247",

borderRadius:"12px",

marginBottom:"12px",

color:"white"

}}

>

{item.text}

</div>

)

)

}

</div>

</div>

);

}

const selectStyle={

width:"100%",

padding:"16px",

marginBottom:"16px",

background:"#243247",

border:"none",

borderRadius:"14px",

color:"white"

};

const textareaStyle={

width:"100%",

padding:"16px",

marginBottom:"16px",

background:"#243247",

border:"none",

borderRadius:"14px",

color:"white"

};

const buttonStyle={

flex:1,

padding:"16px",

background:"#2563eb",

border:"none",

borderRadius:"14px",

color:"white",

cursor:"pointer"

};
const deleteBtn={

flex:1,

padding:"16px",

background:"#dc2626",

border:"none",

borderRadius:"14px",

color:"white",

cursor:"pointer"

};

export default TicketDetails;