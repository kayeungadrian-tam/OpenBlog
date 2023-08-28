<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import GithubCorner from '$lib/components/GithubCorner.svelte';
	import './styles.css';
	import { base } from '$app/paths';
</script>

<div class="app">
	<GithubCorner />
	<Header />

	<main
		class="flex-1 flex flex-col p-4 w-full max-w-64 mx-auto box-border bg-gray-200 bg-cover bg-center bg-radial bg-blend-lighten min-h-screen m-0 bg-fixed"
	>
		<slot />
	</main>

	<Footer />
</div>
