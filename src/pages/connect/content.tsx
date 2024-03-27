import type { ChangeEvent, FC } from 'react'
import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  InputAdornment,
  Link,
  OutlinedInput,
  Stack,
  SvgIcon,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import { SeverityPill } from '@/components/severity-pill'
import NextLink from 'next/link'

interface Filters {
  query?: string
  status?: string
}

type TabValue = 'all' | 'canceled' | 'complete' | 'pending' | 'payment' | 'contact'

interface TabOption {
  label: string
  value: TabValue
}

const tabOptions: TabOption[] = [
  {
    label: '概要',
    value: 'all',
  },
  {
    label: 'App連携とは',
    value: 'pending',
  },
]

export const ConnectContent: FC = (props) => {
  const [currentTab, setCurrentTab] = useState<TabValue>('all')
  const [filters, setFilters] = useState<Filters>({
    query: undefined,
    status: undefined,
  })

  const handleTabsChange = useCallback((event: ChangeEvent<{}>, tab: TabValue): void => {
    setCurrentTab(tab)
    const status = tab === 'all' ? undefined : tab

    setFilters((prevState) => ({
      ...prevState,
      status,
    }))
  }, [])

  return (
    <div>
      <Tabs
        indicatorColor='primary'
        onChange={handleTabsChange}
        scrollButtons='auto'
        sx={{ px: 3 }}
        textColor='primary'
        value={currentTab}
        variant='scrollable'
      >
        {tabOptions.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            style={{ fontSize: '20px', fontWeight: 'bold', marginRight: '10px' }}
          />
        ))}
      </Tabs>
      <Divider />
      {currentTab === 'all' ? (
        <Container maxWidth='md'>
          <Stack spacing={5} pt={5}>
            <Card>
              <CardContent>
                <Stack spacing={5}>
                  <Grid>
                    <Typography variant='h5' sx={{ pb: 3 }}>
                      アプリケーション連携について
                    </Typography>
                    <div>
                      のびしろFoodとアプリケーションを連携できます。<br></br>
                    </div>
                  </Grid>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>名前</TableCell>
                        <TableCell>s</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{
                            display: 'flex',
                            flexDirection: 'row', // 横に並べる
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img
                              src='assets/smaregi_icon.png'
                              alt='説明'
                              style={{ width: '40px', height: '40px', marginRight: '8px' }}
                            />
                            <Typography
                              style={{ fontWeight: 'bold', textDecoration: 'underline' }}
                              component={NextLink}
                              href={`/connect/smaregi`}
                            >
                              スマレジ
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align='left'>
                          <SeverityPill color={'success'}>未連携</SeverityPill>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      ) : currentTab === 'pending' ? (
        <Container maxWidth='md'>
          <Stack spacing={5} pt={5}>
            <Card>
              <CardContent>
                <Stack spacing={5}>
                  <Grid>
                    <Typography variant='h5' sx={{ pb: 3 }}>
                      App連携とは
                    </Typography>
                    <div>
                      のびしろFoodを快適に利用するための方法です。<br></br>
                    </div>
                  </Grid>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      ) : (
        <div>hoge</div>
      )}
    </div>
  )
}
