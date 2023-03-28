
import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components'
import './assets/scss/index.scss';
import Login from './pages/Login';
import Home from './pages/Home';
import Menus from './pages/Menus';
import NewMenu from './pages/NewMenu';
import Header from './components/Header'
// import Nav from './components/Nav'
// import Aside from './components/Aside'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './utils/auth'
//import reportWebVitals from './reportWebVitals';

const MainStyled = styled.main`
background: rgba(234,234,234);
padding-bottom:5em;
`

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
			{/* <LoaderSpinner /> */}
		    <Header />
			<MainStyled>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/login" element={<Login path="login" />}></Route>
					<Route path="/login/:back" element={<Login path="login" />}></Route>
					<Route path="/signup" element={<Login path="signup" />}></Route>
					<Route path="/signup/:back" element={<Login path="signup" />}></Route>
					<Route path="/logout" element={<Login path="logout" />}></Route>
					<Route path="/menu/:id" element={<Menus />}></Route>
					<Route path="/menu/new" element={<NewMenu />}></Route>
					<Route path="/menu/update/:id" element={<NewMenu path="update" />}></Route>
					<Route path="/menu/delete/:id" element={<NewMenu path="delete" />}></Route>
					<Route path="*" element={<Navigate replace to="/login" />}></Route>
				</Routes>
			</MainStyled>
		    {/* <Aside /> */}
		    <Footer />
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);

