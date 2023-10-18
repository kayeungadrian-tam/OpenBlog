<script lang="ts">
	import Icon from '@iconify/svelte';
	import { CodeBlock, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { RangeSlider } from '@skeletonlabs/skeleton';

	import hljs from 'highlight.js/lib/core';
	import python from 'highlight.js/lib/languages/python';

	hljs.registerLanguage('python', python);

	import 'highlight.js/styles/github-dark.css';

	import 'svelte-highlight/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';

	storeHighlightJs.set(hljs);

	export let data;

	const test = 'h2';

	const inputTypes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

	let contents = [
		{ type: 'h2', placeholder: 'header', content: 'header1' },
		{ type: 'h3', placeholder: 'sub-header', content: 'header2' }
		// { type: 'p', placeholder: 'start writing...', content: 'paragraph' }
		// { type: 'codeBlock', content: 'const tes : string = "";', language: 'python' },
		// { type: 'blockquote', content: 'Quote' }
		// { type: 'pre', content: 'pre-formatted text in here' }
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

	const inputPopup: PopupSettings = {
		// Represents the type of event that opens/closed the popup
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'inputPopup',
		// Defines which side of your trigger the popup will appear
		placement: 'top'
	};

	const mediaPopup: PopupSettings = {
		event: 'click',
		target: 'mediaPopup',
		placement: 'top'
	};

	const publish = () => {
		console.log('publish', result);
	};

	const delteContent = (index: number) => {
		console.log('delteContent', index);

		contents = contents.filter((_, i) => i !== index);
	};

	const testAdd = (type: string) => {
		console.log('testAdd');
		switch (type) {
			case 'p':
				contents = [
					...contents,
					{ type: 'textarea', placeholder: 'Start writing...', content: '' }
				];
				break;

			default:
				contents = [...contents, { type: type, placeholder: 'Start writing...', content: '' }];
		}
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

	let imgURL = '';
	let imgWidth = 15;
	$: imgWidth = imgWidth;
	$: imgURL = imgURL;
</script>

<svelte:head>
	<title>Your story - OpenBlog</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="container h-full mx-auto flex justify-center py-4">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Share your thoughts!</h2>
		<form method="POST">
			<input
				type="text"
				name="title"
				placeholder="Title"
				class="input w-full h1"
				bind:value={title}
			/>

			<div class="flex flex-col">
				{#each contents as inputBox, i}
					{#if inputBox.type === 'codeBlock'}
						<textarea class="textarea text-left" rows="4" placeholder="" bind:value={pyCode} />

						<!-- <CodeBlock class="w-full text-left" language={inputBox.language} code={pyCode} /> -->
					{:else if inputBox.type == 'textarea'}
						<div class="relative">
							<textarea
								class="textarea text-left"
								rows="10"
								placeholder={inputBox.placeholder}
								bind:value={inputBox.content}
							/>
							<button
								type="button"
								class="absolute right-[-3rem] btn-icon btn-icon-xl variant-filled-error h-10 w-10"
								on:click={() => {
									delteContent(i);
								}}
							>
								<Icon icon="octicon:trash-16" />
							</button>
							<button
								type="button"
								class="absolute left-[-3rem] btn-icon btn-icon-xl variant-filled-success h-10 w-10"
								on:click={() => {
									delteContent(i);
								}}
							>
								<Icon icon="octicon:trash-16" />
							</button>
						</div>
					{:else}
						<div class=" flex items-center {inputBox.type} relative">
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
								class="absolute right-[-3rem] btn-icon btn-icon-xl variant-filled-error h-10 w-10"
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
		</form>
		<input
			type="text"
			name="tags"
			placeholder="Image URL"
			class="input w-full"
			bind:value={imgURL}
		/>
		<RangeSlider name="range-slider" bind:value={imgWidth} max={600} step={10}>Label</RangeSlider>
		{imgURL}
		<img src={imgURL} width={imgWidth} />
		<!-- <button
			class="btn variant-filled-surface"
			on:click={() => {
				testAdd();
			}}>Publish</button
		> -->

		<div class="flex gap-2 absolute bottom-5">
			<button class="chip variant-filled" use:popup={inputPopup}>
				<Icon icon="octicon:feed-plus-16" class="w-4 h-4 " />
				<span> headers </span>
			</button>

			<button
				class="chip variant-filled"
				on:click={() => {
					testAdd('p');
				}}
			>
				<Icon icon="octicon:feed-plus-16" class="w-4 h-4 " />
				<span> paragraph </span>
			</button>

			<button class="chip variant-filled" use:popup={mediaPopup}>
				<Icon icon="octicon:feed-plus-16" class="w-4 h-4 " />
				<span> media </span>
			</button>
		</div>

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

<div class="card p-4 w-72 shadow-xl rounded-xl" data-popup="inputPopup">
	<div class="text-center"><p>Input Content</p></div>
	{#each inputTypes as type}
		<button
			class="chip variant-soft-secondary hover:variant-filled m-1"
			on:click={() => {
				testAdd(type);
			}}
		>
			<span>
				<Icon icon="octicon:feed-plus-16" class="w-4 h-4 " />
			</span>
			<span class="italic">{type}</span>
		</button>
	{/each}
	<div class="arrow bg-surface-100-800-token" />
</div>

<div class="card p-4 w-72 shadow-xl" data-popup="mediaPopup">
	<div><p>Media Content</p></div>
</div>
