// next
// import AuthLoginForm from '@/sections/auth/AuthLoginForm';
import Head from 'next/head';

import Login_or_Register from '../../sections/auth/Login_or_Register';



// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Head>
        <title> Login | Minimal UI</title>
      </Head>

        {/* <AuthLoginForm /> */}
         <Login_or_Register log_or_reg = "sign_in" /> 
    </>
  );
}
