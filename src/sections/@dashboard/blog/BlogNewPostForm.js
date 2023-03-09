import * as Yup from 'yup';
import { useState, useCallback, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, Button, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFAutocomplete,
} from '../../../components/hook-form';
//
import BlogNewPostPreview from './BlogNewPostPreview';

import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

import slugify from 'react-slugify';

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Science',
  'Technology',
  'Enterpreneurship',
  'E-Learning',
  'Arts',
  'Sports',
  'Heal the world'
];

// ----------------------------------------------------------------------

export default function BlogNewPostForm() {
  //const { push } = useRouter();

  const router = useRouter();
  
  const supaBaseClient = useSupabaseClient();
  const [show, setShow] = useState(false);
  const user = useUser();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
     router.replace("/");
    } else {
     setIsLoading(false)
    }
  }, []);

  // Überarbeiten zu Standard-Loading-Block für überall!!

  // if (!user) {
  //   router.replace("/");
  //   return null;
  // }
  // console.log("marker 61")
  // console.log(user)

  const initialArticleState = {
    title: "",
    content: "",
  };

  const [articleData , setArticleData] = useState(initialArticleState);

  // -----------------------------------------------------------------------------------------



  const { enqueueSnackbar } = useSnackbar();

  const [openPreview, setOpenPreview] = useState(false);

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    tags: Yup.array().min(2, 'Must have at least 2 tags'),
    metaKeywords: Yup.array().min(1, 'Meta keywords is required'),
    cover: Yup.mixed().required('Cover is required').nullable(true),
    content: Yup.string().required('Content is required'),
  });

  const defaultValues = {
    title: '',
    description: '',
    content: '',
    cover: null,
    tags: ['Science'],
    publish: true,
    comments: true,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [],
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const handleOpenPreview = () => {
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const onSubmit = async (data_inp) => {
    // console.log("Marker 82")
    // console.log(data_inp)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const { data, error } = await supaBaseClient
      .from("hub_blogposts")
      .insert([
          {
            user_profile_id: user?.id,
            title: data_inp.title,
            slug: slugify(data_inp.title) + "-" + user?.id.substring(0,13),
            content: data_inp.content,
          },
      ])
      .single();


      reset();
      handleClosePreview();
      enqueueSnackbar('Post success!');
      router.push(PATH_DASHBOARD.blog.posts);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('cover', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = () => {
    setValue('cover', null);
  };




  return (
    // <>
    //   {user.id} <br/>
    //   {user.email} 
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <div>User Data<br/>
            {user?.id} <br/>
            {user?.email} 
          </div>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="Post Title" />

                <RHFTextField name="description" label="Description" multiline rows={3} />

                <Stack spacing={1}>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    Content
                  </Typography>

                  <RHFEditor simple name="content" />
                </Stack>

                <Stack spacing={1}>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    Cover
                  </Typography>

                  <RHFUpload
                    name="cover"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    onDelete={handleRemoveFile}
                  />
                </Stack>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <div>
                  <RHFSwitch
                    name="publish"
                    label="Publish"
                    labelPlacement="start"
                    sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                  />

                  <RHFSwitch
                    name="comments"
                    label="Enable comments"
                    labelPlacement="start"
                    sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                  />
                </div>

                <RHFAutocomplete
                  name="tags"
                  label="Tags"
                  multiple
                  freeSolo
                  options={TAGS_OPTION.map((option) => option)}
                  ChipProps={{ size: 'small' }}
                />

                <RHFTextField name="metaTitle" label="Meta title" />

                <RHFTextField
                  name="metaDescription"
                  label="Meta description"
                  fullWidth
                  multiline
                  rows={3}
                />

                <RHFAutocomplete
                  name="metaKeywords"
                  label="Meta keywords"
                  multiple
                  freeSolo
                  options={TAGS_OPTION.map((option) => option)}
                  ChipProps={{ size: 'small' }}
                />
              </Stack>
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <Button
                fullWidth
                color="inherit"
                variant="outlined"
                size="large"
                onClick={handleOpenPreview}
              >
                Preview
              </Button>

              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
              >
                Post
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>

        <BlogNewPostPreview
          values={values}
          open={openPreview}
          isValid={isValid}
          isSubmitting={isSubmitting}
          onClose={handleClosePreview}
          onSubmit={handleSubmit(onSubmit)}
        />
      </FormProvider>

    // </>
  );
}
