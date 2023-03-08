import orderBy from 'lodash/orderBy';
import { useEffect, useCallback, useState } from 'react';
// next
import Head from 'next/head';
import NextLink from 'next/link';
// @mui
import { Grid, Button, Container, Stack } from '@mui/material';
// utils
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import Iconify from '../../../components/iconify';
import { SkeletonPostItem } from '../../../components/skeleton';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../../../sections/@dashboard/blog';

// import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { articlesState } from "../../../../atoms/articleAtom";
import { fetchArticles } from "../../../utils/fetchArticles";

import  BlogSidebar                 from '../../../sections/blogsidebar/BlogSidebar';


// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

BlogPostsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function BlogPostsPage() {
  const { themeStretch } = useSettingsContext();

  // const [posts, setPosts] = useState([]);



  // const getAllPosts = useCallback(async () => {
  //   try {
  //     const response = await axios.get('/api/blog/posts');
  //     setPosts(response.data.posts);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  // useEffect(() => {
  //   getAllPosts();
  // }, [getAllPosts]);


  // const [articles, setArticle ] = useRecoilState(articlesState);
  const [articles, setArticle ] = useState([]);
  useEffect(() => {

      const getData = async () => {
          const data = await fetchArticles();
          setArticle(data)
      };
      getData();
  }, [])

  const [sortBy, setSortBy] = useState('latest');

  const sortedPosts = applySortBy(articles, sortBy);

  const handleChangeSortBy = (event) => {
    setSortBy(event.target.value);
  };

  console.log("Marker 21")
  console.log(articles)
  console.log(articles.length)

  return (
    <>
      <Head>
        <title> Blog: Posts | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}
                sx={{
                  mt: { xs: 4, md: 10 },
                }}>
        <CustomBreadcrumbs
          heading="Blog"
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
              name: 'Posts',
            },
          ]}
          action={
            <Button
              component={NextLink}
              href={PATH_DASHBOARD.blog.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Post
            </Button>
          }
        />

        <Grid container spacing={{ md: 8 }}>
          <Grid item xs={12} md={8}>

            <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
              <BlogPostsSearch />
              <BlogPostsSort sortBy={sortBy} sortOptions={SORT_OPTIONS} onSort={handleChangeSortBy} />
            </Stack>
            <Grid container spacing={3}>
              {(!articles.length ? [...Array(12)] : sortedPosts).map((s, index) =>
                s ? (
                  <Grid key={s.id} item xs={12} sm={6} md={(index === 0 && 6) || 6}>
                    
                    <BlogPostCard post={s} index={index} /> 
                  </Grid>
                ) : (
                  <SkeletonPostItem key={index} />
                )
              )} 
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>

          {(!articles.length ? <p>loads ...</p> : 
                  <BlogSidebar
                  recentPosts={{
                    list: articles.slice(-4),
                    path: '/dashboard/blog1',
                  }}
                />
                
              )}
          </Grid>
        </Grid>   
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

const applySortBy = (posts, sortBy) => {
  if (sortBy === 'latest') {
    return orderBy(posts, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    return orderBy(posts, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    return orderBy(posts, ['view'], ['desc']);
  }
  return posts;
};




// recentPosts={{
//   list: articles.slice(-4),
//   path: '/dashboard/blog',
// }}


// articles.slice(-4),

