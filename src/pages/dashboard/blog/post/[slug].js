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
import axios from '../../../../utils/axios';
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
  // BlogPostTags,
  BlogPostCard,
  BlogPostCommentList,
  BlogPostCommentForm,
} from '../../../../sections/@dashboard/blog';

import { fetchArticle } from "../../../../utils/fetchArticles";
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

      const data = await fetchArticle(slug);

 

      setPost(data)
      setLoadingPost(false);

    } catch (error) {

      // console.log("Marker 28")
      // console.error(error);
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


  console.log("Marker 42")
  console.log(post) 

  return (
    <>
      <Head>
        <title>{`Blog: ${post?.title || ''} | Minimal UI`}</title>
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


      <Divider />
      {!post ? <h5>Loading ...</h5> : 
      <Container>
        <Grid container spacing={3} justifyContent={{ md: 'center' }}>
          <Grid item xs={12} md={8}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                pb: 6,
                pt: { xs: 6, md: 10 },
              }}
            >
                          <BlogPostHero post={post} />
             {/* {post.title}   */}
            </Typography>

            <Stack direction="row" justifyContent="space-between" spacing={1.5}>
              {/* <Avatar src={author.picture} sx={{ width: 48, height: 48 }} /> */}
              <Stack spacing={0.5} flexGrow={1}>
                {/* <Typography variant="subtitle2">{author.name}</Typography> */}
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{ typography: 'caption', color: 'text.disabled' }}
                >
                {fDate(post.inserted_at)}
                <DotStyle />
                {duration}
                </Stack>
              </Stack>

              {/* <Stack direction="row" alignItems="center">
                <ShareButton />
                <FavoriteButton checked={favorite} onChange={handleChangeFavorite} />
              </Stack> */}
            </Stack>

            <Divider sx={{ my: 6 }} />

            <Typography variant="h5" sx={{ mb: 5 }}><h6>...Description</h6>
              {/* {description} */}
            </Typography>
            
            {/* <Markdown content={post.excerpt} firstLetter /> */}
            <Markdown
              children={post.content}
              sx={{
                px: { md: 5 },
              }}
            />

            <Stack direction="row" alignItems="center" flexWrap="wrap" sx={{ my: 6 }}>
              <Typography variant="subtitle2" sx={{ mr: 1 }}>
                Tags:
              </Typography>
              {/* {tags.map((tag) => (
                <Chip key={tag} size="small" label={tag} sx={{ m: 0.5 }} onClick={() => {}} />
              ))} */}
            </Stack>

            <Stack direction="row" alignItems="center" flexWrap="wrap">
              <Typography variant="subtitle2" sx={{ mr: 1 }}>
                Share:
              </Typography>
              {/* <SocialsButton initialColor links={shareLinks} simple={false} /> */}
            </Stack>

            <Divider sx={{ mt: 8 }} />

            {/* <BlogAuthorInfo author={author} /> */}
          </Grid>
        </Grid>
      </Container>
      }

      <Divider />









        {/* {post && (
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
              {post.description}
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
      */}

        {errorMsg && !loadingPost && <Typography variant="h6">404 {errorMsg}</Typography>}

        {loadingPost && <SkeletonPostDetails />}

        {/* {!!recentPosts.length && (
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
        )} */}
      </Container>
    </>
  );
}



             // ({post.comments.length}) */}
             // <BlogPostCommentList comments={post.comments} /> */}
             // <BlogPostTags post={post} /> */}
