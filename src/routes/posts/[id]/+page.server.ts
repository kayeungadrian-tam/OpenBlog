import { redirect, type Actions } from "@sveltejs/kit";
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';





export const load = async ({ params, fetch, locals: { getSession, supabase } }) => {


    const session = await getSession();
    const userId = session?.user?.id;



    const getPosts = async (id: string) => {
        const { data: postData, error } = await supabase.from("blog_posts").select().eq("id", id)

        if (postData) {
            const author_data = await supabase.from("profiles").select().eq("id", postData[0].author)
            return { post: postData, author: author_data }
        }

    }

    async function getPostScore() {

        if (!userId) {
            return 1;
        }

        let { data, error } = await supabase
            .from("posts_score")
            .select("score")
            .eq("post_id", params.id)
            .eq("user_id", userId)

        console.log('data', data);



        if (data?.length > 0) {
            return data[0].score;
        }

        return 1

    }

    const getPostViewCount = async (user_id: string, post_id: Number) => {

        const res = await fetch(`/api/posts/view?post_id=${post_id}`)
        const data = await res.json()
        return data

    }
    const updatePostViewCount = async (user_id: string, post_id: Number) => { }

    const setPostViewCount = async () => {

        const userId = session?.user.id;
        const postId = params.id;

        let { data: posts_score, error } = await supabase
            .from('posts_score')
            .select('score')
            .eq('post_id', postId)
            .eq('user_id', userId);

        if (posts_score.length === 0) {
            let { data: res, error: e } = await supabase
                .from('posts_score')
                .insert([{ user_id: userId, post_id: postId, score: 1 }])
                .select();
        }

    }

    // setPostViewCount();
    let score = getPostScore();
    // let score = 0;

    return {
        post_id: params.id,
        // posts: [],
        data: getPosts(params.id),
        // view: 10,
        score: score
        // view: getPostViewCount(user_id, Number(params.slug)),
        // score: setPostViewCount(user_id, Number(params.slug)),
    };

}

export const actions: Actions = {

    like: async ({ fetch, request, params, url, locals: { getSession } }) => {

        const session = await getSession();
        if (!session) {
            throw redirect(303, '/login');
        }

        const userId = session.user?.id;
        const postId = params.id;

        const res = await fetch(`/api/posts/view?post_id=${postId}&score=2&user_id=${userId}`, {
            method: 'GET',
        })
    },

    dislike: async ({ fetch, request, params, url, locals: { getSession } }) => {

        const session = await getSession();
        if (!session) {
            throw redirect(303, '/login');
        }

        const userId = session.user?.id;
        const postId = params.id;

        const res = await fetch(`/api/posts/view?post_id=${postId}&score=0&user_id=${userId}`, {
            method: 'GET',
        })
    },
};
