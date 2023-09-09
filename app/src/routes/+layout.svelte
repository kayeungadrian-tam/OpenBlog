<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import GithubCorner from '$lib/components/GithubCorner.svelte';
	import './styles.css';
	import 'carbon-components-svelte/css/white.css';
	import 'carbon-components-svelte/css/all.css';

	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				// invalidate('supabase:auth');
				invalidateAll();
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<div class="app">
	<GithubCorner />
	<Header session={data.session} />

	<!-- <main class="flex-1 flex flex-col w-full mx-auto box-border min-h-screen m-0 bg-fixed"> -->
	<main>
		<slot />
	</main>

	<Footer />
</div>
