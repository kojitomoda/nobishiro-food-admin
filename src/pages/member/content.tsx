import type { ChangeEvent, FC } from 'react'
import { useCallback, useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
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

type TabValue = 'all' | 'description'

interface TabOption {
  label: string
  value: TabValue
}

const tabOptions: TabOption[] = [
  {
    label: '一覧',
    value: 'all',
  },
  {
    label: 'アカウント種別とは',
    value: 'description',
  },
]

export const MemberContent: FC = (props) => {
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
          <Stack spacing={5} pb={5} pt={5}>
            <Card>
              <CardContent>
                <Stack spacing={5}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>氏名</TableCell>
                        <TableCell>アカウント種別</TableCell>
                        <TableCell>店舗名</TableCell>
                        <TableCell>登録日</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow hover sx={{ cursor: 'pointer' }}>
                        <TableCell>新井一成</TableCell>
                        <TableCell align='left'>管理者</TableCell>
                        <TableCell>--</TableCell>
                        <TableCell align='left'>2024/02/21</TableCell>
                      </TableRow>
                      <TableRow hover sx={{ cursor: 'pointer' }}>
                        <TableCell>友田晃司</TableCell>
                        <TableCell align='left'>管理者</TableCell>
                        <TableCell>--</TableCell>
                        <TableCell align='left'>2023/01/19</TableCell>
                        <TableCell>
                          <Button variant='outlined' color='error'>
                            削除
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow hover sx={{ cursor: 'pointer' }}>
                        <TableCell>工藤公康</TableCell>
                        <TableCell align='left'>責任者</TableCell>
                        <TableCell align='left'>
                          ・通常）淀屋橋北浜駅前店_和カフェ・ごはん ことの葉<br></br>
                        </TableCell>
                        <TableCell align='left'>2023/01/19</TableCell>
                        <TableCell>
                          <Button variant='outlined' color='error'>
                            削除
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow hover sx={{ cursor: 'pointer' }}>
                        <TableCell>佐藤晃司</TableCell>
                        <TableCell align='left'>責任者</TableCell>
                        <TableCell align='left'>
                          ・通常）淀屋橋北浜駅前店_和カフェ・ごはん ことの葉<br></br>
                          ・枚方本店_和カフェ・ごはん ことの葉
                        </TableCell>
                        <TableCell align='left'>2023/01/19</TableCell>
                        <TableCell>
                          <Button variant='outlined' color='error'>
                            削除
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow hover sx={{ cursor: 'pointer' }}>
                        <TableCell>山本由伸</TableCell>
                        <TableCell align='left'>スタッフ</TableCell>
                        <TableCell>・枚方本店_和カフェ・ごはん ことの葉</TableCell>
                        <TableCell align='left'>2023/01/19</TableCell>
                        <TableCell>
                          <Button variant='outlined' color='error'>
                            削除
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow hover sx={{ cursor: 'pointer' }}>
                        <TableCell>大谷翔平</TableCell>
                        <TableCell align='left'>スタッフ</TableCell>
                        <TableCell align='left'>
                          ・通常）淀屋橋北浜駅前店_和カフェ・ごはん ことの葉<br></br>
                          ・枚方本店_和カフェ・ごはん ことの葉
                        </TableCell>
                        <TableCell align='left'>2023/01/19</TableCell>
                        <TableCell>
                          <Button variant='outlined' color='error'>
                            削除
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Button
                    color='warning'
                    variant='contained'
                    style={{ width: '250px', fontSize: '18px' }}
                    component={NextLink}
                    href={``}
                  >
                    アカウントを追加する
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      ) : currentTab === 'description' ? (
        <Container maxWidth='md'>
          <Stack spacing={5} pt={5}>
            <Card>
              <CardContent>
                <Stack spacing={4}>
                  <Stack spacing={1}>
                    <div>
                      アカウント種別によって、操作できる機能が異なります。<br></br>
                    </div>
                    <div style={{ textDecoration: 'underline', fontSize: '18px' }}>
                      ※スタッフはのびしろFood管理アプリにログインできません。<br></br>
                    </div>
                  </Stack>
                  <Stack spacing={1}>
                    <Typography variant='h5' sx={{ pb: 1 }}>
                      機能一覧
                    </Typography>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>機能名</TableCell>
                          <TableCell>管理者</TableCell>
                          <TableCell>責任者</TableCell>
                          <TableCell>スタッフ</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow hover sx={{ cursor: 'pointer' }}>
                          <TableCell>店舗管理</TableCell>
                          <TableCell>
                            <CheckCircleIcon color='success' />
                          </TableCell>
                          <TableCell></TableCell>
                          <TableCell align='left'></TableCell>
                        </TableRow>
                        <TableRow hover sx={{ cursor: 'pointer' }}>
                          <TableCell>料金・お支払い</TableCell>
                          <TableCell>
                            <CheckCircleIcon color='success' />
                          </TableCell>
                          <TableCell align='left'></TableCell>
                          <TableCell align='left'></TableCell>
                        </TableRow>
                        <TableRow hover sx={{ cursor: 'pointer' }}>
                          <TableCell>アカウント管理</TableCell>
                          <TableCell>
                            <CheckCircleIcon color='success' />
                          </TableCell>
                          <TableCell></TableCell>
                          <TableCell align='left'></TableCell>
                        </TableRow>
                        <TableRow hover sx={{ cursor: 'pointer' }}>
                          <TableCell>スタッフ管理</TableCell>
                          <TableCell>
                            <CheckCircleIcon color='success' />
                          </TableCell>
                          <TableCell>
                            <CheckCircleIcon color='success' />
                          </TableCell>
                          <TableCell align='left'></TableCell>
                        </TableRow>
                        <TableRow hover sx={{ cursor: 'pointer' }}>
                          <TableCell>App連携</TableCell>
                          <TableCell>
                            <CheckCircleIcon color='success' />
                          </TableCell>
                          <TableCell align='left'></TableCell>
                          <TableCell align='left'></TableCell>
                        </TableRow>
                        <TableRow hover sx={{ cursor: 'pointer' }}>
                          <TableCell>App設定</TableCell>
                          <TableCell>
                            <CheckCircleIcon color='success' />
                          </TableCell>
                          <TableCell>
                            <CheckCircleIcon color='success' />
                          </TableCell>
                          <TableCell align='left'></TableCell>
                        </TableRow>
                        <TableRow hover sx={{ cursor: 'pointer' }}>
                          <TableCell>履歴確認</TableCell>
                          <TableCell>
                            <CheckCircleIcon color='success' />
                          </TableCell>
                          <TableCell>
                            <CheckCircleIcon color='success' />
                          </TableCell>
                          <TableCell align='left'></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Stack>
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
