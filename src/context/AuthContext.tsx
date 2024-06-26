// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import { signin } from 'src/services/login'
import axios from 'axios'
import configValues from 'src/configs/configValues'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

const { API: { EXPOAPI } } = configValues;

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(
    defaultProvider.user !== undefined ? defaultProvider.user : null
  );
  const [loading, setLoading] = useState<boolean>(false)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem("accessToken")!
      if (storedToken) {
        const userDataString = window.localStorage.getItem('userData')
        let userData: UserDataType = {}

        if (userDataString !== null)
          userData = JSON.parse(userDataString) as UserDataType

        const filter: any = {};
        filter.where = {
          or: [
            userData && userData.id ? { id: userData.id } : {}
          ],
        };

        await axios
          .get(`${EXPOAPI.url}/people`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${storedToken}`
            },
            params: {
              offset: 0,
              limit: 100,
              skip: 0,
              filter: filter
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data.userData })
          })
          .catch((e: any) => {
            console.log(e)
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   const initAuth = async (): Promise<void> => {
  //     const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
  //     if (storedToken) {
  //       setLoading(true)
  //       await axios
  //         .get(authConfig.meEndpoint, {
  //           headers: {
  //             Authorization: storedToken
  //           }
  //         })
  //         .then(async response => {
  //           setLoading(false)
  //           setUser({ ...response.data.userData })
  //         })
  //         .catch(() => {
  //           localStorage.removeItem('userData')
  //           localStorage.removeItem('refreshToken')
  //           localStorage.removeItem('accessToken')
  //           setUser(null)
  //           setLoading(false)
  //           if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
  //             router.replace('/login')
  //           }
  //         })
  //     } else {
  //       setLoading(false)
  //     }
  //   }

  //   initAuth()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    signin(params.email, params.password)
      .then(async response => {
        params.rememberMe
          ? window.localStorage.setItem("accessToken", response.data.token ? response.data.token : "")
          : null
        const returnUrl = router.query.returnUrl
        const user = response.data.people && response.data.people.length > 0
          ? response.data.people[0]
          : null;

        setUser({ ...user })
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(user)) : null

        if (response.data.email)
          window.localStorage.setItem("email", response.data.email)

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
