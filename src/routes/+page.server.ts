import { AuthRetryableFetchError } from '@supabase/supabase-js';

export async function load({ locals: { supabase } }) {
    const apiData = await supabase.from("blog_posts").select().order('published_at', { ascending: false })


        ;
    const { data, error } = apiData;

    const topPosts = await supabase.from("blog_posts").select().limit(5);

    if (!data) throw error(404);


    async function getAuthor(id: any) {
        const { data, error } = await supabase.from("profiles").select().eq('id', id).single();
        if (error) throw error;

        // const res = await data.json();
        console.log('data', data);


        return { name: data.display_name, avatar_url: data.avatar_url }

    };




    // console.log('data', data);
    // data.map(post => {
    //     post.title = "adrian";
    //     const name = await getAuthor(post.author);
    //     // console.log('post', post);
    //     post.author = "await getAuthor(post.author)"
    // })


    for (const post of data) {
        const { name, avatar_url } = await getAuthor(post.author);
        post.author = name;
        post.avatar_url = avatar_url
    }


    return {
        posts: data,
        topPosts: topPosts.data
    };
}
