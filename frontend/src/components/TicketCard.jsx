import { Link } from "react-router-dom";

function TicketCard({ ticket }) {

const getColor = () => {

if(ticket.status==="Open")
return "#ef4444";

if(ticket.status==="In Progress")
return "#f59e0b";

return "#22c55e";

};

return (

<Link
to={`/ticket/${ticket.ticket_id}`}
>

<div
style={{

padding:"20px",

background:"#162236",

borderRadius:"18px",

marginBottom:"18px",

cursor:"pointer",

transition:".3s"

}}
>

<div
style={{

display:"flex",

justifyContent:"space-between",

marginBottom:"12px"

}}
>

<h3
style={{
color:"white"
}}
>

{ticket.subject}

</h3>

<div
style={{

padding:"6px 12px",

borderRadius:"20px",

background:getColor(),

color:"white",

fontSize:"12px"

}}
>

{ticket.status}

</div>

</div>

<p
style={{
color:"#94a3b8"
}}
>

{ticket.customer_name}

</p>

<p
style={{
color:"#64748b",
marginTop:"10px"
}}
>

{ticket.description}

</p>

<div
style={{

marginTop:"15px",

color:"#3b82f6"

}}
>

{ticket.ticket_id}

</div>

</div>

</Link>

);

}

export default TicketCard;