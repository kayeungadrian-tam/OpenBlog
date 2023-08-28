<script>
	export let data;
</script>

<div>
	<h1>{data.post?.title}</h1>
	<div>{@html data.post?.content}</div>
</div>
