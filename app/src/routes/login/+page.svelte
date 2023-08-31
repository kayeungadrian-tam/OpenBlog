<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import Button from '$lib/components/Button.svelte';

	let loading = false;

	const googleLogin = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				queryParams: {
					// access_type: 'offline',
					prompt: 'consent'
				},
				redirectTo: `http://localhost:5173/about`
			}
		});

		if (error) {
			console.log(error);
			return;
		}
	};

	const test = () => {
		console.log('test');
	};
</script>

<div>
	<h1>Login Here!</h1>
	<!-- A fancy login button -->
	<Button label="Google" func={googleLogin} icon="google-logo" primary />
	<Button label="Linkedin" func={test} icon="linkedin" />
	<Button label="Facebook" func={test} icon="facebook-new" />
	<Button label="Slack" func={test} icon="slack-new" />
	<Button label="Primary" func={test} primary />
	<Button label="Secondary" func={test} />
	<!-- <button on:click={googleLogin}>Login with Google</button> -->
</div>
