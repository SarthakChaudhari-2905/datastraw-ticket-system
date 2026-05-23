import { Link } from "react-router-dom";

function Navbar(){

return(

<nav
style={{

height:"75px",
padding:"0 50px",

display:"flex",
justifyContent:"space-between",
alignItems:"center",

background:"#0f172a",

borderBottom:
"1px solid rgba(255,255,255,.05)"

}}
>

<h2
style={{
color:"white"
}}
>
Support CRM
</h2>

<div
style={{
display:"flex",
gap:"25px"
}}
>

<Link
to="/"
style={{
color:"#cbd5e1"
}}
>
Dashboard
</Link>

<Link
to="/create"
style={{
color:"#cbd5e1"
}}
>
Create Ticket
</Link>

</div>

</nav>

);

}

export default Navbar;