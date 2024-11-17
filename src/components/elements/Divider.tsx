import { FC } from 'react'

interface DividerProps {
  color?: string
  width?: number
  orientation?: 'horizontal' | 'vertical'
}

const Divider: FC<DividerProps> = ({ 
    color = '#E5E7EB',
    width = 1,
    orientation = 'horizontal'
}) => {
  return <hr 
  className={`w-full border-0`}
  style={{
    backgroundColor: color,
    height: `${width}px`,
    transform: orientation === 'vertical' ? 'rotate(90deg)' : 'none'
  }}
/>
}

export default Divider