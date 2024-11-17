import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { rank, percentile, currentScore } = body;
        if (!rank || !percentile || !currentScore) {
            return NextResponse.json(
                { 
                    message: 'Missing required fields',
                    required: ['rank', 'percentile', 'currentScore']
                },
                { status: 400 }
            );
        }

        const db = await dbConnect();
        const updatedData = await db.collection('userdata').updateOne(
            { "user.skill.name": "Hyper Text Markup Language" },
            {
                $set: {
                    "user.skill.properties.quickstats.rank": parseInt(rank, 10),
                    "user.skill.properties.quickstats.percentile": parseInt(percentile, 10),
                    "user.skill.properties.quickstats.answers.correct": parseInt(currentScore, 10),
                },
            }
        );
        if (updatedData.modifiedCount > 0) {
            return NextResponse.json(
                { 
                    message: 'User data updated successfully',
                    updated: {
                        rank,
                        percentile,
                        currentScore
                    }
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { message: 'User data not found or no changes made' },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { 
                message: 'Error updating user data',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            },
            { status: 500 }
        );
    }
}