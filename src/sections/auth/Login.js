// next
import NextLink from 'next/link';
// @mui
// import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';
import { Alert, Stack, Typography, Link } from '@mui/material';
// auth
// import { useAuthContext } from '../../_____auth/useAuthContext';
// layouts
import LoginLayout from '../../layouts/login';
// routes
import { PATH_AUTH } from '../../routes/paths';
//
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';

import { useSupabaseClient, useUser }    from '@supabase/auth-helpers-react';
import { useRouter }            from "next/router";
// ----------------------------------------------------------------------

export default function Login() {
  const router = useRouter();
  const user = useUser();

  // const { user } = useAuthContext();
  // const  user = { displayName : "carl_von@clausewitz.preussen" };

  
  if (user) {
    // console.log("Marker 1")
    // console.log(user)
    router.push("/");
    // return <Loading />;
}

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Sign in to Minimal</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>

          <Link component={NextLink} href={PATH_AUTH.register} variant="subtitle2">
            Create an account
          </Link>
        </Stack>

        {/* <Tooltip title={method} placement="left">
          <Box
            component="img"
            alt={method}
            src={`/assets/icons/auth/ic_${method}.png`}
            sx={{ width: 32, height: 32, position: 'absolute', right: 0 }}
          />
        </Tooltip> */}
      </Stack>

      {/* <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert> */}

      <AuthLoginForm />

      {/* <AuthWithSocial /> */}
    </LoginLayout>
  );
}
