import PropTypes from 'prop-types';
// next
import NextLink from 'next/link'
import { Link as MuiLink } from "@mui/material";
// @mui
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
// utils
import { fDate } from '../../utils/formatTime';
// components
import Image from '../../components/image';
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

// BlogPostItemOne.propTypes = {
//   onSiderbar: PropTypes.bool,
//   path: PropTypes.string,
//   post: PropTypes.shape({
//     frontmatter: PropTypes.shape({
//       coverImg: PropTypes.string,
//       createdAt: PropTypes.string,
//       duration: PropTypes.string,
//       title: PropTypes.string,
//     }),
//     slug: PropTypes.string,
//   }),
// };

BlogPostItemOne.propTypes = {
  onSiderbar: PropTypes.bool,
  path: PropTypes.string,
  post: PropTypes.shape({
    coverImg: PropTypes.string,
    inserted_at: PropTypes.string,
    duration: PropTypes.string,
    title: PropTypes.string,

    slug: PropTypes.string,
  }),
};

export default function BlogPostItemOne({ post, path, onSiderbar }) {
  const { slug, title, created_at } = post;
  // console.log("Marker 17");
  // console.log(slug);
  // console.log(title);
  const duration = "8 minutes read";

  // const { title, duration, coverImg, createdAt } = frontmatter;

  const replace = `${path}dashboard/blog/post/${slug}`;
  const href = `${path}dashboard/blog/post/[slug]`;

  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems={{ xs: 'flex-start', md: 'unset' }}
      sx={{ width: 1 }}
    >
      <Image
        alt={title}
        src="https://picsum.photos/100"
        sx={{
          width: 80,
          height: 80,
          flexShrink: 0,
          borderRadius: 1.5,
        }}
      />

      <Stack spacing={onSiderbar ? 0.5 : 1}>

        <MuiLink 
          component={NextLink} 
          prefetch={false} 
          // sx={{ color: "warning.main" }}
          href={replace}
        >
          <TextMaxLine variant={onSiderbar ? 'subtitle2' : 'h6'} asLink>
            {title}
          </TextMaxLine>
        </MuiLink>

        {/* <NextLink passHref as={as} href={href}>
          <TextMaxLine variant={onSiderbar ? 'subtitle2' : 'h6'} asLink>
            {title}
          </TextMaxLine>
        </NextLink> */}

        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          sx={{ typography: 'caption', color: 'text.disabled' }}
        >
          {fDate(created_at)}
          <DotStyle />
          {duration}
        </Stack>
      </Stack>
    </Stack>
  );
}
