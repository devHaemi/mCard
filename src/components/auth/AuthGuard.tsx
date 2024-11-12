import { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useSetRecoilState } from 'recoil'

import { auth } from '@/remote/firebase'
import { userAtom } from '@/atoms/user'

// 인증처리
function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
      })
    } else {
      setUser(null)
    }

    setInitialize(true)
  })

  if (initialize === false) {
    return null
  }

  return <>{children}</>
}

export default AuthGuard
