import {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { createPortal } from 'react-dom'

import Alert from '@shared/Alert'

type AlertProps = ComponentProps<typeof Alert>
type AlertOptions = Omit<AlertProps, 'open'>
interface AlertContextValue {
  open: (options: AlertOptions) => void
}

const Context = createContext<AlertContextValue | undefined>(undefined)

const defaultValues: AlertProps = {
  open: false,
  title: null,
  description: null,
  onButtonClick: () => {},
}

export function AlertContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [alertValues, setAlertValues] = useState(defaultValues)

  const $root_portal = document.getElementById('root-portal')

  const close = useCallback(() => {
    setAlertValues(defaultValues)
  }, [])

  const open = useCallback(
    ({ onButtonClick, ...options }: AlertOptions) => {
      setAlertValues({
        ...options,
        onButtonClick: () => {
          close()
          onButtonClick()
        },
        open: true,
      })
    },
    [close],
  )

  const values = useMemo(() => ({ open }), [open])

  return (
    <Context.Provider value={values}>
      {children}
      {$root_portal != null
        ? createPortal(<Alert {...alertValues} />, $root_portal)
        : null}
    </Context.Provider>
  )
}

export function useAlertContext() {
  const values = useContext(Context)

  if (values == null) {
    throw new Error('AlertContext 내부에서 사용해주세요')
  }

  return values
}
