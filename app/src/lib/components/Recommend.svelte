<script>
	/**
	 * @type {any}
	 */
	export let topStories;
</script>

<div class="text-left gap-4 flex flex-col">
	<h1 class="text-2xl font-semibold m-4">For you</h1>

	{#each topStories as post}
		<article>
			<span><a href="/blog/{post.id}">{post.title}</a></span>
		</article>
	{/each}
</div>
