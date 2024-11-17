import { FC } from 'react'

interface StatsItemProps {
    icon: string
    primaryTitle: string
    secondaryTitle: string
    lastChild?: boolean
}

const StatsItem: FC<StatsItemProps> = ({ 
    icon, 
    primaryTitle, 
    secondaryTitle, 
    lastChild = false 
}) => {
    return (
        <div className={`p-3 sm:p-4 lg:p-6 flex items-center gap-2 sm:gap-3 lg:gap-4 ${lastChild !== true ? 'lg:border-r-[1.5px] border-slate-200' : ''}`}>
            <div className='flex-shrink-0 bg-slate-200 p-2 w-10 sm:w-12 aspect-square flex justify-center items-center rounded-full text-xl sm:text-2xl'>
                {icon}
            </div>
            <div className='flex flex-col gap-0.5 sm:gap-1 min-w-0'>
                <span className='text-lg sm:text-xl font-bold truncate'>
                    {primaryTitle}
                </span>
                <span className='text-xs sm:text-sm text-gray-500 uppercase truncate'>
                    {secondaryTitle}
                </span>
            </div>
        </div>
    )
}

export default StatsItem