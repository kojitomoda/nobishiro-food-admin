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

type TabValue = 'all' | 'canceled' | 'complete' | 'pending' | 'payment' | 'contact'

interface TabOption {
  label: string
  value: TabValue
}

const tabOptions: TabOption[] = [
  {
    label: '店舗一覧',
    value: 'all',
  },
]

export const StoreContent: FC = (props) => {
  const [currentTab, setCurrentTab] = useState<TabValue>('all')
  const handleTabsChange = useCallback((event: ChangeEvent<{}>, tab: TabValue): void => {
    setCurrentTab(tab)
  }, [])

  return (
    <div>
      <Divider />
      {currentTab === 'all' ? (
        <Container maxWidth='md'>
          <Stack spacing={5} pt={5}>
            <Card>
              <CardContent>
                <Stack spacing={5}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>店舗名</TableCell>
                        <TableCell>プラン</TableCell>
                        <TableCell>契約日</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow hover sx={{ cursor: 'pointer' }}>
                        <TableCell>（通常）淀屋橋北浜駅前店_和カフェ・ごはん ことの葉</TableCell>
                        <TableCell align='left'>スタンダード</TableCell>
                        <TableCell align='left'>2024/02/21</TableCell>
                      </TableRow>
                      <TableRow hover sx={{ cursor: 'pointer' }}>
                        <TableCell>
                          （ビュッフェ）淀屋橋北浜駅前店_和カフェ・ごはん ことの葉
                        </TableCell>
                        <TableCell align='left'>スタンダード</TableCell>
                        <TableCell align='left'>2023/01/19</TableCell>
                      </TableRow>
                      <TableRow hover sx={{ cursor: 'pointer' }}>
                        <TableCell>枚方本店_和カフェ・ごはん ことの葉</TableCell>
                        <TableCell align='left'>スタンダード</TableCell>
                        <TableCell align='left'>2023/05/02</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Button
                    color='warning'
                    variant='contained'
                    style={{ width: '200px', fontSize: '18px' }}
                    component={NextLink}
                    href={`/store/register`}
                  >
                    店舗を追加する
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
