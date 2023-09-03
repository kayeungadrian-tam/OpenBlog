<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	import { enhance } from '$app/forms';
	import type { Provider } from '@supabase/supabase-js';
	import type { PageData, SubmitFunction } from './$types.js';
	import { redirect } from '@sveltejs/kit';

	// export let form;

	export let data: PageData;

	const pageData = data;

	const signInWithOAuth = async (provider: Provider) => {
		const response = await pageData.supabase.auth.signInWithOAuth({
			provider: provider
		});

		console.log(response);

		// throw redirect(303, data.url);
	};

	const submitSocialLogin: SubmitFunction = async ({ action, cancel }) => {
		console.log('client');

		console.log(data);

		switch (action.searchParams.get('provider')) {
			case 'google':
				await signInWithOAuth('google');
				break;
		}
		cancel();
	};

	// const { data: session } = supabase.auth.session();

	// const googleLogin = async () => {
	// 	const { data, error } = await supabase.auth.signInWithOAuth({
	// 		provider: 'google',
	// 		options: {
	// 			queryParams: {
	// 				access_type: 'offline',
	// 				prompt: 'consent'
	// 			},
	// 			// redirectTo: `http://main--ma-blogs.netlify.app/about`
	// 			// redirectTo: `http://localhost:5173/about`
	// 			redirectTo: `${location.origin}/auth/callback`
	// 		}
	// 	});

	// 	if (error) {
	// 		console.log(error);
	// 		return;
	// 	}
	// };

	const test = () => {
		console.log('test');
	};
</script>

<div>
	<h1>Login Here!</h1>

	<!-- <form method="post" use:enhance={submitSocialLogin}> -->
	<form method="post">
		<!-- <button formaction="?/login&provider=google">Google</button> -->
		<Button label="Google" icon="google-logo" action="?/login&provider=google" primary />
	</form>

	<!-- A fancy login button -->
	<!-- <Button label="Google" func={googleLogin} icon="google-logo" primary />
	<Button label="Linkedin" func={test} icon="linkedin" />
	<Button label="Facebook" func={test} icon="facebook-new" />
	<Button label="Slack" func={test} icon="slack-new" />
	<Button label="Primary" func={test} primary />
	<Button label="Secondary" func={test} /> -->
	<!-- <button on:click={googleLogin}>Login with Google</button> -->
</div>
<!-- 
<form method="post" use:enhance>
	<input name="email" value={form?.email ?? ''} />
	<input type="password" name="password" />
	<button>Sign up</button>
</form> -->
