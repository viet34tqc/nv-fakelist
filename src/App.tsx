import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import { useAppSelector } from './app/hooks';
import { selectCurrentUser } from './features/auth/authSlice';
import Auth from './pages/Auth/Auth';

function App() {
	const currentUser = useAppSelector(selectCurrentUser);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/login" replace />}></Route>
				<Route path="/login" element={<Auth />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
