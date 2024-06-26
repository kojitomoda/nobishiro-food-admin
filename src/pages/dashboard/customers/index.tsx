import type { ChangeEvent, MouseEvent } from 'react'
import { useCallback, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Download01Icon from '@untitled-ui/icons-react/build/esm/Download01'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import Upload01Icon from '@untitled-ui/icons-react/build/esm/Upload01'
import { Box, Button, Card, Container, Stack, SvgIcon, Typography } from '@mui/material'
import { customersApi } from '../../../api/customers'
import { useMounted } from '../../../hooks/use-mounted'
import { usePageView } from '../../../hooks/use-page-view'
import { Layout as DashboardLayout } from '../../../layouts/dashboard'
import { CustomerListSearch } from '../../../sections/dashboard/customer/customer-list-search'
import { CustomerListTable } from '../../../sections/dashboard/customer/customer-list-table'
import type { Customer } from '../../../types/customer'

interface Filters {
  query?: string
  hasAcceptedMarketing?: boolean
  isProspect?: boolean
  isReturning?: boolean
}

interface Search {
  filters: Filters
  page: number
  rowsPerPage: number
  sortBy: string
  sortDir: 'asc' | 'desc'
}

const useSearch = () => {
  const [search, setSearch] = useState<Search>({
    filters: {
      query: undefined,
      hasAcceptedMarketing: undefined,
      isProspect: undefined,
      isReturning: undefined,
    },
    page: 0,
    rowsPerPage: 10,
    sortBy: 'updatedAt',
    sortDir: 'desc',
  })

  return {
    search,
    updateSearch: setSearch,
  }
}

const useCustomers = (search: Search): { customers: Customer[]; customersCount: number } => {
  const isMounted = useMounted()
  const [state, setState] = useState<{
    customers: Customer[]
    customersCount: number
  }>({
    customers: [],
    customersCount: 0,
  })

  const getCustomers = useCallback(async () => {
    try {
      const response = await customersApi.getCustomers(search)
      if (isMounted()) {
        setState({
          customers: response.data,
          customersCount: response.count,
        })
      }
    } catch (err) {
      console.error(err)
    }
  }, [search, isMounted])

  useEffect(
    () => {
      getCustomers()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search],
  )

  return state
}

const Page: NextPage = () => {
  const { search, updateSearch } = useSearch()
  const { customers, customersCount } = useCustomers(search)

  usePageView()

  const handleFiltersChange = useCallback(
    (filters: Filters): void => {
      updateSearch((prevState) => ({
        ...prevState,
        filters,
      }))
    },
    [updateSearch],
  )

  const handleSortChange = useCallback(
    (sort: { sortBy: string; sortDir: 'asc' | 'desc' }): void => {
      updateSearch((prevState) => ({
        ...prevState,
        sortBy: sort.sortBy,
        sortDir: sort.sortDir,
      }))
    },
    [updateSearch],
  )

  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
      updateSearch((prevState) => ({
        ...prevState,
        page,
      }))
    },
    [updateSearch],
  )

  const handleRowsPerPageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      updateSearch((prevState) => ({
        ...prevState,
        rowsPerPage: parseInt(event.target.value, 10),
      }))
    },
    [updateSearch],
  )

  return (
    <>
      <Head>
        <title>Dashboard: Customer List | のびしろFood | 運営画面デモ</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 1,
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={4}>
            <Stack direction='row' justifyContent='space-between' spacing={4}>
              <Stack spacing={1}>
                <Typography variant='h4'>部屋一覧</Typography>
                <Stack alignItems='center' direction='row' spacing={1}></Stack>
              </Stack>
            </Stack>
            <Card>
              <CustomerListSearch
                onFiltersChange={handleFiltersChange}
                onSortChange={handleSortChange}
                sortBy={search.sortBy}
                sortDir={search.sortDir}
              />
              <CustomerListTable
                customers={customers}
                customersCount={customersCount}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPage={search.rowsPerPage}
                page={search.page}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
