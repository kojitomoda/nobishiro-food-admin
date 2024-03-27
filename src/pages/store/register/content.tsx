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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import { SeverityPill } from '@/components/severity-pill'
import { lineHeight } from '@mui/system'

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

export const StoreRegisterContent: FC = (props) => {
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
                <Stack spacing={3}>
                  <FormControl>
                    <FormLabel id='demo-row-radio-buttons-group-label'>プラン選択</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby='demo-row-radio-buttons-group-label'
                      name='row-radio-buttons-group'
                    >
                      <FormControlLabel value='female' control={<Radio />} label='スタンダード' />
                      <FormControlLabel value='male' control={<Radio />} label='プレミアム' />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <Stack spacing={1}>
                      <FormLabel id='demo-row-radio-buttons-group-label'>店舗名</FormLabel>
                      <TextField fullWidth label='' name='住所' value={''} />
                    </Stack>
                  </FormControl>
                  <div style={{ lineHeight: 2 }}>
                    次回請求時に<strong>￥9,350(税込)</strong>追加で請求されます。
                    <Divider />
                    次回請求金額； <strong>￥37,400(税込)</strong>
                  </div>
                  <Link href={'/store/register'}>
                    <Button
                      color='warning'
                      variant='contained'
                      style={{ width: '200px', fontSize: '18px' }}
                    >
                      店舗を登録する
                    </Button>
                  </Link>
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
