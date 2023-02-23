// next
import Head from 'next/head';
// auth
// import GuestGuard from '../../_____auth/GuestGuard';
// sections
import Login_or_Register from '../../sections/auth/Login_or_Register';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title> Register | Minimal UI</title>
      </Head>

      {/* <GuestGuard> */}
      <Login_or_Register log_or_reg = "sign_up" /> 
      {/* </GuestGuard> */}
    </>
  );
}
