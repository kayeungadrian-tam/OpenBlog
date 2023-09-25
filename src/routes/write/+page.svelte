<script lang="ts">
	import Icon from '@iconify/svelte';
	import { CodeBlock, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { TableOfContents, tocCrawler } from '@skeletonlabs/skeleton';

	export let page: string;

	const test = 'h2';

	let contents = [
		{ type: 'h1', content: '' },
		{ type: 'h2', content: 'Header 2' },
		{ type: 'h3', content: 'Header 3' },
		{ type: 'p', content: 'Paragraph' },
		{ type: 'codeBlock', content: 'const tes : string = "";', language: 'typescript' },
		{ type: 'blockquote', content: 'Quote' },
		{ type: 'pre', content: 'pre-formatted text in here' }
	];

	const popupCloseQuery: PopupSettings = {
		event: 'click',
		target: 'popupCloseQuery',
		placement: 'top'
	};

	function addContent(_type: string, content: string) {
		console.log('addContent');

		const data = {
			_type: 'h1',
			content: ''
		};

		contents = [...contents, data];
		// contents.push(data);
	}

	const delteContent = (index: number) => {
		console.log('delteContent', index);

		contents = contents.filter((_, i) => i !== index);
	};

	// Set up onChange for content
	$: console.log('content', contents);
	$: contents = contents;
</script>

<svelte:head>
	<title>Your story - OpenBlog</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="container h-full mx-auto flex justify-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Share your thoughts!</h2>

		<div class="flex flex-col">
			{#each contents as inputBox, i}
				{#if inputBox.type === 'codeBlock'}
					<CodeBlock class="w-full" language={inputBox.language} code={inputBox.content} />
				{:else}
					<div class=" flex items-center {inputBox.type} ">
						<input
							type="text"
							class="input w-full {inputBox.type} !bg-transparent"
							bind:value={inputBox.content}
						/>

						<!-- A button to delete the content -->
						<button
							type="button"
							class="btn-icon btn-icon-xl variant-filled-error h-10 w-10"
							on:click={() => {
								delteContent(i);
							}}
						>
							<Icon icon="octicon:trash-16" />
						</button>
					</div>
				{/if}
			{/each}
		</div>
		<blockquote class="blockquote">Skeleton</blockquote>

		<button
			type="button"
			class="btn bg-gradient-to-br variant-gradient-tertiary-secondary"
			use:popup={popupCloseQuery}
		>
			<Icon icon="octicon:feed-plus-16" class="w-6 h-6 mr-2" />
			Add
		</button>
	</div>
</div>

<div class="card max-w-sm" data-popup="popupCloseQuery">
	<div class="grid grid-cols-1 gap-2">
		<button
			id="wont-close"
			class="btn variant-filled-error"
			on:click={() => {
				addContent('h1', '');
			}}>#wont-close</button
		>
		<button id="will-close" class="btn variant-filled-success">#will-close</button>
	</div>
	<div class="arrow bg-surface-100-800-token" />
</div>
