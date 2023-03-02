import { useRouter } from "next/router";
import { Cursor, useTypewriter } from "react-simple-typewriter";

import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack, Item } from '@mui/material';
// utils
import { bgGradient } from '../utils/cssStyles';


import Image from 'next/image'

// const useStyles = makeStyles((theme) => ({

// const useStyles = styled('div')(({ theme }) => ({
//     wrapper: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       minHeight: '100vh',
//     },
//     content: {
//       display: 'flex',
//       flexDirection: 'row',
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: theme.spacing(0, 3),
//       flex: 3,
//       [theme.breakpoints.down('md')]: {
//         flexDirection: 'column',
//         alignItems: 'center',
//         padding: theme.spacing(5, 0),
//         flex: 1,
//       },
//     },
//     header: {
//       maxWidth: 'xl',
//       fontSize: '6em',
//       fontFamily: 'font-mediumSerif',
//     },
//     subtitle: {
//       fontSize: '2xl',
//     },
//     accentedButton: {
//       backgroundColor: '#d69e2e',
//       color: '#fff',
//       '&:hover': {
//         backgroundColor: '#bb7e1e',
//       },
//     },
//     image: {
//       display: 'none',
//       height: 400,
//       width: 500,
//       objectFit: 'contain',
//       [theme.breakpoints.up('md')]: {
//         display: 'inline-flex',
//         flex: 1,
//       },
//     },
//   }));

const StyledRoot = styled('div')(({ theme }) => ({
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    color: theme.palette.primary.darker,
    borderRadius: Number(theme.shape.borderRadius) * 2,
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  }));
  
  const StyledBg = styled('div')(({ theme }) => ({
    top: 0,
    left: 0,
    zIndex: -1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: theme.palette.common.white,
    '&:before': {
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: -2,
      content: '""',
      opacity: 0.2,
      ...bgGradient({
        direction: '135deg',
        startColor: theme.palette.primary.light,
        endColor: theme.palette.primary.main,
      }),
    },
  }));
  
  // ----------------------------------------------------------------------
  
  Banner.propTypes = {
    img: PropTypes.node,
    action: PropTypes.node,
    title: PropTypes.string,
    description: PropTypes.string,
  };

export default function Banner({ title, description, action, img, ...other }) {
// const Banner = ({ title, description, action, img, ...other }) => {
    const router = useRouter();

    // const classes = useStyles();
    // const logoSrc = '/path/to/logo';

    // const [text] = useTypewriter({
    //     delaySpeed: 750,
    //     typeSpeed: 60,
    //     words: [
    //         "Welcome to the world of blogging! ",
    //         "Our app provides a platform for writers, creatives, and individuals to share their thoughts, ideas, and experiences with the world. ",
    //         "Whether you're an aspiring writer or a seasoned blogger, our app offers a user-friendly interface and a range of features ",
    //         "to help you showcase your work and engage with your audience. With a focus on simplicity and ease of use, ",
    //         "our blog app is designed to make the process of blogging as enjoyable and fulfilling as possible. ",
    //         "So, why wait? Start writing and sharing your story today!",

    //     ],
    //     loop: 1,
    // });
    
    return (
        <StyledRoot {...other}>
      <Stack
        flexGrow={1}
        justifyContent="center"
        alignItems={{ xs: 'center', md: 'flex-start' }}
        sx={{
          pl: 5,
          py: { xs: 5, md: 0 },
          pr: { xs: 5, md: 0 },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        {/* <Item> */}
            <Typography paragraph variant="h4" sx={{ whiteSpace: 'pre-line' }}>
            {title}
            </Typography>
            <Typography
            variant="body2"
            sx={{
                opacity: 0.8,
                mb: { xs: 3, xl: 5 },
            }}
            >
            {description}
            </Typography>
        {/* </Item>
        <Item> */}
            <Image  
                alt = "Banner1"
                src="/images/banner.png"
                height = {200}
                width = {300}                
            />
        {/* </Item> */}

      </Stack>
      


            <StyledBg />
            </StyledRoot>
);
}