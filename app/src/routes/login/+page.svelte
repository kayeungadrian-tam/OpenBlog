<script lang="ts">
	import SocialButton from '$lib/components/Button.svelte';

	import { enhance } from '$app/forms';
	import type { Provider } from '@supabase/supabase-js';
	import type { PageData, SubmitFunction } from './$types.js';
	import { redirect } from '@sveltejs/kit';

	export let form;

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

	const test = () => {
		console.log('test');
	};
</script>

<div class="flex mx-auto flex-col justify-start align-middle items-center h-screen">
	<h1 class="text-2xl p-8 mb-8">Welcome back!</h1>

	<!-- <form method="post" use:enhance={submitSocialLogin}> -->
	<form method="post">
		<!-- <button formaction="?/login&provider=google">Google</button> -->
		<SocialButton label="Sing in with Google" icon="google-logo" action="?/login&provider=google" />
		<SocialButton label="Sing in with Github" icon="github" action="?/login&provider=google" />
		<SocialButton label="Sing in with Linkedin" icon="linkedin" action="?/login&provider=google" />
		<SocialButton label="Sing in with Slack" icon="slack-new" action="?/login&provider=google" />
	</form>
</div>
