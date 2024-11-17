'use client'
import { useState } from 'react'
import Button from '../elements/Button'
import HTML from '@/assets/HTML'
import Container from '../elements/Container'
import Modal from '../elements/Modal'
import Form from '../Form/form'


const SkillSubject = ({ }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Container>
            <div className='flex justify-between items-center gap-8'>
                <div className='flex items-center gap-4'>
                    <HTML width={45.34} height={80} />
                    <div className='flex flex-col gap-2'>
                        <div className='text-xl font-bold'>Hyper Text Markup Language</div>
                        <div className='text-base text-gray-500'>
                            <span className='mr-2'>Questions: 08 |</span>
                            <span className='mr-2'>Duration: 15 mins |</span>
                            <span>Submitted on 5 June 2021</span>

                        </div>
                    </div>
                </div>
                <Button color='primary' title='Update' onClick={() => setIsOpen(!isOpen)} />
            </div>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(!isOpen)}
                onExecute={() => {alert("working")}}
                title='Update Scores'
                primaryButtonText='Save'
                secondaryButtonText='Cancel'
                icon={<HTML width={22.67} height={32} />}
            >
                <Form ModalClose={() => setIsOpen(false)} />
            </Modal>
        </Container>
    )
}

export default SkillSubject