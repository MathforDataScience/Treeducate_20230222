// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Button } from '@mui/material';
// auth
// import { useAuthContext } from '../../_____auth/useAuthContext';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// _mock_
// import {
//   _appFeatured,
//   _appAuthors,
//   _appInstalled,
//   _appRelated,
//   _appInvoices,
// } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
  AppWidget,
  AppWelcome,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../../assets/illustrations';

// ----------------------------------------------------------------------

GeneralAppPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function GeneralAppPage() {
  // const { user } = useAuthContext();
  const  user = { displayName : "carl_von@clausewitz.preussen" };

  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> General: App | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <h1>{`Welcome back! \n ${user?.displayName}`}</h1>
      </Container>
    </>
  );
}
