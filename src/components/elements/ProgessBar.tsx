import { FC } from 'react'

interface ProgessBarProps {
    title: string
    percentage: number
    primaryColor: string
    accentColor: string
}

const ProgessBar: FC<ProgessBarProps> = ({ title, percentage, primaryColor, accentColor }) => {
    return (
        <div className='flex flex-col gap-1'>
            <p className='text-lg font-medium text-gray-700'>{title}</p>
            <div className='flex justify-between items-center gap-8'>
                <div className='relative w-full h-2 rounded-full'>
                    <div className={`absolute top-0 left-0 h-full rounded-full`} style={{ width: `${percentage}%`, backgroundColor: primaryColor }}></div>
                    <div className={`absolute top-0 right-0 h-full rounded-full`} style={{ width: `${100 - percentage}%`, backgroundColor: accentColor }}></div>
                </div>
                <p className='text-base font-semibold' style={{ color: primaryColor }}>{percentage}%</p>
            </div>
        </div>

    )
}

export default ProgessBar