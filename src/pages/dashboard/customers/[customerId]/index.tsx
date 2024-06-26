import type { ChangeEvent } from 'react'
import { useCallback, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import Head from 'next/head'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft'
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown'
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02'
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Link,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import { customersApi } from '../../../../api/customers'
import { useMounted } from '../../../../hooks/use-mounted'
import { usePageView } from '../../../../hooks/use-page-view'
import { Layout as DashboardLayout } from '../../../../layouts/dashboard'
import { paths } from '../../../../paths'
import { CustomerBasicDetails } from '../../../../sections/dashboard/customer/customer-basic-details'
import { CustomerDataManagement } from '../../../../sections/dashboard/customer/customer-data-management'
import { CustomerEmailsSummary } from '../../../../sections/dashboard/customer/customer-emails-summary'
import { CustomerInvoices } from '../../../../sections/dashboard/customer/customer-invoices'
import { CustomerPayment } from '../../../../sections/dashboard/customer/customer-payment'
import { CustomerLogs } from '../../../../sections/dashboard/customer/customer-logs'
import type { Customer } from '../../../../types/customer'
import { CustomerInvoice, CustomerLog } from '../../../../types/customer'
import { getInitials } from '../../../../utils/get-initials'
import { CustomerDetailList } from '@/sections/dashboard/customer/cutomer-detail-list'
import { SeverityPill } from '@/components/severity-pill'

const tabs = [
  { label: 'Details', value: 'details' },
  { label: 'Invoices', value: 'invoices' },
  { label: 'Logs', value: 'logs' },
]

const useCustomer = (): Customer | null => {
  const isMounted = useMounted()
  const [customer, setCustomer] = useState<Customer | null>(null)

  const getCustomer = useCallback(async () => {
    try {
      const response = await customersApi.getCustomer()

      if (isMounted()) {
        setCustomer(response)
      }
    } catch (err) {
      console.error(err)
    }
  }, [isMounted])

  useEffect(
    () => {
      getCustomer()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return customer
}

const useInvoices = (): CustomerInvoice[] => {
  const isMounted = useMounted()
  const [invoices, setInvoices] = useState<CustomerInvoice[]>([])

  const getInvoices = useCallback(async () => {
    try {
      const response = await customersApi.getInvoices()

      if (isMounted()) {
        setInvoices(response)
      }
    } catch (err) {
      console.error(err)
    }
  }, [isMounted])

  useEffect(
    () => {
      getInvoices()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return invoices
}

const useLogs = (): CustomerLog[] => {
  const isMounted = useMounted()
  const [logs, setLogs] = useState<CustomerLog[]>([])

  const getLogs = useCallback(async () => {
    try {
      const response = await customersApi.getLogs()

      if (isMounted()) {
        setLogs(response)
      }
    } catch (err) {
      console.error(err)
    }
  }, [isMounted])

  useEffect(
    () => {
      getLogs()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return logs
}

const Page: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<string>('details')
  const customer = useCustomer()
  const invoices = useInvoices()
  const logs = useLogs()

  usePageView()

  const handleTabsChange = useCallback((event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value)
  }, [])

  if (!customer) {
    return null
  }

  return (
    <>
      <Head>
        <title>Dashboard: Customer Details | のびしろFood | 運営画面デモ</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 1,
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={4} style={{ marginBottom: '30px' }}>
            <Stack spacing={4}>
              <div>
                <Link
                  color='text.primary'
                  component={NextLink}
                  href={'/dashboard/customers'}
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex',
                    marginRight: '20px',
                  }}
                  underline={'always'}
                >
                  &gt; 部屋一覧
                </Link>
                <span style={{ marginLeft: '5px' }}>&gt; 1201</span>
              </div>
              <Stack
                alignItems='flex-start'
                direction={{
                  xs: 'column',
                  md: 'row',
                }}
                justifyContent='space-between'
                spacing={4}
              >
                <Stack>
                  <Stack
                    alignItems='center'
                    direction={{
                      xs: 'row',
                      md: 'row',
                    }}
                    spacing={3}
                  >
                    <div>
                      <Typography variant='h4'>1201</Typography>
                      <SeverityPill color='info'>入居中</SeverityPill>
                    </div>
                    <div style={{ marginLeft: '100px' }}>
                      <Button
                        variant='contained'
                        component={NextLink}
                        href={'/dashboard/customers/:customerId/register'}
                        style={{ marginRight: '20px' }}
                        color={'info'}
                      >
                        入居者登録
                      </Button>
                    </div>
                  </Stack>
                </Stack>

                <Stack alignItems='center' direction='row' spacing={2}></Stack>
              </Stack>
              <div>
                <Divider />
              </div>
            </Stack>
            {currentTab === 'details' && (
              <div>
                <Grid container spacing={4}>
                  <Grid xs={12} lg={4}>
                    <CustomerBasicDetails
                      address1={customer.address1}
                      address2={customer.address2}
                      country={customer.country}
                      email={customer.email}
                      isVerified={!!customer.isVerified}
                      phone={customer.phone}
                      state={customer.state}
                    />
                  </Grid>
                  <Grid xs={12} lg={8}>
                    <Stack spacing={4}>
                      <CustomerDataManagement />
                    </Stack>
                  </Grid>
                </Grid>
              </div>
            )}
            {currentTab === 'invoices' && <CustomerInvoices invoices={invoices} />}
            {currentTab === 'logs' && <CustomerLogs logs={logs} />}
          </Stack>
          <div style={{ marginBottom: '20px' }}>
            <Divider />
          </div>
          <Stack alignItems='center' direction='row' spacing={2}>
            <Stack spacing={1} style={{ marginBottom: '30px' }}>
              <Typography variant='h4'>入居者履歴</Typography>
            </Stack>
          </Stack>
          <CustomerDetailList></CustomerDetailList>
        </Container>
      </Box>
    </>
  )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
