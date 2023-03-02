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
import {
  AppWidget,

} from '../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../assets/illustrations';

import { supabaseCl } from '../../lib/supabaseClient';
import { useSupabaseClient, useUser }    from '@supabase/auth-helpers-react';

import Banner  from "../components/Banner";
import Trending from '../components/Trending';

import { useEffect, useState } from "react";

// import { use } from "react"

import { useRecoilState } from "recoil";
// import { articlesState } from "../../atoms/articleAtom";

// ----------------------------------------------------------------------

GeneralAppPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

// async function getData() {
//   const  data = await supabaseCl.from('articles').select();
//   return { data };
// }

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

export default function GeneralAppPage({countries}) {
  const user = useUser();
  console.log(countries)
  // const countries1 = props.countries;

  // const [articles, setArticle ] = useRecoilState(articlesState);

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


  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  return (
    <>

      <Head>
        <title>Let's democratize knowlegde</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <div>
              <Banner 
                title="treeducate.com" 
                description="Let's democratize knowledge. Tell others about your special knowledge. Write about Science, Education, Enterpreneurship, Arts"
                img="/banner.png"
              />
            </div>
            </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <div>
          <ul>
              {/* {articles.map((s) => (
            <li key={s.id}>{s.title} </li>
          ))}  */}
          {countries.map((country) => (
            <li key={country.id}>{country.name} </li>
          ))} 
        </ul>
      </div>
       <div><Trending /></div> 

              {/* <AppWidget
                title="Conversion"
                total={38566}
                icon="eva:person-fill"
                chart={{
                  series: 48,
                }}
              />

              <AppWidget
                title="Applications"
                total={55566}
                icon="eva:email-fill"
                color="info"
                chart={{
                  series: 75,
                }}
              /> */}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}



export async function getStaticProps() {
  let { data } = await supabaseCl.from('countries').select()

  return {
    props: {
     countries: data
    },
  }
}
