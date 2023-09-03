import { redirect } from '@sveltejs/kit'

export const GET = async ({ url, locals: { supabase } }) => {


    console.log("...", url)
    const code = url.searchParams.get('code')

    if (code) {
        await supabase.auth.exchangeCodeForSession(code)
    }

    throw redirect(303, '/')
}