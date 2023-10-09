import type { RequestHandler } from "@sveltejs/kit";
import { error, redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals: { supabase }, request }) => {

    console.log("server side add post");
    console.log(request.body);
    const res = await request.json();
    console.log(res);



    const { data, error } = await supabase
        .from('blog_posts')
        .insert([
            { json_content: res, title: "test", slug: "12", author: "24b2d0de-d683-43de-bcc4-8d8988f77558" },
        ])
        .select("slug")

    console.log('data', data);
    console.log('error', error);

    if (!error) {

        const slug = data[0].slug;

        return new Response(
            JSON.stringify({ message: 'ok', slug: slug }),
        );
    }


    // throw redirect(303, '/');
};


