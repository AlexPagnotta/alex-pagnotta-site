import { useState } from 'preact/hooks'

type Props = {
  test?: string
}

function Slideshow({}: Props) {
  const [count, setCount] = useState(1)

  return (
    <div>
      <button onClick={() => setCount((count) => count + 1)}>Button</button>
      {count}
    </div>
  )
}

export default Slideshow
