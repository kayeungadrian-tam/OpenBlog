

import { supabase } from '../../lib/supabaseClient';

export async function load() {

    const { data } = await supabase.from("blog_posts").select();


    return {
        summaries: data.map((post) => ({
            slug: post.slug,
            title: post.title
        }))
    };
}