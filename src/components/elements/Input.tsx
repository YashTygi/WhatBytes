import { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helper?: string;
    icon?: React.ReactNode;
    inputLabel?: string;
}

const Input: FC<InputProps> = ({
    label,
    error,
    helper,
    icon,
    inputLabel,
    ...props
}) => {
    return (
        <div className="mb-4">
            <div className="flex justify-between items-center  mb-2">
                <div className="w-full flex items-center gap-2">
                {icon && <div className="mr-2 text-blue-600">{icon}</div>}
                <label className="block text-lg font-medium text-gray-700">
                    {label} {inputLabel && <span className="w-64 font-bold text-black">{inputLabel}</span>}
                </label>
                </div>
                <input
                    className={`w-64 px-4 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-red-500 bg-red-50" : "border-gray-300"}`}
                    {...props}
                />
            </div>
            {(error || helper) && (
                <p className={`mt-1 text-sm ${error ? "text-red-500" : "text-gray-500"}`}>
                    {error || helper}
                </p>
            )}
        </div>
    );
};

export default Input