import type { NextPage } from 'next'
import Head from 'next/head'
import { usePageView } from '../hooks/use-page-view'
import { Layout as MarketingLayout } from '../layouts/marketing'
import { HomeHero } from '../sections/home/home-hero'

const Page: NextPage = () => {
  usePageView()

  return (
    <>
      <Head>
        <title>のびしろFood | 運営画面デモ</title>
      </Head>
      <main>
        <HomeHero />
      </main>
    </>
  )
}

Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>

export default Page
