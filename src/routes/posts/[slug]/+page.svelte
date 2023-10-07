<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';

	import PostContent from '$lib/components/PostContent.svelte';

	export let data;

	const { display_name, avatar_url } = data.author_meta;
	const title = data.post.data[0].title;
	const { json_content, description } = data.post.data[0];

	async function doPost() {
		console.log('POSTING IT!');
		const res = await fetch('/api/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: 'Sample Title',
				content: [
					{
						type: 'header',
						value: 'This is a header'
					},
					{
						type: 'paragraph',
						value: 'This is a paragraph'
					},
					{
						type: 'image',
						value: 'https://avatars.githubusercontent.com/u/1024025?v=4'
					}
				]
			})
		});
		const data = await res.json();
	}
</script>

<div class="container h-full mx-auto flex items-center justify-center">
	<div class="space-y-8 text-left flex flex-col items-center py-8 max-w-3xl">
		<h1 class="h1">{title}</h1>
		<h3 class="h3 text-tertiary-400">
			{description}
		</h3>
		<div class="flex items-center gap-8 justify-start w-full">
			<Avatar src={avatar_url || display_name} width="w-12" class="my-4" />
			<div>
				<p>{display_name}</p>
				<p>Published on Apr 15</p>
			</div>
		</div>
		<div class="w-full py-0">
			<div class="logo-cloud gap-1 h-14 flex">
				<a class="logo-item" href="/">
					<Icon icon="octicon:heart-fill-16" color="red" width="20" />
					<span>Like</span>
				</a>
				<a class="logo-item" href="/">
					<span>(icon)</span>
					<span>Skeleton</span>
				</a>
				<a class="logo-item" href="/">
					<span>(icon)</span>
					<span>Skeleton</span>
				</a>
			</div>

			<div />
		</div>

		<PostContent contents={json_content.contents} />
		<button type="button" class="btn variant-ghost-tertiary" on:click={doPost}> Post it. </button>
	</div>
</div>
