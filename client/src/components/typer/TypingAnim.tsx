
import {TypeAnimation} from 'react-type-animation'

export default function TypingAnim() {
  return (
    <TypeAnimation
  sequence={[
    // Same substring at the start will only be typed once, initially
    'Chat with your own AI',
    1000,
    'This App built with OpenAI 🤖',
    2000,
    'Your own ChatGPT 🎉 ',
    1500,
  ]}
  speed={50}
  style={{ fontSize: '55px' , color: 'white', display: 'inline-block' , textShadow: '1px 1px 20px #000'}}
  repeat={Infinity}
/>
  )
}
