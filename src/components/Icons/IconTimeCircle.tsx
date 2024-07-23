type Props = {
  size?: number
}

export default function IconTimeCircle(
  { 
    size = 18 
  }: Props
) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M15.9375 9C15.9375 12.831 12.8318 15.9375 9 15.9375C5.169 15.9375 2.0625 12.831 2.0625 9C2.0625 5.16825 5.169 2.0625 9 2.0625C12.8318 2.0625 15.9375 5.16825 15.9375 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.1436 9.57552L8.74609 9.52002V5.88477" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}