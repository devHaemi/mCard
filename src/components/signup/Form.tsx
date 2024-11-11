import { css } from '@emotion/react'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import validator from 'validator'

import Flex from '@/components/shared/Flex'
import TextField from '@/components/shared/TextField'
import FixedBottomButton from '@/components/shared/FixedBottomButton'
import Spacing from '@/components/shared/Spacing'

import { FormValues } from '@/models/signup'

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  })

  const [dirty, setDirty] = useState<Partial<FormValues>>({})

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prevDirty) => ({
      ...prevDirty,
      [e.target.name]: 'true',
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])

  const 제출가능한상태인가 = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="placeholder"
        value={formValues.email}
        onChange={handleFormValues}
        onBlur={handleBlur}
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        helpMessage={Boolean(dirty.email) ? errors.email : ''}
      />
      <Spacing />
      <TextField
        label="패스워드"
        name="password"
        placeholder="placeholder"
        value={formValues.password}
        onChange={handleFormValues}
        onBlur={handleBlur}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={Boolean(dirty.password) ? errors.password : ''}
      />
      <Spacing />
      <TextField
        label="패스워드 재확인"
        name="rePassword"
        placeholder="placeholder"
        value={formValues.rePassword}
        onChange={handleFormValues}
        onBlur={handleBlur}
        hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)}
        helpMessage={Boolean(dirty.rePassword) ? errors.rePassword : ''}
      />
      <Spacing />
      <TextField
        label="이름"
        name="name"
        placeholder="placeholder"
        value={formValues.name}
        onChange={handleFormValues}
        onBlur={handleBlur}
        hasError={Boolean(dirty.name) && Boolean(errors.name)}
        helpMessage={Boolean(dirty.name) ? errors.name : ''}
      />

      <FixedBottomButton
        label="회원가입"
        onClick={() => {
          onSubmit(formValues)
        }}
        disabled={제출가능한상태인가 === false}
      />
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`

function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호 8글자 이상 입력해주세요'
  }

  if (formValues.rePassword.length < 8) {
    errors.rePassword = '비밀번호를 8글자 이상 입력해주세요'
  } else if (
    validator.equals(formValues.rePassword, formValues.password) === false
  ) {
    errors.rePassword = '비밀번호를 확인해주세요'
  }

  if (formValues.name.length < 2) {
    errors.name = '이름은 2글자 이상 입력해주세요'
  }

  return errors
}

export default Form
