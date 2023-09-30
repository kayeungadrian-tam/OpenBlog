import { fail } from "@sveltejs/kit";

export const load = async ({ params, locals: { supabase } }) => {

    const userData = (await supabase.auth.getUser());

    const userId = userData.data.user?.id;




    let { data: userProfile, error } = await supabase.from("profiles").select().eq("id", userId).single();

    console.log(userProfile);

    if (error) {
        throw fail(500, { message: "Failed to load profile" });
    }
    return {
        profile: userProfile,
    }

}