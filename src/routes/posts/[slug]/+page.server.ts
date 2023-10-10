import type { Actions } from "@sveltejs/kit";
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';





export const load = async ({ params, fetch, locals: { supabase } }) => {

    const userData = (await supabase.auth.getUser());



    const post_data = await supabase.from("blog_posts").select().eq("slug", params.slug)
    const user_id = post_data.data[0].author;

    // Get author data
    const author_data = await supabase.from("profiles").select().eq("id", user_id)
    const author = author_data.data[0];






    const getPostViewCount = async (user_id: string, post_id: Number) => {

        const res = await fetch(`/api/posts/view?post_id=${post_id}`)
        const data = await res.json()
        console.log(data);
        return data

    }

    const setPostViewCount = async (user_id: string, post_id: Number) => {

        let { data: posts_score, error } = await supabase
            .from('posts_score')
            .select("score").eq("post_id", params.slug).eq("user_id", user_id)

        if (posts_score?.length > 0) {
            console.log('score');

            console.log('score', posts_score[0].score);
            return posts_score[0].score
        }


        let { data: res, error: e } = await supabase
            .from('posts_score')
            .insert([
                { user_id: user_id, post_id: params.slug, score: 1 },
            ])
            .select()


        return

    }

    const getPostScore = async (user_id: string, post_id: Number) => {

    }




    return {
        author_meta: author,
        post_id: params.slug,
        posts: [],
        post: post_data,
        view: 10,
        score: 0
        // view: getPostViewCount(user_id, Number(params.slug)),
        // score: setPostViewCount(user_id, Number(params.slug)),
    };

}

export const actions: Actions = {

    like: async ({ fetch, request }) => {
        console.log('like');
        const formData = await request.formData();

        const userId = formData.get('author_id');
        const postId = formData.get('post_id');

        const res = await fetch(`/api/posts/view`, {
            method: 'POST',
            body: JSON.stringify({ "user_id": userId, "post_id": postId, score: 2 })
        })

        const data = await res.json()
        console.log(data);

    },

    dislike: async ({ fetch, request }) => {
        console.log('dislike');
        const formData = await request.formData();

        const userId = formData.get('author_id');
        const postId = formData.get('post_id');

        const res = await fetch(`/api/posts/view`, {
            method: 'POST',
            body: JSON.stringify({ "user_id": userId, "post_id": postId, score: 0 })
        })

        const data = await res.json()
        console.log(data);

    }
};
