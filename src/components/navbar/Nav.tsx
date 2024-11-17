import Image from 'next/image'
import { FC } from 'react'
import Logo from '../../assets/Logo.png'
import Avatar from '../../assets/Avatar.png'
import Divider from '../elements/Divider'
import { getUserData } from '@/actions/getUserData'

interface NavProps { }


const Nav: FC<NavProps> = async () => {

    const userData = await getUserData();
    const username = userData?.user?.username || 'User';

    return (
            <div className='p-4 md:p-8 flex justify-between items-center w-screen border-b-[1.5px] border-slate-200'>
                <div className='relative w-32 md:w-60'>
                    <Image
                        src={Logo}
                        alt='Logo'
                        className='object-contain'
                        width={238.05}
                        height={40}
                        priority
                    />
                </div>

                <div className='flex items-center gap-2 border-2 border-black rounded-lg p-1.5 md:p-2'>
                    <div className='relative w-6 h-6 md:w-7 md:h-7'>
                        <Image
                            src={Avatar}
                            alt='Avatar'
                            className='object-cover'
                            fill
                        />
                    </div>
                    <p className='text-sm md:text-base font-bold hidden sm:block'>
                        {username}
                    </p>
                </div>
            </div>
    )
}

export default Nav