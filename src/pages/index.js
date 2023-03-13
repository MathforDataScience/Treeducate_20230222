// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Button } from '@mui/material';
// auth
// import { useAuthContext } from '../../auth/useAuthContext';
// layouts
import DashboardLayout from '../layouts/dashboard';
// _mock_
// import {
//   _appFeatured,
//   // _appAuthors,
//   // _appInstalled,
//   // _appRelated,
//   // _appInvoices,
// } from '../_mock/arrays';
// components
import { useSettingsContext } from '../components/settings';
// sections
// import {
//   AppWidget,

// } from '../sections/@dashboard/general/app';
// assets
// import { SeoIllustration } from '../assets/illustrations';

// import { supabaseCl } from '../../lib/supabaseClient';
import { useSupabaseClient, useUser }    from '@supabase/auth-helpers-react';

import Banner  from "../components/Banner";
import Trending from '../components/Trending';

import { fetchArticles, fetchUserProfile } from "../utils/fetchArticles";

import { useEffect, useState } from "react";

// import { useRecoilState } from "recoil";
// import { articlesState } from "../../atoms/articleAtom";
// import { BiTrendingUp } from "react-icons/bi";
// import { use } from "react"
// import { articlesState } from "../../atoms/articleAtom";

// ----------------------------------------------------------------------

GeneralAppPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function GeneralAppPage() {
  const user = useUser();
  const theme = useTheme();
  const { themeStretch } = useSettingsContext();

  // const [articles, setArticle ]         = useState(null); //useRecoilState(articlesState);
  // useEffect(() => {

  //     const getData = async () => {
  //       const data = await fetchArticles();
  //       setArticle(data)
  //     };
  //     getData();

  // }, [])

  const [userProfile, setUserProfile ]  = useState(null); 
  useEffect(() => {
    const getuserProfileData  = async () => {
      // console.log("Marker 70");
      // console.log(user);
      const user_profile_data = await fetchUserProfile(user.id);
      setUserProfile(user_profile_data);
    };
    getuserProfileData();
  }, [])


  // console.log("Marker 71")
  // console.log(user)
  // console.log("Marker 72");
  // console.log(userProfile);


  return (
    <>

      <Head>
        <title>Let's democratize knowledge</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
          {!user ? 
            <div>
             
              <Banner 
                title="treeducate.com" 
                description="Let's democratize knowledge. Tell others about your special knowledge. Write about Science, Education, Enterpreneurship, Arts"
                img="/banner.png"
              />
            </div>
          : (!userProfile ? 
                <p>loads ...</p> :
                <div>
                  <h1>Welcome {userProfile.first_name}</h1> 
                </div>)
          }

            </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>

              <div><Trending /></div> 

            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}


            {/* <div>
                <ul>
                  {articles?.map((s) => (
                    <li key={s.id}>{s.title} </li>
                  ))} 
                </ul>
              </div> */}

  // const [loading, setLoading] = useState(false);
  // const dat = getData();
  // console.log(dat);
  // console.log("Marker 2")
  // console.log(user)
  // const { user } = useAuthContext();
  // const  user = { displayName : "carl_von@clausewitz.preussen" };
  //     useEffect(() => {
  //       const getData = async () => {
  //           const res = await supabaseCl.from('articles').select();
  //           setArticle(res.data)
  //       };
  //       getData();
  //   }, [])
  // console.log("Marker 2")
  // console.log(articles)

  // async function getData() {
//   const  data = await supabaseCl.from('articles').select();
//   return {
//         props: {
//          countries: data
//         },
//       }
// }
// GeneralAppPage.getInitialProps = async (ctx) {
//     const res = await  supabaseCl.from('articles').select();
//     const json = await res.json()
//     return { json }
// }