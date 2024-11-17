import React, {FC} from 'react';

interface ProgressProps {
    total: number
    correct : number
}

const ProgressChart: FC<ProgressProps> =  ({ total, correct }) => {
    const size = 200;
    const strokeWidth = 30;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    const percentage = (correct / total) * 100;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative flex justify-center items-center w-48 h-48">
            <svg
                className="w-full h-full transform -rotate-90"
                viewBox={`0 0 ${size} ${size}`}
            >
                <circle
                    className="fill-none stroke-gray-200"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                <circle
                    className="fill-none stroke-blue-500"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </svg>
            <p className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex-shrink-0 p-0 w-20 sm:w-12 aspect-square flex justify-center items-center rounded-full text-4xl sm:text-4xl'>🎯</p>
        </div>
    );
};

export default ProgressChart;
