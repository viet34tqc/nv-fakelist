import { useReducer } from 'react';
import { useAppSelector } from 'src/app/hooks';
import { selectAuthError } from 'src/features/auth/authSlice';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';

type Props = {};

const Auth = (props: Props) => {
	const [isSignedUp, toggle] = useReducer((state: boolean) => !state, true);
	const authError = useAppSelector(selectAuthError);

	return (
		<>
			{isSignedUp ? <LoginForm /> : <RegisterForm />}
			{authError && <p>{authError}</p>}
			<button className="toggler" onClick={toggle}>
				{isSignedUp ? 'Sign Up' : 'Sign In'}
			</button>
		</>
	);
};

export default Auth;
