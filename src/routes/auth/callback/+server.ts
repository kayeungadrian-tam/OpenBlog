import { redirect } from '@sveltejs/kit'

export const GET = async ({ url, locals: { supabase } }) => {


    console.log("...", url)
    const code = url.searchParams.get('code')

    if (code) {
        const data = await supabase.auth.exchangeCodeForSession(code)
        console.log(data.data.user?.user_metadata)
    }



    throw redirect(303, url.origin)
}