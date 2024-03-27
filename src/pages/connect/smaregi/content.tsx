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

type TabValue = 'all' | 'pending' | 'setting'

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
    label: '連携方法',
    value: 'pending',
  },
  {
    label: '設定方法',
    value: 'setting',
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
        sx={{ px: 3, pt: 5 }}
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
          <Stack spacing={5} pb={5} pt={5}>
            <Card>
              <CardContent>
                <Stack spacing={3}>
                  <Grid>
                    <Typography variant='h5' sx={{ pb: 1 }}>
                      スマレジ連携でできることは？
                    </Typography>
                  </Grid>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>項目</TableCell>
                        <TableCell>内容</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow hover sx={{ cursor: 'pointer' }}>
                        <TableCell>商品原価</TableCell>
                        <TableCell align='left'>
                          商品原価をスマレジの「原価」項目に反映することができます。
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Grid>
                    <Typography variant='h5' sx={{ pb: 1 }}></Typography>
                    <a href=''>連携はこちら{'>'}</a>
                  </Grid>
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
                    <Typography variant='h5' sx={{ pb: 2 }}>
                      ステップ１
                    </Typography>
                    <div>スマレジログイン画面でログイン。</div>
                    <img src='../../assets/smeregi_step1.png' width={600} />
                  </Grid>
                  <Grid>
                    <Typography variant='h5' sx={{ pb: 2 }}>
                      ステップ2
                    </Typography>
                    <div>のびしろFoodにアクセス件を付与することを許可する。</div>
                    <img src='../../assets/smeregi_step2.png' width={600} />
                  </Grid>
                  <Grid>
                    <a href='' style={{ fontSize: '20px' }}>
                      連携はこちら{'>'}
                    </a>
                  </Grid>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      ) : currentTab === 'setting' ? (
        <Container maxWidth='md'>
          <Stack spacing={5} pt={5}>
            <Card>
              <CardContent>
                <Stack spacing={5}>
                  <div>※スマレジと連携を済ませてから設定できます。</div>
                  <Grid>
                    <Typography variant='h5' sx={{ pb: 2 }}>
                      ステップ１
                    </Typography>
                    <div>商品ページの「スマレジ 商品コード」にスマレジの商品コードを入力。</div>
                    <img src='../..//assets/smaregi_connect.png' width={600} />
                  </Grid>
                  <Button
                    color='warning'
                    variant='contained'
                    style={{ width: '200px', fontSize: '18px' }}
                    component={NextLink}
                    href={`/store/register`}
                  >
                    設定する
                  </Button>
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
