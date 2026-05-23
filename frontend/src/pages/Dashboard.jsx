import {
useEffect,
useState
} from "react";

import { motion } from "framer-motion";

import api from "../services/api";
import TicketCard from "../components/TicketCard";

function Dashboard(){

const [tickets,setTickets]=useState([]);
const [search,setSearch]=useState("");
const [statusFilter,setStatusFilter]=useState("All");
const [loading,setLoading]=useState(true);

useEffect(()=>{

fetchTickets();

const interval=setInterval(()=>{

fetchTickets();

},10000);

return()=>clearInterval(interval);

},[]);

const fetchTickets=async()=>{

try{

setLoading(true);

const res=
await api.get(
"/tickets"
);

setTickets(
res.data.tickets
);

}
catch(err){

console.log(err);

}
finally{

setLoading(false);

}

};

const filteredTickets=
tickets.filter((ticket)=>{

const searchMatch=

ticket.subject
.toLowerCase()

.includes(
search.toLowerCase()
)

||

ticket.customer_name
.toLowerCase()

.includes(
search.toLowerCase()
);

const statusMatch=

statusFilter==="All"

?

true

:

ticket.status===
statusFilter;

return(
searchMatch &&
statusMatch
);

});

const total=tickets.length;

const open=
tickets.filter(
t=>t.status==="Open"
).length;

const progress=
tickets.filter(
t=>
t.status===
"In Progress"
).length;

const closed=
tickets.filter(
t=>t.status==="Closed"
).length;

return(

<div
style={{

padding:"40px",

background:"#081120",

minHeight:
"calc(100vh - 75px)"

}}
>

<h1
style={{
color:"white",
marginBottom:"30px"
}}
>

Support Dashboard

</h1>

<div
style={{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",

gap:"20px",

marginBottom:"30px"

}}
>

<Card
title="Total"
value={total}
/>

<Card
title="Open"
value={open}
/>

<Card
title="Progress"
value={progress}
/>

<Card
title="Closed"
value={closed}
/>

</div>
<div
style={{

display:"flex",

justifyContent:
"space-between",

marginBottom:"25px"

}}
>

<button

onClick={()=>

window.open(

"http://localhost:5000/api/tickets/export/csv"

)

}

style={{

padding:"14px 20px",

background:"#16a34a",

border:"none",

borderRadius:"14px",

color:"white",

cursor:"pointer"

}}

>

Export CSV

</button>

</div>
<input

placeholder=
"Search tickets..."

value={search}

onChange={(e)=>

setSearch(
e.target.value
)

}

style={{

width:"100%",

padding:"18px",

marginBottom:"25px",

background:"#162236",

border:"1px solid rgba(255,255,255,.05)",

borderRadius:"16px",

color:"white",

fontSize:"15px"

}}

 />

<div
style={{

display:"flex",

gap:"12px",

marginBottom:"30px",

flexWrap:"wrap"

}}
>

<button
style={

statusFilter==="All"

?

activeBtn

:

filterBtn

}

onClick={()=>

setStatusFilter(
"All"
)

}
>
All
</button>

<button
style={

statusFilter==="Open"

?

activeBtn

:

filterBtn

}

onClick={()=>

setStatusFilter(
"Open"
)

}
>
Open
</button>

<button
style={

statusFilter==="In Progress"

?

activeBtn

:

filterBtn

}

onClick={()=>

setStatusFilter(
"In Progress"
)

}
>
Progress
</button>

<button
style={

statusFilter==="Closed"

?

activeBtn

:

filterBtn

}

onClick={()=>

setStatusFilter(
"Closed"
)

}
>
Closed
</button>

</div>

{
loading

?

<div>

{

[1,2,3].map((item)=>(

<div

key={item}

style={{

height:"130px",

background:"#162236",

borderRadius:"20px",

marginBottom:"20px",

animation:
"pulse 1.2s infinite"

}}

>

</div>

))

}

</div>

:


filteredTickets.length===0

?

<div
style={{

padding:"45px",

background:"#162236",

borderRadius:"20px",

textAlign:"center"

}}
>

<h2
style={{
color:"white"
}}
>
No Tickets Found
</h2>

<p
style={{
color:"#94a3b8",
marginTop:"10px"
}}
>
Create ticket or change filter
</p>

</div>

:

filteredTickets.map(

(ticket,index)=>(

<motion.div

key={ticket._id}

initial={{

opacity:0,
y:20

}}

animate={{

opacity:1,
y:0

}}

transition={{

delay:index*0.08

}}

>

<TicketCard
ticket={ticket}
/>

</motion.div>

)

)

}

</div>

);

}

function Card({

title,
value

}){

return(

<div
style={{

padding:"24px",

background:
"linear-gradient(135deg,#162236,#1e293b)",

borderRadius:"20px",

boxShadow:
"0 10px 30px rgba(0,0,0,.35)",

border:
"1px solid rgba(255,255,255,.05)"

}}
>

<p
style={{
color:"#94a3b8"
}}
>

{title}

</p>

<h2
style={{
color:"white",
marginTop:"12px",
fontSize:"30px"
}}
>

{value}

</h2>

</div>

);

}

const filterBtn={

padding:"12px 18px",

background:"#162236",

border:"none",

borderRadius:"14px",

color:"white",

cursor:"pointer"

};

const activeBtn={

padding:"12px 18px",

background:"#2563eb",

border:"none",

borderRadius:"14px",

color:"white",

cursor:"pointer"

};

export default Dashboard;