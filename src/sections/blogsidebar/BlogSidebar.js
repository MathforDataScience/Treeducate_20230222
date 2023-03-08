import PropTypes from 'prop-types';
// @mui
import { Stack } from '@mui/material';
// hooks
// import { useResponsive } from '../../hooks';
// components
// import { SearchInput } from '../../components';
//
// import { Advertisement01 } from '../advertisement';
// import BlogSidebarAuthor from './BlogSidebarAuthor';
import BlogSidebarCategories from './BlogSidebarCategories';
import BlogSidebarPopularTags from './BlogSidebarPopularTags';
import BlogSidebarRecentPosts from './BlogSidebarRecentPosts';

// ----------------------------------------------------------------------

// BlogSidebar.propTypes = {
//   advertisement: PropTypes.object,
//   author: PropTypes.object,
//   recentPosts: PropTypes.object,
//   sx: PropTypes.object,
// };
// { author, recentPosts, sx, ...other }
export default function BlogSidebar({recentPosts}) {
  // const isDesktop = useResponsive('up', 'md');

  console.log("Marker 22")
  console.log(recentPosts)

  return (
    <>
      {/* {author && isDesktop && <BlogSidebarAuthor author={author} />}

      {isDesktop && <SearchInput />} */}

      <Stack
        spacing={5}
        sx={{
          pt: { md: 5 },
          pb: { xs: 8, md: 0 },
          // ...sx,
        }}
        // {...other}
      >
        {/* {"BlogSideBar"} */}
        <BlogSidebarCategories />
        <BlogSidebarRecentPosts recentPosts={recentPosts} />
        <BlogSidebarPopularTags />
        {/* <Advertisement01 advertisement={advertisement} /> */}
      </Stack>
    </>
  );
}
