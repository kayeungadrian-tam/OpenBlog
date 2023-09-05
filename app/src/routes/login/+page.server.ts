import type { Provider } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"



// src/routes/login/+page.server.ts
export const actions = {
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

