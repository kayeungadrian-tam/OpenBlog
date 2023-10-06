import { fail } from "@sveltejs/kit";

export const load = async ({ params, fetch, locals: { supabase } }) => {

    const userData = (await supabase.auth.getUser());

    const userId = userData.data.user?.id;

    // Get fetch random user data from dummyjson.com

    const _followiingPromise = await fetch('https://dummyjson.com/users?limit=5');
    const _following = await _followiingPromise.json();

    console.log(params)

    let { data: userProfile, error } = await supabase.from("profiles").select().eq("id", params.slug).single();

    console.log(userProfile);

    if (error) {
        throw fail(500, { message: "Failed to load profile" });
    }
    return {
        profile: userProfile,
        following: _following.users
    }

}