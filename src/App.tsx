import './App.css'

import Button from '@/components/shared/Button'
import Text from '@/components/shared/Text'
import TextField from '@/components/shared/TextField'
import { useAlertContext } from '@/contexts/AlertContext'

function App() {
  const { open } = useAlertContext()

  return (
    <>
      <Text display="block" typography="t1" color="red">
        t1
      </Text>
      <Text display="block" typography="t2" color="blue">
        t2
      </Text>
      <Text display="block" typography="t3">
        t3
      </Text>
      <Text display="block" typography="t4">
        t4
      </Text>
      <Text display="block" typography="t5">
        t5
      </Text>

      <Button>button</Button>
      <Button weak>button</Button>
      <Button color="success">button</Button>
      <Button color="success" weak>
        button
      </Button>
      <Button color="error">button</Button>
      <Button color="error" weak>
        button
      </Button>
      <Button full>button</Button>
      <Button full disabled>
        button
      </Button>

      <TextField label="아이디" />
      <TextField
        label="비밀번호"
        hasError={true}
        helpMessage="비밀번호가 맞지 않습니다."
      />

      <Button
        onClick={() => {
          open({
            title: '카드신청완료',
            description: '내역페이지에서 확인하세요.',
            onButtonClick: () => {
              //
            },
          })
        }}
      >
        Alert Open
      </Button>
    </>
  )
}

export default App
