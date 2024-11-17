import React, { useEffect } from 'react';
import Button from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onExecute: () => void;
    title: string;
    icon: React.ReactNode;
    primaryButtonText: string;
    secondaryButtonText: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onExecute,
    title,
    icon,
    children,
    primaryButtonText,
    secondaryButtonText,

}) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full m-8">
                <div className='flex justify-between items-center'>
                    <h2 id="modal-title" className="text-2xl font-bold mb-8">{title}</h2>
                    <div className='mb-8'>
                        {icon}
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;