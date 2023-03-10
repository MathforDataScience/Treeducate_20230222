import { useEffect, useState, useCallback } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Box, Divider, Stack, Container, Typography, Pagination } from '@mui/material';
// @mui - zone
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
// import axios from '../../../../utils/axios';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import Markdown from '../../../../components/markdown';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
import { SkeletonPostDetails } from '../../../../components/skeleton';
// sections
import {
  BlogPostHero,
  BlogPostTags,
  BlogPostCard,
  BlogPostCommentList,
  BlogPostCommentForm,
} from '../../../../sections/@dashboard/blog';

import { fetchBlogPost_join_UserProfile } from "../../../../utils/fetchArticles";
import { gridColumnLookupSelector } from '@mui/x-data-grid';

import { fDate }      from '../../../../utils/formatTime';

const DotStyle = styled('span')(({ theme }) => ({
  width: 4,
  height: 4,
  borderRadius: '50%',
  backgroundColor: 'currentColor',
  margin: theme.spacing(0, 1),
}));

// ----------------------------------------------------------------------

BlogPostPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function BlogPostPage() {
  const { themeStretch } = useSettingsContext();

  const duration = "7 minutes read";

  const {
    query: { slug },
  } = useRouter();

  const [recentPosts, setRecentPosts] = useState([]);

  const [post, setPost] = useState(null);

  const [loadingPost, setLoadingPost] = useState(true);

  const [errorMsg, setErrorMsg] = useState(null);

  const getPost = useCallback(async () => {
    try {

      // const title1 = title.charAt(0).toUpperCase() + title.slice(1)

      // console.log("Marker 41")
      // console.log(slug)     

      const data = await fetchBlogPost_join_UserProfile(slug);
      setPost(data)
      setLoadingPost(false);

    } catch (error) {
      setLoadingPost(false);
      setErrorMsg(error.message);
    }
  }, [slug]);

  // const getRecentPosts = useCallback(async () => {
  //   try {
  //     const response = await axios.get('/api/blog/posts/recent', {
  //       params: { title },
  //     });
  //     setRecentPosts(response.data.recentPosts);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [title]);
  // useEffect(() => {
  //   getRecentPosts();
  // }, [getRecentPosts]);

  useEffect(() => {
    if (slug) {
      getPost();
    }
  }, [getPost, slug]);


  // console.log("Marker 42")
  // console.log(post) 




  return (
    <>
      <Head>
        <title>{`Blog: ${post?.title || ''}`}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Post Details"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Blog',
              href: PATH_DASHBOARD.blog.root,
            },
            {
              name: post?.title,
            },
          ]}
        />

        {post && (
          <Stack
            sx={{
              borderRadius: 2,
              boxShadow: (theme) => ({
                md: theme.customShadows.card,
              }),
            }}
          >
            <BlogPostHero post={post} />

            <Typography
              variant="h6"
              sx={{
                py: 5,
                px: { md: 5 },
              }}
            >
              {post.excerpt}
            </Typography>

            <Markdown
              children={post.content}
              sx={{
                px: { md: 5 },
              }}
            />

            <Stack
              spacing={3}
              sx={{
                py: 5,
                px: { md: 5 },
              }}
            >
              <Divider />
              <BlogPostTags post={post} />
              <Divider />
            </Stack>

            <Stack
              sx={{
                px: { md: 5 },
              }}
            >
              <Stack direction="row" sx={{ mb: 3 }}>
                <Typography variant="h4">Comments</Typography>

                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                  {/* ({post.comments.length}) */}
                </Typography>
              </Stack>

              <BlogPostCommentForm />

              <Divider sx={{ mt: 5, mb: 2 }} />
            </Stack>

            <Stack
              sx={{
                px: { md: 5 },
              }}
            >
              {/* <BlogPostCommentList comments={post.comments} /> */}

              <Pagination
                count={8}
                sx={{
                  my: 5,
                  ml: 'auto',
                  mr: { xs: 'auto', md: 0 },
                }}
              />
            </Stack>
          </Stack>
        )}

        {errorMsg && !loadingPost && <Typography variant="h6">404 {errorMsg}</Typography>}

        {loadingPost && <SkeletonPostDetails />}

        {!!recentPosts.length && (
          <>
            <Typography variant="h4" sx={{ my: 5 }}>
              Recent posts
            </Typography>

            <Box
              gap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              }}
            >
              {recentPosts.slice(recentPosts.length - 4).map((recentPost) => (
                <BlogPostCard key={recentPost.id} post={recentPost} />
              ))}
            </Box>
          </>
        )}
      </Container>
    </>
  );
}
