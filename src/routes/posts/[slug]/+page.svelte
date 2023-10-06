<script>
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data;

	const title = data.post.data[0].title;

	const jsObj = data.post.data[0].json_content;

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
		console.log(data);
	}
</script>

<div class="container h-full mx-auto flex items-center justify-center">
	<div class="space-y-8 text-left flex flex-col items-center py-8 max-w-2xl">
		<h1 class="h1">{title}</h1>
		<p class="">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam harum eum fugiat at
			similique. Impedit animi cupiditate nihil maiores quis odio quaerat. Dicta assumenda beatae
			neque quos aliquam totam aliquid.
		</p>
		<div class="flex items-center gap-8 justify-start w-full">
			<Avatar src="https://avatars.githubusercontent.com/u/1024025?v=4" width="w-12" class="my-4" />
			<div>
				<p>name</p>
				<p>Published on Apr 15</p>
			</div>
		</div>
		<div class="border-x-0 border-y-2 border-y-secondary-400 w-full py-4">
			<div>Interactive icon</div>
			<!-- {@html data.post.data[0].content} -->
		</div>
		<button type="button" on:click={doPost}> Post it. </button>
		{#each jsObj.contents as { type, content }, i}
			<div>
				{i}, {type}, {content}
			</div>
		{/each}
	</div>
</div>
