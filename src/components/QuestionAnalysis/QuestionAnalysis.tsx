'use client';

import { useEffect, useState } from 'react';
import Container from '../elements/Container';
import ProgressChart from '../Graph/PieChart';
import { getUserData } from '@/actions/getUserData';


interface AnalysisData {
    total: string;
    correct: string;
}

const QuestionAnalysis = () => {
    const [stats, setStats] = useState<AnalysisData>({
        total: '15',
        correct: '0',
    });

    const fetchAndUpdateStats = async () => {
        try {
            const userData = await getUserData();
            if (userData) {
                setStats({
                    total: userData.user?.skill?.properties?.quickstats?.answers?.total?.toString() || '15',
                    correct: userData.user?.skill?.properties?.quickstats?.answers?.correct?.toString() || '0',
                });
            }
        } catch (error) {
            console.error('Error fetching analysis data:', error);
        }
    };

    const getMessage = (correct: number, total: number) => {
        if (total === 0) {
            return "No questions attempted yet. Start answering to see your progress!";
        }

        const percentage = (correct / total) * 100;

        if (percentage >= 80) {
            return `Excellent! You answered ${correct} questions correctly out of ${total}. Keep up the great work!`;
        } else if (percentage >= 50) {
            return `Good job! You scored ${correct} correct answers out of ${total}. You're on the right track!`;
        } else {
            return `You scored ${correct} correct answers out of ${total}. Keep practicing to improve your performance.`;
        }
    };

    useEffect(() => {
        fetchAndUpdateStats();

        const handleStatsUpdate = (event: CustomEvent<{ currentScore: string }>) => {
            const newStats = event.detail;
            setStats((prevStats) => ({
                ...prevStats,
                correct: newStats.currentScore,
            }));
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.addEventListener('statsUpdated' as any, handleStatsUpdate);

        return () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window.removeEventListener('statsUpdated' as any, handleStatsUpdate);
        };
    }, []);

    const correctAnswers = Number(stats.correct);
    const totalQuestions = Number(stats.total);

    return (
        <Container>
            <div className="w-full flex flex-col justify-between items-center gap-8">
                <div className="w-full flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-bold">Question Analysis</p>
                        <p className="text-lg font-bold text-blue-600">{`${stats.correct} / ${stats.total}`}</p>
                    </div>
                    <p className="w-[80%] text-base text-gray-500">
                        {getMessage(correctAnswers, totalQuestions)}
                    </p>
                </div>
                <ProgressChart total={totalQuestions} correct={correctAnswers} />
            </div>
        </Container>
    );
};

export default QuestionAnalysis;
