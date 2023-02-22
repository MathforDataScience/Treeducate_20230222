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
                            email_label: "Email-Adresse eingeben2",
                            password_label: "Passwort eingeben",
                            button_label: "Registrieren",
                            email_input_placeholder: "Email-Adresse",
                            password_input_placeholder: "Passwort",
                            link_text: "New user? Create an account3",
                        },
                        sign_in : {
                            email_label: "Enter Email-Address1",
                            password_label: "Enter Password",
                            button_label: "Login",
                            email_input_placeholder: "Email-Adresse",
                            password_input_placeholder: "Passwort",
                            link_text: "Du hast bereits einen Account? Jetzt einloggen",
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
                    className: {
                        button: "bg-gradient hover:opacity-50",
                    }
                }}
                theme="dark"
                providers={['google', 'facebook', 'linkedin']}
            />


    // <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    //   <Stack spacing={3}>
    //     {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

    //     <RHFTextField name="email" label="Email address" />

    //     <RHFTextField
    //       name="password"
    //       label="Password"
    //       type={showPassword ? 'text' : 'password'}
    //       InputProps={{
    //         endAdornment: (
    //           <InputAdornment position="end">
    //             <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
    //               <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
    //             </IconButton>
    //           </InputAdornment>
    //         ),
    //       }}
    //     />
    //   </Stack>

    //   <Stack alignItems="flex-end" sx={{ my: 2 }}>
    //     <Link
    //       component={NextLink}
    //       href={PATH_AUTH.resetPassword}
    //       variant="body2"
    //       color="inherit"
    //       underline="always"
    //     >
    //       Forgot password?
    //     </Link>
    //   </Stack>

    //   <LoadingButton
    //     fullWidth
    //     color="inherit"
    //     size="large"
    //     type="submit"
    //     variant="contained"
    //     loading={isSubmitSuccessful || isSubmitting}
    //     sx={{
    //       bgcolor: 'text.primary',
    //       color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
    //       '&:hover': {
    //         bgcolor: 'text.primary',
    //         color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
    //       },
    //     }}
    //   >
    //     Login
    //   </LoadingButton>
    // </FormProvider>
  );
}
