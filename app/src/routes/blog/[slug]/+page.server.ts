import { error } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export async function load({ params }) {

    const { data } = await supabase.from("blog_posts").select().eq("slug", params.slug);


    if (!data) throw error(404);


    return {
        data
    };
}