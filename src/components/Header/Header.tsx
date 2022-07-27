import { useDispatch } from 'react-redux';
import { authActions } from 'src/features/auth/authSlice';

type Props = {};

const Header = (props: Props) => {
	const dispatch = useDispatch();
	return (
		<button onClick={() => dispatch(authActions.signOutStart())}>
			Sign Out
		</button>
	);
};

export default Header;
