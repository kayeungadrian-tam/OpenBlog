<script>
	export let data;
	$: post_data = data.data[0];
	import Welcome from '$lib/components/Welcome.svelte';
</script>

<div>
	<Welcome title={post_data.title} />

	<div class="max-w-6xl mx-auto">
		<h1>{post_data.title}</h1>
		<p>{post_data.content}</p>
	</div>
</div>
