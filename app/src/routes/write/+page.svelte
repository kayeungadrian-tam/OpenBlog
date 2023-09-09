<script lang="ts">
	import { TextInput } from 'carbon-components-svelte';
	import { TextArea } from 'carbon-components-svelte';

	import { ToastNotification } from 'carbon-components-svelte';
	import { Button } from 'carbon-components-svelte';

	import LocationCurrent from 'carbon-icons-svelte/lib/LocationCurrent.svelte';
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	let showToast = false;
	let showSuccess = false;

	let title = '';
	let content = '';

	function getRandomInt(min: number, max: number): number {
		// Generate a random number between min (inclusive) and max (exclusive)
		return Math.floor(Math.random() * (max - min)) + min;
	}

	let toastMsg = {
		title: 'Success',
		subtitle: 'Draft saved successfully.',
		caption: new Date().toLocaleString()
	};

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
			showToast = true;
		}
	}

	function test() {
		console.log('test');
		showToast = !showToast;
	}
</script>

<!-- A simple input element for blog title -->
<form method="POST">
	<div class="flex flex-col items-center w-screen mx-auto">
		<div class="text-3xl p-8 w-full">
			<label for="title">Title</label>
			<TextInput
				name="title"
				labelText=""
				size="xl"
				bind:value={title}
				placeholder="Enter user name..."
			/>
		</div>

		<div class="text-3xl p-8 w-full">
			<label for="content">Content</label>
			<TextArea name="content" labelText="" bind:value={content} placeholder="Enter user name..." />
		</div>

		<!-- <input
			type="text"
			name="title"
			class="border border-gray-300 rounded-sm w-1/4"
			placeholder="Title"
			bind:value={title}
		/> -->

		<div class="flex gap-4">
			<Button icon={Edit} kind="tertiary" on:click={test}>Save Draft</Button>
			<button formaction="?/addPost">
				<Button icon={LocationCurrent} on:click={() => {}}>Publish</Button>
			</button>
		</div>
	</div>

	{#if showToast}
		<div class="duration-200 ease-in-out mx-auto flex items-center align-middle justify-center">
			<ToastNotification
				lowContrast
				hideCloseButton={true}
				timeout={3000}
				title={toastMsg.title}
				kind="success"
				subtitle={toastMsg.subtitle}
				caption={new Date().toLocaleString()}
				on:close={() => (showToast = false)}
			/>
		</div>
	{/if}
</form>
