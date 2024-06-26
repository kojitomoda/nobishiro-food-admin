import { useCallback, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import Head from 'next/head'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft'
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Link,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material'
import { invoicesApi } from '../../../api/invoices'
import { useMounted } from '../../../hooks/use-mounted'
import { usePageView } from '../../../hooks/use-page-view'
import { Layout as DashboardLayout } from '../../../layouts/dashboard'
import { paths } from '../../../paths'
import { InvoicePdfDialog } from '../../../sections/dashboard/invoice/invoice-pdf-dialog'
import { InvoicePdfDocument } from '../../../sections/dashboard/invoice/invoice-pdf-document'
import { InvoicePreview } from '../../../sections/dashboard/invoice/invoice-preview'
import type { Invoice } from '../../../types/invoice'
import { getInitials } from '../../../utils/get-initials'

const useInvoice = (): Invoice | null => {
  const isMounted = useMounted()
  const [invoice, setInvoice] = useState<Invoice | null>(null)

  const getInvoice = useCallback(async () => {
    try {
      const response = await invoicesApi.getInvoice()

      if (isMounted()) {
        setInvoice(response)
      }
    } catch (err) {
      console.error(err)
    }
  }, [isMounted])

  useEffect(
    () => {
      getInvoice()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return invoice
}

const Page: NextPage = () => {
  const invoice = useInvoice()
  const [openPdf, setOpenPdf] = useState<boolean>(false)

  usePageView()

  if (!invoice) {
    return null
  }

  return (
    <>
      <Head>
        <title>Dashboard: Invoice Details | のびしろFood | 運営画面デモ</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='lg'>
          <Stack divider={<Divider />} spacing={4}>
            <Stack spacing={4}>
              <div>
                <Link
                  color='text.primary'
                  component={NextLink}
                  href={paths.dashboard.invoices.index}
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                  underline='hover'
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant='subtitle2'>Invoices</Typography>
                </Link>
              </div>
              <Stack
                alignItems='flex-start'
                direction='row'
                justifyContent='space-between'
                spacing={4}
              >
                <Stack alignItems='center' direction='row' spacing={2}>
                  <Avatar
                    sx={{
                      height: 42,
                      width: 42,
                    }}
                  >
                    {getInitials(invoice.customer.name)}
                  </Avatar>
                  <div>
                    <Typography variant='h4'>{invoice.number}</Typography>
                    <Typography color='text.secondary' variant='body2'>
                      {invoice.customer.name}
                    </Typography>
                  </div>
                </Stack>
                <Stack alignItems='center' direction='row' spacing={2}>
                  <Button color='inherit' onClick={(): void => setOpenPdf(true)}>
                    Preview
                  </Button>
                  <PDFDownloadLink
                    document={<InvoicePdfDocument invoice={invoice} />}
                    fileName='invoice'
                    style={{ textDecoration: 'none' }}
                  >
                    <Button color='primary' variant='contained'>
                      Download
                    </Button>
                  </PDFDownloadLink>
                </Stack>
              </Stack>
            </Stack>
            <InvoicePreview invoice={invoice} />
          </Stack>
        </Container>
      </Box>
      <InvoicePdfDialog invoice={invoice} onClose={(): void => setOpenPdf(false)} open={openPdf} />
    </>
  )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
