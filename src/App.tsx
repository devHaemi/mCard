import './App.css'

import Button from '@/components/shared/Button'
import Text from '@/components/shared/Text'

function App() {
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
    </>
  )
}

export default App
