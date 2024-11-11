import { css } from '@emotion/react'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator'

import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import TextField from '@/components/shared/TextField'
import Button from '@/components/shared/Button'
import Text from '@/components/shared/Text'

import { FormValues } from '@/models/signin'
import { colors } from '@/styles/colorPalette'

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const handleOnBlur = useCallback(() => {}, [])

  const errors = useMemo(() => validate(formValues), [formValues])

  const 제출가능한가 = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="email"
        name="email"
        placeholder="placeholder"
        value={formValues.email}
        onChange={handleFormValues}
        onBlur={handleOnBlur}
      />
      <Spacing size={16} />
      <TextField
        label="password"
        name="password"
        placeholder="placeholder"
        value={formValues.password}
        onChange={handleFormValues}
        onBlur={handleOnBlur}
      />
      <Spacing size={32} />

      <Button
        size="medium"
        onClick={() => onSubmit(formValues)}
        disabled={제출가능한가 === false}
      >
        로그인
      </Button>
      <Spacing size={12} />

      <Link to="/signup" css={linkStyles}>
        <Text typography="t7">아직 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`
const linkStyles = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
`

function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호 8글자 이상 입력해주세요'
  }

  return errors
}

export default Form
