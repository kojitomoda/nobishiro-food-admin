import { useCallback, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, Container, Stack, Typography } from '@mui/material'
import { socialApi } from '../../../api/social'
import { useMounted } from '../../../hooks/use-mounted'
import { usePageView } from '../../../hooks/use-page-view'
import { Layout as DashboardLayout } from '../../../layouts/dashboard'
import { SocialPostAdd } from '../../../sections/dashboard/social/social-post-add'
import { SocialPostCard } from '../../../sections/dashboard/social/social-post-card'
import type { Post } from '../../../types/social'

const usePosts = (): Post[] => {
  const isMounted = useMounted()
  const [posts, setPosts] = useState<Post[]>([])

  const getPosts = useCallback(async () => {
    try {
      const response = await socialApi.getFeed()

      if (isMounted()) {
        setPosts(response)
      }
    } catch (err) {
      console.error(err)
    }
  }, [isMounted])

  useEffect(
    () => {
      getPosts()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return posts
}

const SocialFeed: NextPage = () => {
  const posts = usePosts()

  usePageView()

  return (
    <>
      <Head>
        <title>Dashboard: Social Feed | のびしろFood | 運営画面デモ</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='lg'>
          <Stack spacing={1}>
            <Typography color='text.secondary' variant='overline'>
              Social Feed
            </Typography>
            <Typography variant='h4'>Here&apos;s what your connections posted</Typography>
          </Stack>
          <Stack spacing={3} sx={{ mt: 3 }}>
            <SocialPostAdd />
            {posts.map((post) => (
              <SocialPostCard
                key={post.id}
                authorAvatar={post.author.avatar}
                authorName={post.author.name}
                comments={post.comments}
                createdAt={post.createdAt}
                isLiked={post.isLiked}
                likes={post.likes}
                media={post.media}
                message={post.message}
              />
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  )
}

SocialFeed.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default SocialFeed
