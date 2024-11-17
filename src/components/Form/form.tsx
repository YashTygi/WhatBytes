import { FC, useState } from 'react';
import axios from 'axios';
import Input from '../elements/Input';
import { revalidateUserData } from '@/actions/getUserData';

interface FormProps {
    ModalClose: () => void
}

const Form: FC<FormProps> = ({ModalClose}) => {
    const [formData, setFormData] = useState({
        rank: '',
        percentile: '',
        currentScore: '',
    });

    const [status, setStatus] = useState<{
        loading: boolean;
        error?: string;
        success?: string;
    }>({
        loading: false
    });

    const [errors, setErrors] = useState({
        rank: '',
        percentile: '',
        currentScore: '',
    });

    const validateRank = (value: string) => {
        if (!value) return 'Rank is required';
        if (isNaN(Number(value))) return 'Rank must be a number';
        if (Number(value) < 1) return 'Rank must be positive';
        return '';
    };

    const validatePercentile = (value: string) => {
        if (!value) return 'Percentile is required';
        const num = Number(value);
        if (isNaN(num)) return 'Percentile must be a number';
        if (num < 0 || num > 100) return 'Percentile must be between 0 and 100';
        return '';
    };

    const validateScore = (value: string) => {
        if (!value) return 'Score is required';
        const num = Number(value);
        if (isNaN(num)) return 'Score must be a number';
        if (num < 0 || num > 15) return 'Score must be between 0 and 15';
        return '';
    };

    const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));

        let error = '';
        switch (field) {
            case 'rank':
                error = validateRank(value);
                break;
            case 'percentile':
                error = validatePercentile(value);
                break;
            case 'currentScore':
                error = validateScore(value);
                break;
        }
        setErrors((prev) => ({ ...prev, [field]: error }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const newErrors = {
            rank: validateRank(formData.rank),
            percentile: validatePercentile(formData.percentile),
            currentScore: validateScore(formData.currentScore),
        };
    
        setErrors(newErrors);
    
        if (!Object.values(newErrors).some((error) => error)) {
            setStatus({ loading: true });
            try {
                const response = await axios.post('/api/updateUserData', formData);
                
                const customEvent = new CustomEvent('statsUpdated', {
                    detail: {
                        rank: formData.rank,
                        percentile: formData.percentile,
                        currentScore: formData.currentScore
                    }
                });
                window.dispatchEvent(customEvent);
    

                await revalidateUserData();
                
                setStatus({
                    loading: false,
                    success: response.data.message
                });
                setFormData({ rank: '', percentile: '', currentScore: '' });
                
                ModalClose();
            } catch (error: any) {
                setStatus({
                    loading: false,
                    error: error.response?.data?.message || 'Error updating user data'
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div>
            <Input
                label="Update your"
                inputLabel="Rank"
                type="number"
                value={formData.rank}
                onChange={handleChange('rank')}
                error={errors.rank}
                placeholder="Enter your rank"
                disabled={status.loading}
            />

            <Input
                label="Update your"
                inputLabel="Percentile"
                type="number"
                value={formData.percentile}
                onChange={handleChange('percentile')}
                error={errors.percentile}
                placeholder="Enter your percentile"
                disabled={status.loading}
            />

            <Input
                label="Update your"
                inputLabel="Current Score (Out of 15)"
                type="number"
                value={formData.currentScore}
                onChange={handleChange('currentScore')}
                error={errors.currentScore}
                placeholder="Enter your current score"
                disabled={status.loading}
            />

            {status.error && (
                <div className="text-red-500 text-sm mt-2">
                    {status.error}
                </div>
            )}
            </div>
            <div className='flex justify-end gap-4 mt-8'>
            <button 
                type="submit" 
                className={`py-3 px-7 text-lg font-semibold rounded-lg transition-all duration-200 disabled:cursor-not-allowed w-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 ${status.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={status.loading}
            >
                {status.loading ? 'Updating...' : 'Submit'}
            </button>

            <button 
                onClick={ModalClose}
                className={`py-3 px-7 text-lg font-semibold rounded-lg transition-all duration-200 disabled:cursor-not-allowed w-full bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 disabled:border-blue-300 disabled:text-blue-300 ${status.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={status.loading}
            >
                Cancel
            </button>
            </div>
            
        </form>
    );
};

export default Form;