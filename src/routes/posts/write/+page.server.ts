import { contentArrayToString } from '$lib/shared/utils.js';
import { redirect } from '@sveltejs/kit';

// src/routes/+layout.server.ts
export const load = async ({ locals: { getSession } }) => {
    return {
        session: await getSession()
    }
}

function getRandomInt(min: number, max: number): number {
    // Generate a random number between min (inclusive) and max (exclusive)
    return Math.floor(Math.random() * (max - min)) + min;
}


export const actions = {
    addPost: async ({ cookies, request, locals: { supabase } }) => {
        console.log("server side add post");

        const userData = (await supabase.auth.getUser());
        // console.log(user_id);

        let user_id = null;

        if (userData) {
            user_id = userData.data.user?.id;
            console.log(user_id);
        }

        const formData = await request.formData();

        const title = formData.get('title');

        let content = "";

        formData.forEach((value, key) => {
            console.log(`${key} ${value}`);
            const type = key.split(":")[1]

            console.log(type);
            if (type === "title") {
                return;
            } else {

                switch (type) {
                    case "h1":
                        content += `<h1 class="h1">${value}</h1>`
                        break;
                    case "h2":
                        content += `<h2 class="h2">${value}</h2>`
                        break;
                    case "h3":
                        content += `<h3 class="h3">${value}</h3>`
                        break;
                    case "p":
                        content += `<p>${value}</p>`
                        break;
                    default:
                        content += `<p>${value}</p>`

                    // throw new Error(`Unknown content type: ${type}`);
                }
            }
        })


        const response = await supabase
            .from('blog_posts')
            .insert({
                id: getRandomInt(10, 100),
                title: title,
                content: content,
                author: user_id,
                published_at: new Date(),
                slug: getRandomInt(10, 100)
            })

        console.log(content);

        // Get length of formdata


    },
    testPost: async ({ request, fetch, locals: { supabase } }) => {
        console.log('test post');

        const formData = await request.formData();

        console.log('formdata', formData);


        let contents: object[] = [];
        // let jsonContent = {
        // "contents": []
        // };

        // Format formdata into json with "type" and "content" keys

        formData.forEach((value, key) => {
            console.log(`${key} ${value}`);
            contents.push({
                "type": key.toString(),
                "content": value.toString()
            })
        })


        const jsonContent = {
            "contents": contents
        }

        console.log('jsonContent', jsonContent);
        // Send to api endpoint

        const res = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify(jsonContent)
        })

        const data = await res.json()
        console.log('data', data);

        throw redirect(303, `/posts/${data.slug}`);

    },
}