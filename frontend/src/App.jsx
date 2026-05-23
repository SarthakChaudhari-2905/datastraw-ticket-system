import {
Routes,
Route
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";

import Navbar from "./components/Navbar";

function App() {

return (

<>
<Navbar />

<Routes>

<Route
path="/"
element={<Dashboard />}
/>

<Route
path="/create"
element={<CreateTicket />}
/>

<Route
path="/ticket/:id"
element={<TicketDetails />}
/>

</Routes>

</>

);

}

export default App;