// next
import AuthLoginForm from '@/sections/auth/AuthLoginForm';
import Head from 'next/head';
// auth
// import GuestGuard from '../../_____auth/GuestGuard';
// sections
import Login from '../../sections/auth/Login';

// import Login from '../../sections/auth/LoginAuth0';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Head>
        <title> Login | Minimal UI</title>
      </Head>

      {/* <GuestGuard> */}

        {/* <AuthLoginForm /> */}
         <Login /> 
      {/* </GuestGuard> */}
    </>
  );
}
