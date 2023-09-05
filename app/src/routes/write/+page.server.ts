import { redirect } from "@sveltejs/kit";

// src/routes/+layout.server.ts
export const load = async ({ locals: { getSession } }) => {
    return {
        session: await getSession(),
    }
}




export const actions = {
    addPost: async ({ cookies, request, locals: { supabase } }) => {


        function getRandomInt(min: number, max: number): number {
            // Generate a random number between min (inclusive) and max (exclusive)
            return Math.floor(Math.random() * (max - min)) + min;
        }

        console.log('server side addPost')


        const formData = await request.formData();

        const title = formData.get('title');
        const content = formData.get('content');

        const user_id = await supabase.auth.getUser();

        const response = await supabase
            .from('blog_posts')
            .insert({
                id: getRandomInt(10, 100),
                title: title,
                content: content,
                author: user_id.data.user?.id,
                published_at: new Date(),
                slug: getRandomInt(10, 100)
            })
            .select('slug');

        console.log(response.data);

        const slug = response.data[0].slug;

        throw redirect(303, `/blog/${slug}`)


        // const { data, error } = await supabase.from('blog_posts').insert([
        //     {
        //         title: title,
        //         content: content,
        //         author: "Adrian",
        //         id: 4,
        //     },
        // ])

        // if (error) {
        //     return {
        //         status: 500,
        //         body: error.message,
        //     }
        // }

        return {
            status: 200,
            body: "data",
        }
    }
}