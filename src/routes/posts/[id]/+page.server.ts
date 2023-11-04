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

        if (data?.length > 0) {
            return data[0].score;
        }

        return 1
    }


    return {
        post_id: params.id,
        data: getPosts(params.id),
        score: getPostScore(),
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
