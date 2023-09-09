import { error } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export async function load({ isDataRequest, params }) {

    let loading = true;


    // const { data } = await supabase.from("blog_posts").select().eq("slug", params.slug);

    const dataPromise = supabase.from("blog_posts").select().eq("slug", params.slug)
        .then(async (response) => {
            // Mark loading as false when data is fetched
            loading = false;
            await new Promise((resolve) => setTimeout(resolve, 1000));

            try {
                return await response;
            } catch (error) {
                console.log('error', error);
                throw error;
            }

            // Check if the response is successful
            // if (response.status === 200) {
            //     return await response.json();
            // } else {
            //     throw new Error("Failed to fetch data");
            // }
        })




    // if (!data) throw error(404);


    // Wait for 2 seconds


    return {
        loader: {
            dataPromise: isDataRequest ? dataPromise : await dataPromise,
        }
    };
}