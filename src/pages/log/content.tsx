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
    label: '編集履歴',
    value: 'all',
  },
  {
    label: 'ログイン履歴',
    value: 'description',
  },
]

export const LogContent: FC = (props) => {
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
                      {/*<TableRow>*/}
                      {/*  <TableCell>氏名</TableCell>*/}
                      {/*</TableRow>*/}
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          2024年03月13日 12:49:32
                          管理者_新井さんが食材「コーンフレーク（1kg）」の税抜価格を更新しました
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          2024年03月05日 13:12:17
                          三原梨紗さんが商品メニュー「【朝】コーン」の手順を更新しました
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          2024年03月04日 19:32:20
                          三原梨紗さんが仕込み「みたらし団子のタレ（ビュッフェ用）」の仕込み量を更新しました
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          2024年03月04日 19:32:20
                          三原梨紗さんが仕込み「みたらし団子のタレ（ビュッフェ用）」のレシピを更新しました
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          2024年03月04日 19:32:20
                          三原梨紗さんが仕込み「みたらし団子のタレ（ビュッフェ用）」の手順を更新しました
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <a href=''>もっと読み込む</a>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      ) : currentTab === 'description' ? (
        <Container maxWidth='md'>
          <Stack spacing={5} pt={5}>
            <Card>
              {' '}
              <CardContent>
                <Stack spacing={5}>
                  <Table>
                    <TableHead>
                      {/*<TableRow>*/}
                      {/*  <TableCell>氏名</TableCell>*/}
                      {/*</TableRow>*/}
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          2024年03月27日 21:23:26 管理者_新井さんがログインしました
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          2024年03月27日 21:21:48 管理者_新井さんがログインしました
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          2024年03月26日 21:27:58 三原梨紗さんがログインしました
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          2024年03月26日 20:44:26 管理者_新井さんがログインしました
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          2024年03月26日 12:40:21 三原梨紗さんがログインしました
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <a href=''>もっと読み込む</a>
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
