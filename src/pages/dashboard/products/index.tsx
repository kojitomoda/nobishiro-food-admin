import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material'
import { productsApi } from '../../../api/products'
import { BreadcrumbsSeparator } from '../../../components/breadcrumbs-separator'
import { useMounted } from '../../../hooks/use-mounted'
import { usePageView } from '../../../hooks/use-page-view'
import { Layout as DashboardLayout } from '../../../layouts/dashboard'
import { paths } from '../../../paths'
import { ProductListSearch } from '../../../sections/dashboard/product/product-list-search'
import { ProductListTable } from '../../../sections/dashboard/product/product-list-table'
import type { Product } from '../../../types/product'

interface Filters {
  name?: string
  category: string[]
  status: string[]
  inStock?: boolean
}

interface Search {
  filters: Filters
  page: number
  rowsPerPage: number
}

const useSearch = () => {
  const [search, setSearch] = useState<Search>({
    filters: {
      name: undefined,
      category: [],
      status: [],
      inStock: undefined,
    },
    page: 0,
    rowsPerPage: 5,
  })

  return {
    search,
    updateSearch: setSearch,
  }
}

const useProducts = (search: Search): { products: Product[]; productsCount: number } => {
  const isMounted = useMounted()
  const [state, setState] = useState<{
    products: Product[]
    productsCount: number
  }>({
    products: [],
    productsCount: 0,
  })

  const getProducts = useCallback(async () => {
    try {
      const response = await productsApi.getProducts(search)

      if (isMounted()) {
        setState({
          products: response.data,
          productsCount: response.count,
        })
      }
    } catch (err) {
      console.error(err)
    }
  }, [search, isMounted])

  useEffect(
    () => {
      getProducts()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search],
  )

  return state
}

const ProductList: NextPage = () => {
  const { search, updateSearch } = useSearch()
  const { products, productsCount } = useProducts(search)

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
        <title>Dashboard: Product List | のびしろFood | 運営画面デモ</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={4}>
            <Stack direction='row' justifyContent='space-between' spacing={4}>
              <Stack spacing={1}>
                <Typography variant='h4'>建物一覧</Typography>
              </Stack>
              <Stack alignItems='center' direction='row' spacing={3}>
                <Button
                  component={NextLink}
                  href={paths.dashboard.products.create}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant='contained'
                >
                  Add
                </Button>
              </Stack>
            </Stack>
            <Card>
              <ProductListSearch onFiltersChange={handleFiltersChange} />
              <ProductListTable
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={search.page}
                products={products}
                productsCount={productsCount}
                rowsPerPage={search.rowsPerPage}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

ProductList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default ProductList
