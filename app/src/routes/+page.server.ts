export async function load({ locals: { supabase } }) {
    const apiData = await supabase.from("blog_posts").select().order('published_at', { ascending: false })


        ;
    const { data, error } = apiData;

    const topPosts = await supabase.from("blog_posts").select().limit(5);

    if (!data) throw error(404);

    return {
        postList: data?.map((post) => ({
            slug: post.slug,
            title: post.title,
            content: post.content,
            published_at: post.published_at,
        }))
        ,
        topPosts: topPosts.data
    };
}
