import type { ReactNode } from 'react'
import type { TFunction } from 'react-i18next'
import { SvgIcon } from '@mui/material'
import CalendarIcon from '../../icons/untitled-ui/duocolor/calendar'
import Users03Icon from '../../icons/untitled-ui/duocolor/users-03'
import AlignLeft02 from '../../icons/untitled-ui/duocolor/align-left-02'
import ShoppingBag03Icon from '../../icons/untitled-ui/duocolor/shopping-bag-03'
import File01Icon from '../../icons/untitled-ui/duocolor/file-01'
import CreditCard01 from '../../icons/untitled-ui/duocolor/credit-card-01'
import BarChartSquare02Icon from '../../icons/untitled-ui/duocolor/bar-chart-square-02'
import Share07 from '../../icons/untitled-ui/duocolor/share-07'

interface Item {
  disabled?: boolean
  icon?: ReactNode
  items?: Item[]
  label?: ReactNode
  path?: string
  title: string
}

export interface Section {
  items: Item[]
  subheader?: string
}

export const getSections = (t: TFunction): Section[] => [
  {
    items: [
      // {
      //   title: '契約を管理する',
      //   icon: (
      //     <SvgIcon fontSize='small'>
      //       <CreditCard01 />
      //     </SvgIcon>
      //   ),
      //   path: '/payment',
      // },
      {
        title: 'スマレジ連携',
        icon: (
          <SvgIcon fontSize='small'>
            <Share07 />
          </SvgIcon>
        ),
        path: '/connect',
      },
      {
        title: 'スタッフを管理する',
        icon: (
          <SvgIcon fontSize='small'>
            <Users03Icon />
          </SvgIcon>
        ),
        path: '/staff',
      },
      {
        title: '店舗を管理する',
        icon: (
          <SvgIcon fontSize='small'>
            <ShoppingBag03Icon />
          </SvgIcon>
        ),
        path: '/store',
      },
      {
        title: 'のびしろFOODに遷移する',
        icon: (
          <SvgIcon fontSize='small'>
            <AlignLeft02 />
          </SvgIcon>
        ),
      },
      // {
      //   title: 'Appを設定する',
      //   icon: (
      //     <SvgIcon fontSize='small'>
      //       <Share07 />
      //     </SvgIcon>
      //   ),
      //   path: '/app-setting',
      // },
      // {
      //   title: '履歴を確認する',
      //   icon: (
      //     <SvgIcon fontSize='small'>
      //       <BarChartSquare02Icon />
      //     </SvgIcon>
      //   ),
      //   path: '/log',
      // },
    ],
  },
  // {
  //   subheader: '管理者機能',
  //   items: [
  //     {
  //       title: '店舗を管理する',
  //       icon: (
  //         <SvgIcon fontSize='small'>
  //           <ShoppingBag03Icon />
  //         </SvgIcon>
  //       ),
  //       path: '/store',
  //     },
  //     {
  //       title: 'アカウントを管理する',
  //       icon: (
  //         <SvgIcon fontSize='small'>
  //           <Users03Icon />
  //         </SvgIcon>
  //       ),
  //       path: '/member',
  //     },
  //     {
  //       title: '料金・お支払い',
  //       icon: (
  //         <SvgIcon fontSize='small'>
  //           <CreditCard01 />
  //         </SvgIcon>
  //       ),
  //       path: '/payment',
  //     },
  //     {
  //       title: 'App連携',
  //       icon: (
  //         <SvgIcon fontSize='small'>
  //           <Share07 />
  //         </SvgIcon>
  //       ),
  //       path: '/connect',
  //     },
  //   ],
  // },
]
