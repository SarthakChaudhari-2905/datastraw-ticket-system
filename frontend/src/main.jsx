import React from "react";
import ReactDOM from "react-dom/client";

import {
BrowserRouter
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import App from "./App";

import "./index.css";

ReactDOM.createRoot(
document.getElementById("root")
).render(

<BrowserRouter>

<Toaster
position="top-right"

toastOptions={{

style:{

background:"#162236",
color:"white",
borderRadius:"14px"

}

}}

/>

<App/>

</BrowserRouter>

);