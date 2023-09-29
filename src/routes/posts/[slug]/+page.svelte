<script>
	export let data;
</script>

<div>
	{#if data.post}
		{data.post.data[0].title}
	{/if}

	<!-- Render html -->

	{@html data.post.data[0].content}
</div>
