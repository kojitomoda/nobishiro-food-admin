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
    label: '請求履歴',
    value: 'pending',
  },
  {
    label: '設定',
    value: 'complete',
  },
  {
    label: '連絡先',
    value: 'contact',
  },
  {
    label: 'お支払い方法',
    value: 'payment',
  },
]

export const OrderListSearch: FC = (props) => {
  const [currentTab, setCurrentTab] = useState<TabValue>('all')
  const handleTabsChange = useCallback((event: ChangeEvent<{}>, tab: TabValue): void => {
    setCurrentTab(tab)
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
                <Stack spacing={3}>
                  <Grid>
                    <Typography variant='h5' sx={{ pb: 3 }}>
                      ご契約プラン
                    </Typography>
                    <div>
                      このアカウントでは、スタンダードプランを月払いで利用しています。<br></br>
                      ご契約のプランは、2024年4月1日に <strong>￥28,050</strong>（税込み)
                      で更新されます。<br></br>
                      <strong>2024年4月1日 ~ 2024年4月30日</strong>までの利用料金です。
                    </div>
                  </Grid>
                  <Grid>
                    <Typography variant='h6' sx={{ pb: 1 }}>
                      アカウントのステータス
                    </Typography>
                    <div>
                      今回のお支払いは、 <strong>３</strong>店舗分の利用料金となります。
                    </div>
                    <a href=''>店舗を確認する</a>
                  </Grid>
                  <Stack>
                    <Grid>
                      <Typography variant='h6' sx={{ pb: 1 }}>
                        請求メールの送信先
                      </Typography>
                      <div>
                        test@nobishiro.biz<br></br>
                      </div>
                      <a href=''>請求連絡先を変更する</a>
                    </Grid>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      ) : currentTab === 'pending' ? (
        <Container maxWidth='md'>
          <Stack spacing={5} pt={5}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>日付</TableCell>
                  <TableCell>項目</TableCell>
                  <TableCell>請求内容</TableCell>
                  <TableCell>ステータス</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover sx={{ cursor: 'pointer' }}>
                  <TableCell
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                    }}
                  >
                    2024/03/01
                  </TableCell>
                  <TableCell>スタンダードプラン（月払い）を更新しました</TableCell>
                  <TableCell>￥28,050</TableCell>
                  <TableCell align='left'>
                    <SeverityPill color={'success'}>お支払い済み</SeverityPill>
                  </TableCell>
                </TableRow>
                <TableRow hover sx={{ cursor: 'pointer' }}>
                  <TableCell
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                    }}
                  >
                    2024/02/01
                  </TableCell>
                  <TableCell>スタンダードプラン（月払い）を更新しました</TableCell>
                  <TableCell>￥28,050</TableCell>
                  <TableCell align='left'>
                    <SeverityPill color={'success'}>お支払い済み</SeverityPill>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Stack>
        </Container>
      ) : currentTab === 'complete' ? (
        <Container maxWidth='md'>
          <Stack spacing={5} pt={5}>
            <Card>
              <CardContent>
                <Stack spacing={3}>
                  <Grid>
                    <Typography variant='h5' sx={{ pb: 3 }}>
                      会社名＆住所
                    </Typography>
                    <div>
                      この情報はアカウントの請求書に記載されます。<br></br>
                    </div>
                  </Grid>
                  <Stack spacing={3}>
                    <TextField label='組織名' name='組織名' value={'合同会社COREHITS'} />
                    <TextField
                      fullWidth
                      label='住所'
                      name='住所'
                      value={'兵庫県神戸市長田区久保町五丁目１番 アスタ新長田 3 番館'}
                    />
                    <Button
                      color='warning'
                      variant='contained'
                      style={{ width: '200px', fontSize: '18px' }}
                    >
                      設定を保存する
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      ) : currentTab === 'contact' ? (
        <Container maxWidth='md'>
          <Stack spacing={5} pt={5}>
            <Card>
              <CardContent>
                <Stack spacing={3}>
                  <Grid>
                    <Typography variant='h5' sx={{ pb: 3 }}>
                      請求連絡先
                    </Typography>
                    <div>
                      請求メールの送信先です。<br></br>
                    </div>
                  </Grid>
                  <Stack spacing={3}>
                    <TextField label='メールアドレス' name='組織名' value={'test@nobishiro.biz'} />
                    <Button
                      color='warning'
                      variant='contained'
                      style={{ width: '200px', fontSize: '18px' }}
                    >
                      設定を保存する
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      ) : currentTab === 'payment' ? (
        <Container maxWidth='md'>
          <Stack spacing={5} pt={5}>
            <Card>
              <CardContent>
                <Stack spacing={5}>
                  <Grid>
                    <Typography variant='h5' sx={{ pb: 3 }}>
                      現在の支払い
                    </Typography>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>カード番号末尾 4 桁 : 1027</div>
                      <div style={{ fontSize: '14px' }}>Amex 07/2024</div>
                    </div>
                  </Grid>
                  <Button
                    color='warning'
                    variant='contained'
                    style={{ width: '400px', fontSize: '18px' }}
                  >
                    クレジットカードを変更する
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
