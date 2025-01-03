'use client';

import { useEffect, useState } from 'react';
import PercentileChart from '../Graph/LineGraph';
import Container from '../elements/Container';
import { getUserData } from '@/actions/getUserData';

interface StatsData {
    percentile: string;
}

const ComparisonGraph = () => {
    const [stats, setStats] = useState<StatsData>({
        percentile: '0',
    });

    const fetchAndUpdateStats = async () => {
        try {
            const userData = await getUserData();
            if (userData) {
                setStats({
                    percentile: userData.user?.skill?.properties?.quickstats?.percentile?.toString() || '0',
                });
            }
        } catch (error) {
            console.error('Error fetching comparison data:', error);
        }
    };

    const getMessage = (percentile: number) => {
        const averagePercentile = 72;
        if (percentile > averagePercentile) {
            return `which is higher than the average percentile of ${averagePercentile}% of all the engineers who took this assessment. Great job!`;
        } else if (percentile < averagePercentile) {
            return `which is lower than the average percentile of ${averagePercentile}% of all the engineers who took this assessment. Keep improving!`;
        } else {
            return `which is equal to the average percentile of ${averagePercentile}% of all the engineers who took this assessment.`;
        }
    };

    useEffect(() => {
        fetchAndUpdateStats();

        const handleStatsUpdate = (event: CustomEvent<{ percentile: string }>) => {
            const newStats = event.detail;
            setStats((prevStats) => ({
                ...prevStats,
                percentile: newStats.percentile,
            }));
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.addEventListener('statsUpdated' as any, handleStatsUpdate);

        return () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window.removeEventListener('statsUpdated' as any, handleStatsUpdate);
        };
    }, []);

    const userPercentile = parseFloat(stats.percentile);

    return (
        <Container>
            <div className="flex justify-between items-center gap-8">
                <div className="flex flex-col gap-4">
                    <p className="text-xl font-bold">Comparison Graph</p>
                    <p className="text-base text-gray-500">
                        <span className="font-semibold mr-1">You scored {userPercentile}% percentile,</span>
                        {getMessage(userPercentile)}
                    </p>
                </div>
                <div className="bg-slate-200 p-4 w-16 aspect-square flex justify-center items-center h-16 rounded-[100%] text-2xl">
                    📈
                </div>
            </div>
            <PercentileChart userPercentile={userPercentile} />
        </Container>
    );
};

export default ComparisonGraph;