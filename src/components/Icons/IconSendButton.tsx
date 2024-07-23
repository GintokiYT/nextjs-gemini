type Props = {
  size?: number
}

export default function IconSendButton(
  { 
    size = 18 
  }: Props
) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z" fill="currentColor"/>
      <path d="M10.0003 5.33207L10.0003 14.6689" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.25 9.09766L9.99969 5.33178L13.75 9.09766" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}