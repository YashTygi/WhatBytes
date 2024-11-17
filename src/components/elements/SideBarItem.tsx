'use client'
import React, { FC } from 'react'
import { useRouter } from 'next/navigation'

interface SideBarItemProps {
  title: string
  children: React.ReactNode
  redirect?: string
}

const SideBarItem: FC<SideBarItemProps> = ({ 
    children, 
    title, 
    redirect = '' 
}) => {
    const router = useRouter();

    const childrenArray = React.Children.toArray(children);
    if (childrenArray.length > 1) {
        throw new Error('Only one child is allowed');
    }

    const handleClick = () => {
        if (redirect.trim()) {
            router.push(`${redirect}`);
        }
    };

    return (
        <div 
            onClick={handleClick} 
            className='w-50 mr-8 md:mr-4 sm:mr-0 flex items-center justify-center md:justify-start gap-6 py-5 px-9 sm:px-4 sm:py-4 bg-transparent rounded-r-full transition-all ease-in-out hover:bg-slate-100 hover:cursor-pointer group'
        >
            <span className='text-black text-xl group-hover:text-blue-600 transition-colors'>
                {children}
            </span>
            <span className='hidden lg:inline-block text-black text-xl font-semibold group-hover:text-blue-600 transition-colors'>
                {title}
            </span>
        </div>    
    );
};

export default SideBarItem;
