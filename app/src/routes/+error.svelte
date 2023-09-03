<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';

	const backHome = () => {
		goto('/');
	};
</script>

<div class="mx-auto my-auto min-h-screen flex flex-col align-middle items-center justify-center">
	<!-- <h1>{$page.error.message}</h1> -->
	<h1 class="text-purple-700">{$page.status}</h1>
	<h1 class="text-purple-700">Welcome to the great nothing</h1>
	<Button func={backHome} label="Go Home" icon="home" primary />
</div>
