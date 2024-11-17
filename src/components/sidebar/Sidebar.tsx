import { FC } from 'react'
import SideBarItem from '../elements/SideBarItem'
import { FaChartSimple } from "react-icons/fa6";
import { TfiMedallAlt } from "react-icons/tfi";
import { IoDocumentOutline } from "react-icons/io5";

interface SidebarProps {
  
}

const Sidebar: FC<SidebarProps> = ({}) => {
  return (
    <div className='w-1/6 min-h-screen py-16  border-r-[1.5px] border-slate-200'>
        <SideBarItem title='Dashboard' redirect='/dashboard'><FaChartSimple /></SideBarItem>
        <SideBarItem title='Skill Test' redirect='/'><TfiMedallAlt /></SideBarItem>
        <SideBarItem title='Internship' redirect='/internship'><IoDocumentOutline /></SideBarItem>
    </div>
  )
}

export default Sidebar