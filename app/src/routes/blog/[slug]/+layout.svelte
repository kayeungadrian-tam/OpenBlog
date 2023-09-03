<script>
	export let data;
</script>

<div class="">
	<main class="">
		<slot />
	</main>

	<aside class="mt-12">
		<h2>More posts</h2>

		<ul>
			{#each data.postList as { slug, title }}
				<li>
					<a href="/blog/{slug}">{title}</a>
				</li>
			{/each}
		</ul>
	</aside>
</div>

<style>
	@media (min-width: 640px) {
		.layout {
			display: grid;
			gap: 2em;
			grid-template-columns: 1fr 16em;
		}
	}
</style>
