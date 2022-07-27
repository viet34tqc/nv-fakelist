import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'src/app/hooks';
import InputField from 'src/components/InputField/InputField';
import { authActions } from 'src/features/auth/authSlice';
import { LoginData } from 'src/features/auth/types';
import * as yup from 'yup';

const schema = yup.object({
	email: yup.string().email('Must be a valid email').required(),
	password: yup
		.string()
		.min(6, 'The password should have a length between 6 and 30 characters')
		.max(30, 'The password should have a length between 6 and 30 characters')
		.required(),
});

type Props = {};

const LoginForm = (props: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginData>({
		mode: 'onTouched',
		resolver: yupResolver(schema),
	});

	const dispatch = useAppDispatch();

	const onSubmit = (data: LoginData) => {
		dispatch(authActions.emailSignInstart(data));
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<InputField
					label="Email"
					error={errors?.email?.message}
					registration={register('email')}
				/>
				<InputField
					type="password"
					label="Password"
					error={errors?.password?.message}
					registration={register('password')}
				/>
				<button type="submit">Sign in with email</button>
			</form>
			<button
				type="button"
				onClick={() => dispatch(authActions.googlSignInstart())}
			>
				Sign in with google
			</button>
		</>
	);
};

export default LoginForm;
