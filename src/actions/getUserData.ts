'use server'

import dbConnect from '@/lib/db';
import mongoose from "mongoose";
import { cache } from 'react';
import { revalidatePath } from 'next/cache';

export const getUserData = cache(async () => {
    try {
        await dbConnect();
        const userData = await mongoose.connection.db?.collection('userdata').findOne({});
        const serializedData = JSON.parse(JSON.stringify(userData));
        return serializedData;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
});

export async function revalidateUserData() {
    'use server'
    revalidatePath('/'); 
}