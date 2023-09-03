<script>
	/**
	 * @type {any}
	 */
	export let topStories;
</script>

<div>
	<h1 class="text-center">For you</h1>

	{#each topStories as post}
		<article>
			<h2><a href="/blog/{post.id}">{post.title}</a></h2>
		</article>
	{/each}
</div>
