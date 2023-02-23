// next
import Head from 'next/head';
// sections
import Register from '../../sections/auth/_____Register';

// ----------------------------------------------------------------------

export default function RegisterUnprotectedPage() {
  return (
    <>
      <Head>
        <title> Register Unprotected | Minimal UI</title>
      </Head>

      <Register />
    </>
  );
}
