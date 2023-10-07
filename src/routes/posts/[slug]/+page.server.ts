export const load = async ({ params, locals: { supabase } }) => {

    const userData = (await supabase.auth.getUser());

    // const test = userData.data.user?.user_metadata.full_name;


    const post_data = await supabase.from("blog_posts").select().eq("slug", params.slug)



    // Get author data
    const author_data = await supabase.from("profiles").select().eq("id", post_data.data[0].author)
    const author = author_data.data[0];



    return {
        author_meta: author,
        posts: [],
        post: post_data
    };

}