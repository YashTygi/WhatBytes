'use server'

import dbConnect from '@/lib/db';
import mongoose from "mongoose";
import { cache } from 'react';
import { revalidatePath } from 'next/cache';

export const getUserData = cache(async () => {
    try {
        await dbConnect();
        
        // Perform the database query to fetch user data
        const userData = await mongoose.connection.db?.collection('userdata').findOne({});
        
        // Check if userData is null and handle it
        if (!userData) {
            console.error('No user data found.');
            return {};  // Return an empty object or default data
        }

        // Serialize the data to avoid issues with circular references
        const serializedData = JSON.parse(JSON.stringify(userData));
        return serializedData;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw new Error('Failed to fetch user data'); // Return a more descriptive error
    }
});

export async function revalidateUserData() {
    'use server'
    revalidatePath('/'); 
}
