import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter, useSearchParams } from 'next/navigation'
import NextLink from 'next/link'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormHelperText,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import type { AuthContextType } from '@/contexts/auth/jwt-context'
import { GuestGuard } from '@/guards/guest-guard'
import { IssuerGuard } from '@/guards/issuer-guard'
import { useAuth } from '@/hooks/use-auth'
import { useMounted } from '@/hooks/use-mounted'
import { usePageView } from '@/hooks/use-page-view'
import { Layout as AuthLayout } from '@/layouts/auth/classic-layout'
import { paths } from '@/paths'
import { AuthIssuer } from '@/sections/auth/auth-issuer'
import { Issuer } from '@/utils/auth'

const useParams = (): { returnTo?: string } => {
  const searchParams = useSearchParams()
  const returnTo = searchParams.get('returnTo') || undefined

  return {
    returnTo,
  }
}

interface Values {
  email: string
  password: string
  submit: null
}

const initialValues: Values = {
  email: 'demo@devias.io',
  password: 'Password123!',
  submit: null,
}

const validationSchema = Yup.object({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: Yup.string().max(255).required('Password is required'),
})

const Page: NextPage = () => {
  const isMounted = useMounted()
  const router = useRouter()
  const { returnTo } = useParams()
  const { issuer, signIn } = useAuth<AuthContextType>()
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await signIn(values.email, values.password)

        if (isMounted()) {
          router.push('/payment')
        }
      } catch (err) {
        console.error(err)

        if (isMounted()) {
          helpers.setStatus({ success: false })
          helpers.setErrors({ submit: err.message })
          helpers.setSubmitting(false)
        }
      }
    },
  })

  usePageView()

  return (
    <>
      <Head>
        <title>Login | Champal for web</title>
      </Head>
      <div>
        <Card elevation={16}>
          <CardHeader
            subheader={<Typography color='text.secondary' variant='body2' />}
            sx={{ pb: 0 }}
            title='ログイン'
          />
          <CardContent>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  autoFocus
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label='メールアドレス'
                  name='email'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type='email'
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label='パスワード'
                  name='password'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type='password'
                  value={formik.values.password}
                />
              </Stack>
              {formik.errors.submit && (
                <FormHelperText error sx={{ mt: 3 }}>
                  {formik.errors.submit as string}
                </FormHelperText>
              )}
              <Button
                disabled={formik.isSubmitting}
                fullWidth
                size='large'
                sx={{ mt: 2 }}
                type='submit'
                variant='contained'
                color='warning'
              >
                ログイン
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

Page.getLayout = (page) => (
  <IssuerGuard issuer={Issuer.JWT}>
    <GuestGuard>
      <AuthLayout>{page}</AuthLayout>
    </GuestGuard>
  </IssuerGuard>
)

export default Page
