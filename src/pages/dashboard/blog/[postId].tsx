import { useCallback, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import { format, subHours } from 'date-fns'
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { blogApi } from '../../../api/blog'
import { BreadcrumbsSeparator } from '../../../components/breadcrumbs-separator'
import { useMounted } from '../../../hooks/use-mounted'
import { usePageView } from '../../../hooks/use-page-view'
import { Layout as DashboardLayout } from '../../../layouts/dashboard'
import { paths } from '../../../paths'
import { PostComment } from '../../../sections/dashboard/blog/post-comment'
import { PostCommentAdd } from '../../../sections/dashboard/blog/post-comment-add'
import { PostNewsletter } from '../../../sections/dashboard/blog/post-newsletter'
import { PostContent } from '../../../sections/dashboard/blog/post-content'
import type { Post } from '../../../types/blog'

interface Comment {
  id: string
  authorAvatar: string
  authorName: string
  authorRole: string
  content: string
  createdAt: number
  isLiked: boolean
  likes: number
}

const useComments = (): Comment[] => {
  return [
    {
      id: 'd0ab3d02ef737fa6b007e35d',
      authorAvatar: '/assets/avatars/avatar-alcides-antonio.png',
      authorName: 'Alcides Antonio',
      authorRole: 'Product Designer',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      createdAt: subHours(new Date(), 2).getTime(),
      isLiked: true,
      likes: 12,
    },
    {
      id: '3ac1e17289e38a84108efdf3',
      authorAvatar: '/assets/avatars/avatar-jie-yan-song.png',
      authorName: 'Jie Yan Song',
      authorRole: 'Web Developer',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      createdAt: subHours(new Date(), 8).getTime(),
      isLiked: false,
      likes: 8,
    },
  ]
}

const usePost = (): Post | null => {
  const isMounted = useMounted()
  const [post, setPost] = useState<Post | null>(null)

  const getPost = useCallback(async () => {
    try {
      const response = await blogApi.getPost()

      if (isMounted()) {
        setPost(response)
      }
    } catch (err) {
      console.error(err)
    }
  }, [isMounted])

  useEffect(
    () => {
      getPost()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return post
}

const Page: NextPage = () => {
  const post = usePost()
  const comments = useComments()

  usePageView()

  if (!post) {
    return null
  }

  const publishedAt = format(post.publishedAt, 'MMMM d, yyyy')

  return (
    <>
      <Head>
        <title>Blog: Post Details | のびしろFood | 運営画面デモ</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={1}>
            <Typography variant='h3'>お知らせ</Typography>
            <Breadcrumbs separator={<BreadcrumbsSeparator />}>
              <Link
                color='text.primary'
                component={NextLink}
                href={paths.dashboard.index}
                variant='subtitle2'
              >
                お知らせ一覧
              </Link>
              {/*<Link*/}
              {/*  color='text.primary'*/}
              {/*  component={NextLink}*/}
              {/*  href={paths.dashboard.blog.index}*/}
              {/*  variant='subtitle2'*/}
              {/*>*/}
              {/*  Blog*/}
              {/*</Link>*/}
              {/*<Typography color='text.secondary' variant='subtitle2'>*/}
              {/*  Details*/}
              {/*</Typography>*/}
            </Breadcrumbs>
          </Stack>
          <Card
            // elevation={16}
            sx={{
              alignItems: 'center',
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'end',
              mb: 8,
              mt: 6,
              px: 3,
              py: 2,
            }}
          >
            <Typography variant='subtitle1'></Typography>
            <Button
              component={NextLink}
              href={'detail'}
              variant='contained'
              style={{ marginRight: '20px' }}
            >
              既読者を確認する
            </Button>
            <Button component={NextLink} href={paths.dashboard.blog.postCreate} variant='contained'>
              編集する
            </Button>
          </Card>
          <Stack spacing={3}>
            {/*<div>*/}
            {/*  <Chip label={post.category} />*/}
            {/*</div>*/}
            <Typography variant='h3'>{post.title}</Typography>
            {/*<Typography color='text.secondary' variant='subtitle1'>*/}
            {/*  {post.shortDescription}*/}
            {/*</Typography>*/}
            <Stack alignItems='center' direction='row' spacing={2} sx={{ mt: 3 }}>
              {/*<Avatar src={post.author.avatar} />*/}
              <div>
                {/*<Typography variant='subtitle2'>{post.author.name}</Typography>*/}
                {/*<Typography color='text.secondary' variant='body2'>*/}
                {/*  {post.readTime} read*/}
                {/*</Typography>*/}
              </div>
            </Stack>
          </Stack>
          <Box
            sx={{
              backgroundImage: `url(${post.cover})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              borderRadius: 1,
              height: 380,
              mt: 3,
            }}
          />
          {post.content && (
            <Container sx={{ py: 3 }}>
              <PostContent content={post.content} />
            </Container>
          )}
          <Divider sx={{ my: 3 }} />
          {/*<Stack spacing={2}>*/}
          {/*  {comments.map((comment) => (*/}
          {/*    <PostComment key={comment.id} {...comment} />*/}
          {/*  ))}*/}
          {/*</Stack>*/}
          <Divider sx={{ my: 3 }} />
          {/*<PostCommentAdd />*/}
          <Box sx={{ mt: 8 }}>{/*<PostNewsletter />*/}</Box>
        </Container>
      </Box>
    </>
  )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page