import { useState } from 'react';
import * as Yup from 'yup';
// next
import NextLink from 'next/link';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../routes/paths';
// auth
// import { useAuthContext } from '../../_____auth/useAuthContext';
// components
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';

import { useSupabaseClient, useUser }    from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa }      from "@supabase/auth-ui-react";

// ----------------------------------------------------------------------

export default function AuthLoginForm() {
  const supaBaseClient = useSupabaseClient();


  // const { user } = useAuthContext();
  // const  user = { displayName : "carl_von@clausewitz.preussen" };

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    // reset,
    // setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    "data_authlogin1"
    // try {
    //   await login(data.email, data.password);
    // } catch (error) {
    //   console.error(error);
    //   reset();
    //   setError('afterSubmit', {
    //     ...error,
    //     message: error.message,
    //   });
    // }
  };

  return (
    <Auth 
                localization={{
                    variables: {
                        sign_up : {
                            email_label: "Enter Email-Address",
                            password_label: "Enter Password",
                            button_label: "Sign up",
                            email_input_placeholder: "Email-Address",
                            password_input_placeholder: "Password",
                            link_text: "New user? Create an account",
                        },
                        sign_in : {
                            email_label: "Enter Email-Address",
                            password_label: "Enter Password",
                            button_label: "Sign in",
                            email_input_placeholder: "Email-Address",
                            password_input_placeholder: "Password",
                            link_text: "You have an account? Then login",
                        },     
                        forgotten_password : {
                            link_text: "Forgot password?",
                            password_label: "Enter Password",
                            email_input_placeholder: "Email-Address",
                            email_label: "Enter Email-Address",
                            button_label: "Send Email for Password reset" 
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
                view="sign_up"
            />
  );
}
