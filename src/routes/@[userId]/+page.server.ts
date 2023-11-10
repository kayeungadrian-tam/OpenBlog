
export const load = async ({ params, locals: { supabase } }) => {


    console.log('params', params);

    const getUserProfile = async (userId: string) => {


        let { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select(
                "id, display_name, avatar_url"
            )
            .eq("id", params.userId);

        console.log('profile', profile);
    }





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
        userId: params.userId,
        profile: await getUserProfile(params.userId)
    }



};

