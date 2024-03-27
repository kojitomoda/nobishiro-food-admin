import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { Layout as DashboardLayout } from '../../layouts/dashboard'
import { ConnectContent } from '@/pages/connect/content'
import { AppSettingContent } from '@/pages/app-setting/content'

const Page: NextPage = () => {
  const [drawer, setDrawer] = useState<{
    isOpen: boolean
    data?: string
  }>({
    isOpen: false,
    data: undefined,
  })

  return (
    <>
      <Head>
        <title>のびしろFood</title>
      </Head>
      <Divider />
      <Box sx={{ p: 3, pt: 5 }}>
        <Stack alignItems='flex-start' direction='row' justifyContent='space-between' spacing={4}>
          <div>
            <Typography variant='h4'>App設定</Typography>
          </div>
          <div></div>
        </Stack>
      </Box>
      <Divider />
      <AppSettingContent />
    </>
  )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
