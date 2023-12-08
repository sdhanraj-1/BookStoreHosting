import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Home from "./pages/home/home";
import Search from "./pages/searchpage/searchinput";
import Orders from "./components/orders/orders";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookList from "./pages/bookPage/booksPage";
import DetailsPage from "./pages/detailsPage/detailsPage";
import BookListPage from "./pages/bookListPage/bookListPage";
import Cart from "./pages/cart/cart";
import SearchPage from "./pages/searchpage/searchpage";

import Admin from "./pages/admin/admin";
import CreateBLPage from "./pages/CreateBLPage/CreateBLPage";
import LandingPage from "./pages/LandingPage/LandingPage";
function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/home' element={<Home />}></Route>
					<Route path='/' element={<Home />}></Route>
					<Route path='/login' element={<Login />}></Route>
					<Route path='/signup' element={<Signup />}></Route>
					<Route path='/logout' element={<Home />}></Route>
					<Route path='/books/:listId' element={<BookList />}></Route>
					<Route path='/search' element={<Search />}></Route>
					<Route path='/details/:bookId' element={<DetailsPage />}></Route>
					<Route path='/booklist' element={<BookListPage />}></Route>
					<Route path='/search-results' element={<SearchPage />} />
					<Route path='/cart/:userId' element={<Cart />} />
					<Route path='/orders/:userId' element={<Orders />} />
					<Route path='/admin/:userId' element={<Admin />} />
					<Route path='/customBookList' element={<CreateBLPage />}></Route>
					<Route path='/about' element={<LandingPage />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
