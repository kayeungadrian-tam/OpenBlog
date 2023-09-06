<script>
	/**
	 * @type {any}
	 */
	export let topStories;
</script>

<div class="text-center">
	<h1 class="text-2xl font-semibold m-4">For you</h1>

	{#each topStories as post}
		<article>
			<h2><a href="/blog/{post.id}">{post.title}</a></h2>
		</article>
	{/each}
</div>
