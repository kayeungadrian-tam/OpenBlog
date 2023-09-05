// import { supabase } from '../../lib/supabaseClient';
import { error } from '@sveltejs/kit';


export async function load({ locals: { supabase } }) {
    const apiData = await supabase.from("blog_posts").select();
    console.log(apiData);
    const { data, error } = apiData;

    if (!data) throw error(404);

    return {
        postList: data?.map((post) => ({
            slug: post.slug,
            title: post.title
        }))
    };
}
