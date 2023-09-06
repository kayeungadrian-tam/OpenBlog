// import { supabase } from '../../lib/supabaseClient';
import { error } from '@sveltejs/kit';


export async function load({ locals: { supabase } }) {
    const apiData = await supabase.from("blog_posts").select();
    const { data, error } = apiData;

    const topPosts = await supabase.from("blog_posts").select().limit(5);

    if (!data) throw error(404);

    return {
        postList: data?.map((post) => ({
            slug: post.slug,
            title: post.title,
            content: post.content,
        })),
        topPosts: topPosts.data
    };
}
