// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

import { Database } from './database.types';
import { SupabaseClient, Session } from '@supabase/supabase-js'



declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>
			getSession(): Promise<Session | null>
		}
		interface PageData {
			session: Session | null
		}


		// interface PageData {}
		// interface Platform {}
	}
}

export { };
