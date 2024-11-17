'use client'
import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    ReferenceLine,
    Tooltip,
    ResponsiveContainer,
    TooltipProps
} from 'recharts';

// interface PercentileProps {
//     userPercentile?: number | string
// }

// interface CustomTooltipProps extends TooltipProps<number, string> {
//     active: boolean;
//     payload: Array<{ value: number }>;
//     label: string;
// }

export default function PercentileChart() {
    const data = [
        { percentile: 0, numOfStudents: 10 },
        { percentile: 10, numOfStudents: 15 },
        { percentile: 20, numOfStudents: 25 },
        { percentile: 25, numOfStudents: 35 },
        { percentile: 30, numOfStudents: 45 },
        { percentile: 35, numOfStudents: 55 },
        { percentile: 40, numOfStudents: 65 },
        { percentile: 45, numOfStudents: 75 },
        { percentile: 50, numOfStudents: 100 },
        { percentile: 60, numOfStudents: 80 },
        { percentile: 70, numOfStudents: 40 },
        { percentile: 75, numOfStudents: 30 },
        { percentile: 80, numOfStudents: 20 },
        { percentile: 90, numOfStudents: 15 },
        { percentile: 95, numOfStudents: 12 },
        { percentile: 100, numOfStudents: 10 }
    ];

    const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border border-gray-200 shadow-lg rounded">
                    <p className="text-gray-700">Percentile: {label}</p>
                    <p className="text-indigo-600">Number of Students: {payload[0].value}</p>
                    {label === '75' && (
                        <p className="text-green-600 font-semibold">Your Score!</p>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-64 bg-white">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 30,
                        right: 30,
                        left: 30,
                        bottom: 30,
                    }}
                >
                    <XAxis
                        dataKey="percentile"
                        tickLine={false}
                        axisLine={{ stroke: '#666' }}
                        ticks={[0, 25, 50, 75, 100]}
                        tick={{ fill: '#666', fontSize: 14 }}
                    />

                    <Line
                        type="monotone"
                        dataKey="numOfStudents"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={{ r: 3, fill: '#8884d8' }}
                        isAnimationActive={true}
                    />

                    <ReferenceLine
                        x={75}
                        stroke="#8884d8"
                        strokeDasharray="3 3"
                        label={{
                            value: "Your Percentile",
                            position: "top",
                            fill: "#8884d8",
                            fontSize: 14
                        }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                </LineChart>
            </ResponsiveContainer>
            
        </div>
    );
}