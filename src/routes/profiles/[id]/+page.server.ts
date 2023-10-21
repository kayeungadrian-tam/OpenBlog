import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";


export const load = async ({ params, fetch, locals: { supabase } }) => {

    const userData = (await supabase.auth.getUser());

    const userId = userData.data.user?.id;

    // Get fetch random user data from dummyjson.com

    const _followiingPromise = await fetch('https://dummyjson.com/users?limit=5');
    const _following = await _followiingPromise.json();

    console.log(params)

    let { data: userProfile, error } = await supabase.from("profiles").select().eq("id", params.id).single();

    console.log(userProfile);

    if (error) {
        throw fail(500, { message: "Failed to load profile" });
    }
    return {
        profile: userProfile,
        following: _following.users
    }

}



export const actions: Actions = {
    update: async ({ params, fetch, request, locals: { supabase } }) => {
        console.log('default action');
        const formData = await request.formData();
        console.log('formData', formData);
        const newDisplayName = formData.get('display_name');
        console.log('newDisplayName', newDisplayName);



        const userId = params.id;
        console.log('userId', userId);

        // Update user profile in supabase


        const { data, error } = await supabase
            .from('profiles')
            .update({ display_name: newDisplayName })
            .eq('id', userId)
            .select()

        if (error) {
            throw fail(500, { message: "Failed to load profile" });
        }

        // wait for 2 seconds
        // await new Promise(resolve => setTimeout(resolve, 2000));

        throw redirect(303, `/profiles/${userId}`);
    }
};