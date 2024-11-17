import { FC } from 'react'

interface ButtonProps {
  color: 'primary' | 'secondary'
  title: string
  className?: string
  onClick?: () => void
  disabled?: boolean
}

const Button: FC<ButtonProps> = ({
    color, 
    title, 
    className = 'py-3 px-7 text-lg font-semibold bg-blue-600 text-white rounded-lg disabled:cursor-not-allowed disabled:bg-gray-400',
    onClick,
    disabled = false
}) => {
  return (
      <button onClick={onClick} disabled={disabled} style={{ backgroundColor: color === 'primary' ? '#2563eb' : '#fff', border: "2px solid #2563eb", color : color === 'primary' ? '#fff' : '#2563eb' }} type='submit' title={title} className={` ${className}`}>
          {title}
      </button>
  )
}

export default Button