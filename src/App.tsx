import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Header from './components/Header/Header';
import { authActions, selectCurrentUser } from './features/auth/authSlice';
import Auth from './pages/Auth/Auth';
import Browse from './pages/Browse/Browse';

function App() {
	const currentUser = useAppSelector(selectCurrentUser);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(authActions.checkIsLoggedIn());
	}, [dispatch]);

	return (
		<BrowserRouter>
			{currentUser && (
				<>
					<Header />
				</>
			)}
			<Routes>
				<Route path="/" element={<Navigate to="/login" replace />}></Route>
				<Route
					path="/browse"
					element={currentUser ? <Browse /> : <Navigate to="/login" replace />}
				></Route>
				<Route
					path="/login"
					element={currentUser ? <Navigate to="/browse" replace /> : <Auth />}
				></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
