import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <div className='flex px-[46px] h-[100vh] items-center justify-center'>
            <Head title="Forgot Password" />
            <div className="flex flex-col w-full sm:w-[423px] sm:border sm:shadow-lg sm:px-[46px] sm:py-[38px] sm:rounded-[30px]">
            <div className="mb-4 text-[22px] font-bold text-gray-600 self-center dark:text-gray-400">
                Lupa Sandi?
            </div>
            <p className='text-[22px] w-[300px] mb-[29px] text-center self-center opacity-60'>Kirim email pemulihan untuk masuk</p>

            {status && <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    placeholder='Email'
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-5">
                    <PrimaryButton className="w-full rounded-2xl py-3 justify-center" disabled={processing}>
                        <p className='font-[600] text-[18px]'>Kirim</p>
                    </PrimaryButton>
                </div>
            </form>
            </div>
        </div>
    );
}
