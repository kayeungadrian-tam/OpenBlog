<script lang="ts">
	import { Button } from 'carbon-components-svelte';
	import LocationCurrent from 'carbon-icons-svelte/lib/LocationCurrent.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	let title = '';
	let content = '';

	function getRandomInt(min: number, max: number): number {
		// Generate a random number between min (inclusive) and max (exclusive)
		return Math.floor(Math.random() * (max - min)) + min;
	}

	async function addPost() {
		console.log(title);
		console.log(content);

		const response = await data.supabase
			.from('blog_posts')
			.insert({
				id: getRandomInt(10, 100),
				title: title,
				content: content,
				author: data.session?.user.id,
				published_at: new Date(),
				slug: getRandomInt(10, 100)
			})
			.select('slug');

		if (response.error) {
			console.log(response.error);
			return;
		}

		if (response.status === 201) {
			const slug = response.data[0].slug;
		}
	}
</script>

<!-- A simple input element for blog title -->
<form method="POST">
	<div class="flex flex-col items-center w-screen mx-auto">
		<div class="text-3xl p-8">
			<label for="title">Title</label>
		</div>
		<input
			type="text"
			name="title"
			class="border border-gray-300 rounded-sm w-1/4"
			placeholder="Title"
			bind:value={title}
		/>

		<!-- A simple textarea element for blog content -->
		<div class="text-3xl p-8">
			<label for="content">Content</label>
		</div>
		<textarea
			name="content"
			class="border border-gray-300 rounded-sm w-1/4"
			placeholder="Content"
			rows="10"
			bind:value={content}
		/>

		<!-- A simple button element for submitting the blog -->
		<div class="flex gap-4">
			<Button kind="tertiary">Save Draft</Button>
			<Button icon={LocationCurrent}>Publish</Button>
		</div>
		<!-- <Button label="Save Draft" /> -->
		<!-- <Button label="Publish" action="?/addPost" primary /> -->
	</div>
</form>
