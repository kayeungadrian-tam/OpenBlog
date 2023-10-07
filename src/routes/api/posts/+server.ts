import type { RequestHandler } from "@sveltejs/kit";
import { error, redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request, response }) => {

    console.log("server side add post");
    console.log(request.body);

    return new Response(
        JSON.stringify({ message: 'ok' }),
    );

    // throw redirect(303, '/');
};


