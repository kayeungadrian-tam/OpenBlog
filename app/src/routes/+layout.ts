// src/routes/+layout.ts

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'
import type { Database } from '../database.types'

export const load = async ({ fetch, data, depends }) => {
    depends('supabase:auth')

    const supabase = createSupabaseLoadClient<Database>({
        supabaseUrl: supabaseUrl,
        supabaseKey: supabaseAnonKey,
        event: { fetch },
        serverSession: data.session,
    })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    return { supabase, session }
}