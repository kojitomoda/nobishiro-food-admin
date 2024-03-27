import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, Divider, Link, Stack, Typography } from '@mui/material'
import { Layout as DashboardLayout } from '../../../layouts/dashboard'
import { AppSettingSmaregiContent } from '@/components/demo/content'

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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src='../../assets/smaregi_icon.png'
                alt='説明'
                style={{ width: '40px', height: '40px', marginRight: '8px' }}
              />
              <Typography variant='h4'>スマレジ</Typography>
            </Box>
          </div>
          <div></div>
        </Stack>
      </Box>
      <Divider />
      <AppSettingSmaregiContent />
    </>
  )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
