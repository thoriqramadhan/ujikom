import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div className='w-[185px] h-[185px] bg-[#F1F1F1] mb-[20px] rounded-full self-center sm:absolute sm:-top-12 sm:mb-[5px]'></div>
            <h1 className='self-center text-[25px] font-[600] mb-[30px] sm:mt-[65px]'>{errors.email || errors.password ? '' : 'Selamat Datang Kembali'}</h1>
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full h-[50px]"
                        autoComplete="username"
                        isFocused={true}
                        placeholder='Please input your Email'
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-2">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 h-[50px] block w-full"
                        autoComplete="current-password"
                        placeholder='Please input your password'
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="flex items-center relative justify-between mt-1">
                    <div className="block mt-4 relative -top-2">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 block text-sm text-gray-600 ">Remember me</span>
                    </label>
                    </div>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-md text-gray-600 font-normal  hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Lupa Sandi?
                        </Link>
                    )}
                    

                </div>

                <PrimaryButton className="w-full h-[60px] mt-[27px] rounded-[16px] justify-center text-[18px] sm:mt-[px]" disabled={processing}>
                        Masuk
                </PrimaryButton>

            </form>
        </GuestLayout>
    );
}
