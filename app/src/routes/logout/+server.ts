import type { RequestHandler } from "@sveltejs/kit";
import { error, redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals }) => {
    const { error: authError } = await locals.supabase.auth.signOut();

    if (authError) {
        const errorResponse = error(500, 'Server error. Try again later.');
        throw errorResponse;
    }

    throw redirect(303, '/');
};