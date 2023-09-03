import type { Provider } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"



// src/routes/login/+page.server.ts
export const actions = {
    // default: async ({ request, url, locals: { supabase } }) => {
    //     const formData = await request.formData()
    //     // const email = formData.get('email') as string
    //     // const password = formData.get('password') as string

    //     // const { error } = await supabase.auth.signUp({
    //     //     email,
    //     //     password,
    //     //     options: {
    //     //         emailRedirectTo: `${url.origin}/auth/callback`,
    //     //     },
    //     // })

    //     console.log(url)

    //     const { data, error } = await supabase.auth.signInWithOAuth({
    //         provider: 'google',
    //         options: {
    //             queryParams: {
    //                 access_type: 'offline',
    //                 prompt: 'consent'
    //             },
    //             redirectTo: `${url.origin}/auth/callback/`
    //             // redirectTo: `http://main--ma-blogs.netlify.app/about`
    //             // redirectTo: `http://localhost:5173/auth/callback`

    //         }
    //     })

    //     console.log(data)



    //     return {
    //         message: 'Please check your email for a magic link to log into the website.',
    //         success: true,
    //     }
    // },


    login: async ({ request, url, locals: { supabase } }) => {
        console.log('server side login')
        const provider = url.searchParams.get('provider') as Provider

        console.log(provider)
        if (!provider) {
            fail(400, 'No provider specified')
        }

        const { data, error } = await supabase.auth.signInWithOAuth(
            {
                provider: provider,
                options: { redirectTo: `${url.origin}/auth/callback/` }
            }
        )

        console.log(data);
        throw redirect(303, data.url)
    }

}

