import type { RequestHandler } from "@sveltejs/kit";
import { error, redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ url, locals: { supabase }, request, response }) => {

    const data = await request.json();
    const { post_id, user_id, score } = data;

    let { data: updateStatus, error } = await supabase
        .from('posts_score')
        .update({ score: score })
        .eq("post_id", post_id).eq("user_id", user_id)
        .select()

    console.log('updateStatus', updateStatus);
    console.log('error', error);

    if (error) {
        return error;
    }
    return new Response(
        JSON.stringify({ message: 'ok' }), { status: 200 }
    );

};


export const GET = async ({ url, locals: { supabase }, request, response }) => {

    console.log("Get viewed server side");

    const post_id = url.searchParams.get('post_id');

    let { data: posts_score, error } = await supabase
        .from('posts_score')
        .select()
        .eq("post_id", post_id)



    return new Response(
        JSON.stringify(posts_score?.length), { status: 200 }
    );
}