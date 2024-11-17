'use client';

import { FC, useEffect, useState } from 'react';
import StatsItem from '../elements/StatsItem';
import Container from '../elements/Container';
import { getUserData } from '@/actions/getUserData';

interface StatsData {
    rank: string;
    percentile: string;
    total: string;
    currentScore: string;
}

const QuickStats: FC = () => {
    const [stats, setStats] = useState<StatsData>({
        rank: '1',
        percentile: '0',
        total: '15',
        currentScore: '0'
    });

    const fetchAndUpdateStats = async () => {
        try {
            const userData = await getUserData();
            if (userData) {
                setStats({
                    rank: userData.user?.skill?.properties?.quickstats?.rank?.toString() || '1',
                    percentile: userData.user?.skill?.properties?.quickstats?.percentile?.toString() || '0',
                    total: '15',
                    currentScore: userData.user?.skill?.properties?.quickstats?.answers?.correct?.toString() || '0'
                });
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    useEffect(() => {
        fetchAndUpdateStats();
        
        const handleStatsUpdate = (event: CustomEvent<StatsData>) => {
            const newStats = event.detail;
            setStats(prevStats => ({
                ...prevStats,
                rank: newStats.rank.toString(),
                percentile: newStats.percentile.toString(),
                currentScore: newStats.currentScore.toString()
            }));
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.addEventListener('statsUpdated' as any, handleStatsUpdate);
        
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window.removeEventListener('statsUpdated' as any, handleStatsUpdate);
        };
    }, []);

    return (
        <Container>
            <div>
                <p className="text-xl font-bold mb-4">Quick Statistics</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-2">
                    <StatsItem icon="🏆" primaryTitle={stats.rank} secondaryTitle="Your Rank" />
                    <StatsItem icon="📋" primaryTitle={`${stats.percentile}%`} secondaryTitle="Percentile" />
                    <StatsItem icon="✅" primaryTitle={`${stats.currentScore} / ${stats.total}`} secondaryTitle="Correct Answers" lastChild />
                </div>
            </div>
        </Container>
    );
};

export default QuickStats;