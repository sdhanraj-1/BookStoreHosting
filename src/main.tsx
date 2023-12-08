import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import "./index.css";
/* import books from './data/stefan-list.json'

// will be important for adding books to book lists.
console.log(books.totalItems)
console.log(books.items.length) */
if (process.env.NODE_ENV === "production") disableReactDevTools();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
