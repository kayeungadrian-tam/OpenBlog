<script lang="ts">
	import Icon from '@iconify/svelte';
	import { CodeBlock, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { TableOfContents, tocCrawler } from '@skeletonlabs/skeleton';

	import hljs from 'highlight.js/lib/core';
	import python from 'highlight.js/lib/languages/python';

	hljs.registerLanguage('python', python);

	import 'highlight.js/styles/github-dark.css';

	import 'svelte-highlight/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';

	storeHighlightJs.set(hljs);

	export let data;

	const test = 'h2';

	let contents = [
		{ type: 'header 1', placeholder: 'title', content: 'Title' },
		{ type: 'header 2', placeholder: 'header', content: 'header1' },
		{ type: 'header 3', placeholder: 'sub-header', content: 'header2' },
		{ type: 'p', placeholder: 'start writing...', content: 'paragraph' },
		{ type: 'codeBlock', content: 'const tes : string = "";', language: 'python' },
		{ type: 'blockquote', content: 'Quote' },
		{ type: 'pre', content: 'pre-formatted text in here' }
	];
	let title = '';
	let result = '';

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

	const publish = () => {
		console.log('publish', result);
	};

	const delteContent = (index: number) => {
		console.log('delteContent', index);

		contents = contents.filter((_, i) => i !== index);
	};

	const code = 'const add = (a: number, b: number) => a + b;'; // Set up onChange for content

	// const pyCode = "def add(a, b):\n\treturn a + b";
	let pyCode = `
import numpy as np
import pandas as pd

df = pd.read_csv("../data.csv")


def hoge():
  return None
	`;

	// $: console.log('content', contents);
	$: contents = contents;
	$: pyCode = pyCode;
	$: result = result;
</script>

<svelte:head>
	<title>Your story - OpenBlog</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="container h-full mx-auto flex justify-center py-4">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Share your thoughts!</h2>
		<form method="POST">
			<input type="text" name="title" placeholder="Title" class="input w-full" bind:value={title} />

			<pre />
			<div class="flex flex-col">
				{#each contents as inputBox, i}
					{#if inputBox.type === 'codeBlock'}
						<textarea class="textarea text-left" rows="4" placeholder="" bind:value={pyCode} />

						<CodeBlock class="w-full text-left" language={inputBox.language} code={pyCode} />
					{:else}
						<div class=" flex items-center {inputBox.type} ">
							<input
								type="text"
								name={inputBox.type}
								placeholder={inputBox.placeholder}
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
			<button formaction="?/testPost" class="btn variant-filled-surface">Publish</button>
		</form>

		{#if result}
			<!-- <div class="text-left" innerHTML={result} />
			 -->
			{result}
		{/if}
	</div>
</div>

<div class="card max-w-sm" data-popup="popupCloseQuery">
	<div class="grid grid-cols-1 gap-2">
		<button id="wont-close" class="btn variant-filled-error">#wont-close</button>
		<button id="will-close" class="btn variant-filled-success">#will-close</button>
	</div>
	<div class="arrow bg-surface-100-800-token" />
</div>
