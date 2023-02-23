// import { useState } from 'react';
// import * as Yup from 'yup';
// // next
// import NextLink from 'next/link';
// // form
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// // @mui
// import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// // routes
// import { PATH_AUTH } from '../../routes/paths';
// auth
// import { useAuthContext } from '../../_____auth/useAuthContext';
// components
// import Iconify from '../../components/iconify';
// import FormProvider, { RHFTextField } from '../../components/hook-form';

import React, { useEffect, useState }      from "react";
import { useRouter }            from "next/router";
import { Auth, ThemeSupa }      from "@supabase/auth-ui-react";
import { useSupabaseClient, useUser }    from '@supabase/auth-helpers-react';

// import { useSupabaseClient }    from '@supabase/auth-helpers-react';
// import { Auth, ThemeSupa }      from "@supabase/auth-ui-react";

import Loading from '../../components/loading-screen';

// ----------------------------------------------------------------------
// {log_or_reg

export default function AuthForm({log_or_reg}) {
//   const supaBaseClient = useSupabaseClient();


  const router = useRouter();
  const supaBaseClient = useSupabaseClient();

  const user = useUser();
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
      setLoading(false);
  }, []);

  if (loading) {
      return <Loading />;
  }

  if (user) {
      router.push("/");
      return <Loading />;
  }


  return (
    <Auth 
                localization={{
                   variables: {
                        sign_up : {
                            email_label: "Enter Email-Address2",
                            password_label: "Enter Password2",
                            button_label: "Sign up2",
                            email_input_placeholder: "Email-Address2",
                            password_input_placeholder: "Password2",
                            link_text: "New user? Create an account2",
                        },
                        sign_in : {
                            email_label: "Enter Email-Address1",
                            password_label: "Enter Password1",
                            button_label: "Sign in1",
                            email_input_placeholder: "Email-Address1",
                            password_input_placeholder: "Password1",
                            link_text: "You have an account? Then login1",
                        },     
                        forgotten_password : {
                            link_text: "Forgot password?3",
                            password_label: "Enter Password3",
                            email_input_placeholder: "Email-Address3",
                            email_label: "Enter Email-Address3",
                            button_label: "Send Email for Password reset3" 
                        },               
                   },
                }}
                supabaseClient={supaBaseClient}
                appearance = {{
                    theme: ThemeSupa,
                    // className: {
                    //     button: "bg-gradient hover:opacity-50",
                    // }
                }}
                theme="dark"
                providers={['google', 'facebook', 'linkedin']}
                view={log_or_reg}
            />
  );
}
