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

export const AppSettingContent: FC = (props) => {
  return (
    <div>
      <Divider />
      <Container maxWidth='md'>
        <Stack spacing={5} pt={5}>
          <Card>
            <CardContent>
              <Stack spacing={1}>
                <Grid>
                  <Typography variant='h5' sx={{ pb: 1 }}>
                    設定可能App一覧
                  </Typography>
                </Grid>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>名前</TableCell>
                      <TableCell></TableCell>
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
                            href={`/app-setting/smaregi`}
                          >
                            スマレジ
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align='left'>
                        <SeverityPill color={'success'}></SeverityPill>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </div>
  )
}
