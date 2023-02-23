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
import AuthForm  from './AuthForm';
import AuthWithSocial from './AuthWithSocial';

import { useSupabaseClient, useUser }    from '@supabase/auth-helpers-react';
import { useRouter }            from "next/router";

// ----------------------------------------------------------------------

export default function Login_or_Register({log_or_reg}) {
  const router = useRouter();
  const user = useUser();

  // const { keyword } = router.query;
  console.log("\nMarker 5")
  console.log(log_or_reg)

  // const { user } = useAuthContext();
  // const  user = { displayName : "carl_von@clausewitz.preussen" };

  
  if (user) {
    // console.log("Marker 1")
    // console.log(user)
    router.push("/");
    // return <Loading />;
}

if (!log_or_reg) { log_or_reg = "sign_in" }

  return (
    <LoginLayout>

      <AuthForm log_or_reg = {log_or_reg} />

      {/* <AuthWithSocial /> */}
    </LoginLayout>
  );
}
