<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	import github from '$lib/images/github.svg';
	import { settingData } from '$lib/config/settings';

	let currentTimestamp = new Date();
	let url = settingData.github;

	onMount(() => {
		const interval = setInterval(() => {
			currentTimestamp = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<header class="bg-white shadow-md p-2">
	<div class="container mx-auto px-4 py-3">
		<nav class="flex items-center justify-between">
			<div class="text-xl font-semibold">
				<a href="/blog">My Blogs</a>
			</div>
			<div>
				{currentTimestamp.toLocaleString()}
			</div>
		</nav>
	</div>
</header>
