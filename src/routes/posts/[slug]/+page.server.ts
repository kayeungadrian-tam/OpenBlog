export const load = async ({ params, locals: { supabase } }) => {

    const userData = (await supabase.auth.getUser());

    const test = userData.data.user?.user_metadata.full_name;


    const post_data = await supabase.from("blog_posts").select().eq("slug", params.slug)

    console.log(post_data);


    return {
        name: test,
        posts: [],
        post: post_data
    };

}