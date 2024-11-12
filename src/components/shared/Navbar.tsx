import { css } from '@emotion/react'
import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '@/remote/firebase'

import Flex from '@shared/Flex'
import Button from '@shared/Button'
import { colors } from '@/styles/colorPalette'
import useUser from '@/hooks/auth/useUser'

function Navbar() {
  const location = useLocation()
  const showSignButton =
    ['/signup', '/signin'].includes(location.pathname) === false

  const user = useUser()

  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [])

  const renderButton = useCallback(() => {
    if (user != null) {
      return <Button onClick={handleLogout}>로그아웃</Button>
    }

    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [showSignButton, user, handleLogout])

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">홈</Link>
      {renderButton()}
    </Flex>
  )
}

const navbarContainerStyles = css`
  z-index: 10;
  position: sticky;
  top: 0;
  padding: 10px 24px;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.gray};
`

export default Navbar
