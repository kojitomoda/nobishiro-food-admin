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

export const StaffContent: FC = (props) => {
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
                        <TableCell>氏名</TableCell>
                        <TableCell>メールアドレス</TableCell>
                        <TableCell>権限</TableCell>
                        <TableCell>登録日</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow hover sx={{ cursor: 'pointer' }}>
                        <TableCell>新井一成</TableCell>
                        <TableCell>example@account.com</TableCell>
                        <TableCell>管理者</TableCell>
                        <TableCell align='left'>2024/02/21</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Button
                    color='warning'
                    variant='contained'
                    style={{ width: '250px', fontSize: '18px' }}
                  >
                    スタッフを追加する
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
