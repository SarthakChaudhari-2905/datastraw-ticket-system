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

const [
statusFilter,
setStatusFilter
]=useState("All");

const [loading,
setLoading]=useState(true);

const [page,
setPage]=useState(1);

const [totalPages,
setTotalPages]=useState(1);

const [stats,
setStats]=useState({

total:0,

open:0,

progress:0,

closed:0

});

useEffect(()=>{

fetchTickets();

const interval=

setInterval(()=>{

fetchTickets();

},10000);

return()=>clearInterval(
interval
);

},[
page,
search,
statusFilter
]);

const fetchTickets=
async()=>{

try{

setLoading(true);

const statusValue=

statusFilter==="All"

?

""

:

statusFilter;

const res=

await api.get(

`/tickets?page=${page}&limit=3&search=${search}&status=${statusValue}`

);

setTickets(
res.data.tickets
);

setTotalPages(
res.data.totalPages
);

setStats(
res.data.stats
);

}

catch(err){

console.log(err);

}

finally{

setLoading(false);

}

};

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
value={stats.total}
/>

<Card
title="Open"
value={stats.open}
/>

<Card
title="Progress"
value={stats.progress}
/>

<Card
title="Closed"
value={stats.closed}
/>

</div>

<button

onClick={()=>

window.open(

"https://datastraw-ticket-system.onrender.com/api/tickets/export/csv"

)

}

style={{

padding:"14px 20px",

background:"#16a34a",

border:"none",

borderRadius:"14px",

color:"white",

cursor:"pointer",

marginBottom:"25px"

}}

>

Export CSV

</button>

<input

placeholder=
"Search tickets..."

value={search}

onChange={(e)=>{

setSearch(
e.target.value
);

setPage(1);

}}

style={{

width:"100%",

padding:"18px",

marginBottom:"25px",

background:"#162236",

border:
"1px solid rgba(255,255,255,.05)",

borderRadius:"16px",

color:"white"

}}

/>

<div
style={{

display:"flex",

gap:"10px",

marginBottom:"30px",

flexWrap:"wrap"

}}
>

{

[
"All",
"Open",
"In Progress",
"Closed"

].map((item)=>(

<button

key={item}

style={

statusFilter===item

?

activeBtn

:

filterBtn

}

onClick={()=>{

setStatusFilter(
item
);

setPage(1);

}}

>

{item}

</button>

))

}

</div>

{

loading

?

<h2
style={{
color:"white"
}}
>

Loading...

</h2>

:

tickets.length===0

?

<h2
style={{
color:"white"
}}
>

No Tickets Found

</h2>

:

tickets.map(

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

<div

style={{

display:"flex",

justifyContent:"center",

gap:"10px",

marginTop:"30px"

}}

>

{

[...Array(totalPages)]

.map((_,index)=>(

<button

key={index}

onClick={()=>

setPage(
index+1
)

}

style={{

padding:"12px 16px",

background:

page===index+1

?

"#2563eb"

:

"#162236",

color:"white",

border:"none",

borderRadius:"10px",

cursor:"pointer"

}}

>

{index+1}

</button>

))

}

</div>

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

borderRadius:"20px"

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
color:"white"
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
