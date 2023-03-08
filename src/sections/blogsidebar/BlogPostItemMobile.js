import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
// utils
import { fDate } from '../../utils/formatTime';
// components
// import Image from '../../components/image';
import TextMaxLine from '../../components/text-max-line';
// ----------------------------------------------------------------------

const DotStyle = styled('span')(({ theme }) => ({
  width: 4,
  height: 4,
  borderRadius: '50%',
  backgroundColor: 'currentColor',
  margin: theme.spacing(0, 1),
}));

// ----------------------------------------------------------------------

BlogPostItemMobile.propTypes = {
  onSiderbar: PropTypes.bool,
  path: PropTypes.string,
  post: PropTypes.shape({
    frontmatter: PropTypes.shape({
      coverImg: PropTypes.string,
      createdAt: PropTypes.string,
      duration: PropTypes.string,
      title: PropTypes.string,
    }),
    slug: PropTypes.string,
  }),
};

export default function BlogPostItemMobile({ post, path, onSiderbar }) {

  // const { slug, frontmatter } = post;
  // const { title, duration, coverImg, createdAt } = frontmatter;

  const as = `${path}/post/${post.slug}`;
  const href = `${path}/post/[slug]`;

  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems={{ xs: 'flex-start', md: 'unset' }}
      sx={{ width: 1 }}
    >
      {/* <Image
        alt="Platzhalter"
        src="https://picsum.photos/40"
        sx={{
          width: 40,
          height: 40,
          flexShrink: 0,
          borderRadius: 1.5,
        }}
      /> */}

      <Stack spacing={onSiderbar ? 0.5 : 1}>
        <NextLink passHref as={as} href={href}>
          <TextMaxLine variant={onSiderbar ? 'subtitle2' : 'h6'} asLink>
            {post.title}
          </TextMaxLine>
        </NextLink>

        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          sx={{ typography: 'caption', color: 'text.disabled' }}
        >
          {fDate(post.inserted_at)}
          <DotStyle />
          {/* {duration} */}
        </Stack>
      </Stack>
    </Stack>
  );
}


// wieder rückandern und in der DB anpassen: {fDate(createdAt)}