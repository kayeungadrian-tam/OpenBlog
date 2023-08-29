<script>
	export let data;
	const post_data = data.data[0];
</script>

<div>
	<h1>{post_data.title}</h1>
	<p>{post_data.content}</p>
</div>
