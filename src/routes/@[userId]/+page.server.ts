
export const load = async ({ params, locals: { supabase } }) => {


    console.log('params', params);

    const getUserProfile = async (userId: string) => {


        let { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select(
                "id, display_name, avatar_url, email"
            )
            .eq("display_name", params.userId);

        console.log('profile', profile);

        if (profile) {

            return profile[0];
        }
    }

    const profile = await getUserProfile(params.userId);





    // console.log('params', params);

    let { data: userPosts, error } = await supabase
        .from('blog_posts')
        .select(
            "id, title, description, content, published_at, author, tags, view_count",
        )
        .eq('author', profile.id)


    console.log('userPosts', userPosts);

    return {
        posts: userPosts,
        userId: params.userId,
        profile: await getUserProfile(params.userId)
    }



};

