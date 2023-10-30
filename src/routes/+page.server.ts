import { AuthRetryableFetchError } from '@supabase/supabase-js';

export async function load({ locals: { supabase } }) {
    const apiData = await supabase.from("blog_posts").select().order('published_at', { ascending: false })


        ;
    const { data, error } = apiData;

    const topPosts = await supabase.from("blog_posts").select().limit(5);

    if (!data) throw error(404);


    const getAuthor = async (id: string) => {
        const { data, error } = await supabase.from("profiles").select().eq('id', id).single();
        if (error) throw error;
        return data;
    }




    return {
        posts: data?.map((post) => ({
            id: post.id,
            title: post.title,
            discription: post.description,
            content: post.content,
            published_at: post.published_at,
            author: post.author,
            tags: post.tags,
        }))
        ,
        topPosts: topPosts.data
    };
}
