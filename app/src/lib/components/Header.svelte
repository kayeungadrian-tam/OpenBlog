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

<header class="bg-white shadow-md p-4">
	<div class="px-12">
		<nav class="flex items-center justify-between">
			<div class="text-xl font-semibold text-purple-700">
				<a href="/">My Blogs</a>
			</div>
			<div class="flex gap-4">
				<!-- {currentTimestamp.toLocaleString()} -->
				<a href="/about" rel="external">About</a>
				<a href="/login" rel="external">Sign In</a>
				<a href="/register" rel="external">Sign Up</a>
			</div>
		</nav>
	</div>
</header>
