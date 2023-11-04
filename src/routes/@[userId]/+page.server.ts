
export const load = async ({ params, locals: { supabase } }) => {


    console.log('params', params);



    // console.log('params', params);

    let { data: userPosts, error } = await supabase
        .from('blog_posts')
        .select(
            "id, title, description, content, published_at, author, tags, view_count",
        )
        .eq('author', params.userId)


    console.log('userPosts', userPosts);

    return {
        posts: userPosts,
        userId: params.userId
    }



};

