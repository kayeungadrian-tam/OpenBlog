<script>
	export let data;
</script>

<div class="">
	<main>
		<slot />
	</main>

	<aside class="flex items-center flex-col mt-12">
		<h2>You may also like...</h2>

		<ul>
			{#each data.postList as { slug, title }}
				<li class="my-2">
					<a href="/blog/{slug}">{title}</a>
				</li>
			{/each}
		</ul>
	</aside>
</div>
