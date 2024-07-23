type Props = {
  size?: number
}

export default function IconCloseCenter(
  { 
    size = 18 
  }: Props
) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.75 3.75L14.25 14.25" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
      <path d="M3.75 14.25L14.25 3.75" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
    </svg>
  )
}