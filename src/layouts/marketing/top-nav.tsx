import type { FC, ReactNode } from 'react'
import { useCallback, useState } from 'react'
import { usePathname } from 'next/navigation'
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import Menu01Icon from '@untitled-ui/icons-react/build/esm/Menu01'
import type { Theme } from '@mui/material'
import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Stack,
  SvgIcon,
  useMediaQuery,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { Logo } from '../../components/logo'
import { useWindowScroll } from '../../hooks/use-window-scroll'
import { paths } from '../../paths'
import { PagesPopover } from './pages-popover'
import { TopNavItem } from './top-nav-item'

interface Item {
  disabled?: boolean
  children?: ReactNode
  path?: string
  title: string
}

const items: Item[] = [
  {
    title: 'Components',
    path: paths.components.index,
  },
  {
    title: 'Pages',
    children: <PagesPopover />,
  },
  {
    title: 'Docs',
    path: paths.docs.welcome,
  },
]

const TOP_NAV_HEIGHT: number = 64

interface TopNavProps {
  onMobileNavOpen?: () => void
}

export const TopNav: FC<TopNavProps> = (props) => {
  const { onMobileNavOpen } = props
  const pathname = usePathname()
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const [elevate, setElevate] = useState<boolean>(false)
  const offset = 64
  const delay = 100

  const handleWindowScroll = useCallback((): void => {
    if (window.scrollY > offset) {
      setElevate(true)
    } else {
      setElevate(false)
    }
  }, [])

  useWindowScroll({
    handler: handleWindowScroll,
    delay,
  })

  return (
    <Box
      component='header'
      sx={{
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        pt: 2,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Container
        maxWidth='lg'
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: 'transparent',
          borderRadius: 2.5,
          boxShadow: 'none',
          transition: (theme) =>
            theme.transitions.create('box-shadow, background-color', {
              easing: theme.transitions.easing.easeInOut,
              duration: 200,
            }),
          ...(elevate && {
            backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.9),
            boxShadow: 8,
          }),
        }}
      >
        <Stack direction='row' spacing={2} sx={{ height: TOP_NAV_HEIGHT }}>
          <Stack alignItems='center' direction='row' spacing={1} sx={{ flexGrow: 1 }}>
            <Stack
              alignItems='center'
              component={NextLink}
              direction='row'
              display='inline-flex'
              href={paths.index}
              spacing={1}
              sx={{ textDecoration: 'none' }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  height: 24,
                  width: 24,
                }}
              ></Box>
              {mdUp && (
                <Box
                  sx={{
                    color: 'text.primary',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 14,
                    fontWeight: 800,
                    letterSpacing: '0.3px',
                    lineHeight: 2.5,
                    '& span': {
                      color: 'primary.main',
                    },
                  }}
                >
                  のびしろFood<span></span>
                </Box>
              )}
            </Stack>
            <Chip label='運営管理画面' size='small' />
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

TopNav.propTypes = {
  onMobileNavOpen: PropTypes.func,
}
