import { MouseEvent } from 'react'
import { useCallback, useState } from 'react'

import Agreement from '@shared/Agreement'
import FixedBottomButton from '@shared/FixedBottomButton'
import { 약관목록 } from '@/constants/apply'
import { ApplyValues } from '@/models/apply'

function Terms({ onNext }: { onNext: (terms: ApplyValues['terms']) => void }) {
  const [termsAgreements, setTermsAgreements] = useState(() => {
    return 약관목록.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    )
  })

  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgreements((prevTerms) => {
        return Object.keys(prevTerms).reduce(
          (prev, key) => ({
            ...prev,
            [key]: checked,
          }),
          {},
        )
      })
    },
    [],
  )

  const allAgreed = Object.values(termsAgreements).every((agree) => agree)

  return (
    <div>
      <Agreement>
        <Agreement.Title
          checked={allAgreed}
          onChange={(e, checked) => {
            handleAllAgreement(e, checked)
          }}
        >
          약관에 모두 동의
        </Agreement.Title>
        {약관목록.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgreements[id]}
            onChange={(_, checked) => {
              setTermsAgreements((prevTerms) => ({
                ...prevTerms,
                [id]: checked,
              }))
            }}
          >
            {title}
          </Agreement.Description>
        ))}

        <FixedBottomButton
          label="약관동의"
          disabled={allAgreed === false}
          onClick={() => {
            onNext(Object.keys(termsAgreements))
          }}
        />
      </Agreement>
    </div>
  )
}

export default Terms
