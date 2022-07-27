import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'src/app/hooks';
import InputField from 'src/components/InputField/InputField';
import { authActions } from 'src/features/auth/authSlice';
import { RegisterData } from 'src/features/auth/types';
import * as yup from 'yup';

const schema = yup.object({
	email: yup.string().email('Must be a valid email').required(),
	password: yup
		.string()
		.min(6, 'The password should have a length between 6 and 30 characters')
		.max(30, 'The password should have a length between 6 and 30 characters')
		.required(),
	password2: yup.string().oneOf([yup.ref('password')], 'Passwords does not match'),
});

type Props = {};

const RegisterForm = (props: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterData>({
		mode: 'onTouched',
		resolver: yupResolver(schema),
	});

	const dispatch = useAppDispatch();

	const onSubmit = (data: RegisterData) => {
		dispatch(authActions.signUpStart(data));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<InputField
				label="Display name"
				error={errors?.displayName?.message}
				registration={register('email')}
			/>
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
			<InputField
				type="password"
				label="Re-type password"
				error={errors?.password2?.message}
				registration={register('password2')}
			/>
			<button type="submit">Register</button>
		</form>
	);
};

export default RegisterForm;
