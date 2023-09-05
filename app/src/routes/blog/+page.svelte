<script>
	export let data;
</script>

<h1>blog</h1>

<ul>
	{#each data.postList as { slug, title }, i}
		<li><a href="/blog/{slug}">{title}</a></li>
	{/each}
</ul>
