import { FC } from 'react'

interface ContainerProps {
  children: React.ReactNode
}

const Container: FC<ContainerProps> = ({ children }) => {
  return <div className='w-full py-4 px-6 border-[1.5px] border-slate-200 rounded-lg'> {children} </div>
}

export default Container