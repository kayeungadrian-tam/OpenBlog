<script lang="ts">
	import SocialButton from '$lib/components/Button.svelte';

	import { enhance } from '$app/forms';
	import type { Provider } from '@supabase/supabase-js';
	import type { PageData, SubmitFunction } from './$types.js';
	import { Button, ButtonSet } from 'carbon-components-svelte';

	import _google from '$lib/logos/_google.svelte';
	import _github from '$lib/logos/_github.svelte';
	import _slack from '$lib/logos/_slack.svelte';

	export let data: PageData;
	const pageData = data;

	const loginForm = [
		{
			action: '?/login&provider=google',
			label: 'Sign in with Google',
			icon: _google
		},
		{
			action: '?/login&provider=github',
			label: 'Sign in with Github',
			icon: _github
		},
		{
			action: '?/login&provider=slack',
			label: 'Sign in with Slack',
			icon: _slack
		}
	];

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
</script>

<div class="flex items-center flex-col">
	<h1 class=" p-8 mb-8">Welcome back!</h1>

	<form method="post">
		<ButtonSet stacked>
			{#each loginForm as { action, label, icon }}
				<button formaction={action} class="my-2">
					<Button kind="tertiary" {icon}>
						{label}
					</Button>
				</button>
			{/each}
		</ButtonSet>
	</form>
</div>
