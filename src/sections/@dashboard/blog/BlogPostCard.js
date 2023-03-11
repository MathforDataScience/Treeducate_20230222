import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Avatar, Typography, CardContent, Stack, Link } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Image from '../../../components/image';
import Iconify from '../../../components/iconify';
import TextMaxLine from '../../../components/text-max-line';
import SvgColor from '../../../components/svg-color';

// alt={author.name}
// src={author.avatarUrl}
//<Image alt="cover" src={cover} ratio="4/3" />

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  index: PropTypes.number,
  post: PropTypes.object,
};

export default function BlogPostCard({ post, index }) {
  const isDesktop = useResponsive('up', 'md');
//  { title_image, title, slug, subtitle, view, comment, share, created_at, index }
  const { user_profile_id, cover, title_image, title, slug, view, comment, share, author, createdAt } = post;

  const latestPost = index === 0 || index === 1 || index === 2;

  const titleimage = `/images/${user_profile_id.substring(0, 13)}/blogpost_titles/${title_image}`;


  if (isDesktop && latestPost) {
    return (
      <Card>
        <Avatar
          alt="Schax Schustermann"
          src="https://i.pravatar.cc/60"
          sx={{
            top: 24,
            left: 24,
            zIndex: 9,
            position: 'absolute',
          }}
        />

        <PostContent
          title={title}
          slug={slug}        
          view={view}
          comment={comment}
          share={share}
          createdAt={createdAt}
          index={index}
        />

        <StyledOverlay />

        <Image alt="cover" src={titleimage} sx={{ height: 360 }} />
      </Card>
    );
  }

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <SvgColor
          src="/assets/shape_avatar.svg"
          sx={{
            width: 80,
            height: 36,
            zIndex: 9,
            bottom: -15,
            position: 'absolute',
            color: 'background.paper',
          }}
        />

        <Avatar
          alt="Schax Schustermann"
          src="https://i.pravatar.cc/60"
          sx={{
            left: 24,
            zIndex: 9,
            width: 32,
            height: 32,
            bottom: -16,
            position: 'absolute',
          }}
        />

        <Image alt="cover" src={titleimage} ratio="4/3" />
      </Box>
      
      <PostContent
        title={title}
        slug={slug}       
        view={view}
        comment={comment}
        share={share}
        createdAt={createdAt}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

PostContent.propTypes = {
  view: PropTypes.number,
  index: PropTypes.number,
  share: PropTypes.number,
  title: PropTypes.string,
  comment: PropTypes.number,
  createdAt: PropTypes.string,
};



export function PostContent({ title_image, title, slug, subtitle, view, comment, share, created_at, index }) {
  const isDesktop = useResponsive('up', 'md');

  const linkTo = PATH_DASHBOARD.blog.view(paramCase(slug));

  const latestPostLarge = index === 0;

  const latestPostSmall = index === 1 || index === 2;

  const POST_INFO = [
    { id: 'comment', value: comment, icon: 'eva:message-circle-fill' },
    { id: 'view', value: view, icon: 'eva:eye-fill' },
    { id: 'share', value: share, icon: 'eva:share-fill' },
  ];

  return (
    <CardContent
      sx={{
        pt: 4.5,
        width: 1,
        ...((latestPostLarge || latestPostSmall) && {
          pt: 0,
          zIndex: 9,
          bottom: 0,
          position: 'absolute',
          color: 'common.white',
        }),
      }}
    >
      <Typography
        gutterBottom
        variant="caption"
        component="div"
        sx={{
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        {fDate(created_at)}
      </Typography>

      <Link component={NextLink} href={linkTo} color="inherit">
        <TextMaxLine
          variant={isDesktop && latestPostLarge ? 'h5' : 'subtitle2'}
          line={2}
          persistent
        >
          {title}
        </TextMaxLine>
      </Link>

      <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="flex-end"
        sx={{
          mt: 3,
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        {POST_INFO.map((info) => (
          <Stack
            key={info.id}
            direction="row"
            alignItems="center"
            sx={{ typography: 'caption', ml: info.id === 'comment' ? 0 : 1.5 }}
          >
            <Iconify icon={info.icon} width={16} sx={{ mr: 0.5 }} />
            {fShortenNumber(info.value)}
          </Stack>
        ))}
      </Stack>
    </CardContent>
  );
}
