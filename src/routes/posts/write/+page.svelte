<script lang="ts">
	import Icon from '@iconify/svelte';
	import { CodeBlock, RadioGroup, RadioItem, popup, tocCrawler } from '@skeletonlabs/skeleton';
	import { RangeSlider } from '@skeletonlabs/skeleton';
	import { TableOfContents } from '@skeletonlabs/skeleton';
	import { InputChip } from '@skeletonlabs/skeleton';

	import { marked } from 'marked';
	import { goto } from '$app/navigation';

	import hljs from 'highlight.js/lib/core';
	import python from 'highlight.js/lib/languages/python';

	hljs.registerLanguage('python', python);

	import 'highlight.js/styles/github-dark.css';

	import 'svelte-highlight/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';

	storeHighlightJs.set(hljs);

	export let data;

	const supabase = data.supabase;
	const userId = data.session?.user.id;
	let viewIndex: number = 0;

	let contents = [
		// { type: 'h2', placeholder: 'Description', content: 'A new description' },
		{ type: 'textarea', placeholder: 'Start writing...', content: 'lorem' }
		// { type: 'h3', placeholder: 'sub-header', content: 'header2' }
		// { type: 'p', placeholder: 'start writing...', content: 'paragraph' }
		// { type: 'codeBlock', content: 'const tes : string = "";', language: 'python' },
		// { type: 'blockquote', content: 'Quote' }
		// { type: 'pre', content: 'pre-formatted text in here' }
	];

	let title = '';
	let description = '';
	let result = '';
	let markdown = '';
	let list: string[] = [];

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

	const publish = async () => {
		const postContent = {
			contents: contents
		};

		console.log('tags', list);

		const { data, error } = await supabase
			.from('blog_posts')
			.insert([
				{
					title: title,
					description: description,
					json_content: postContent,
					author: userId,
					tags: list
				}
			])
			.select();

		console.log('data', data);

		// Redirect to home page
		window.location.href = '/';
	};

	const publishMarkdown = async () => {
		console.log(markdown);

		const { data, error } = await supabase
			.from('blog_posts')
			.insert([
				{
					title: title,
					description: description,
					// json_content: postContent,
					content: markdown,
					author: userId,
					tags: list
				}
			])
			.select();

		console.log('data', data);
		if (data) {
			goto(`/posts/${data[0].id}`);
		}
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
		<form method="POST" class="break-words w-screen max-w-7xl space-y-2 px-20">
			<div class="space-y-2">
				<input
					type="text"
					name="title"
					placeholder="Your new story"
					class="input h3 p-2 !variant-glass-tertiary !border-0"
					bind:value={title}
				/>

				<input
					type="text"
					name="description"
					placeholder="A breif description"
					class="input p p-2 !variant-glass-tertiary !border-0"
					bind:value={description}
				/>

				<div
					class="input !border-0 flex align-middle justify-center items-center px-2 !variant-glass-tertiary"
				>
					<Icon icon="octicon:tag-16" />

					<InputChip
						class="!border-0 !bg-transparent"
						bind:value={list}
						name="chips"
						placeholder="Enter any tag... (max: 5)"
					/>
				</div>
			</div>
			<div>
				<RadioGroup>
					<RadioItem
						bind:group={viewIndex}
						name="justify"
						value={0}
						class="h-full flex flex-col items-center justify-center"
					>
						<div class="flex gap-2 items-center">
							<Icon icon="octicon:pencil-16" />
							<span>Editor</span>
						</div>
					</RadioItem>
					<RadioItem
						bind:group={viewIndex}
						name="justify"
						value={1}
						class="h-full flex flex-col items-center justify-center"
					>
						<div class="flex gap-2 justify-center items-center">
							<Icon icon="octicon:sidebar-collapse-16" />
							<span>Preview</span>
						</div>
					</RadioItem>
				</RadioGroup>
			</div>

			<div class="flex {viewIndex == 0 ? 'flex-col' : ''}">
				<textarea
					bind:value={markdown}
					class="input !variant-glass-tertiary !border-0 textarea {viewIndex == 0
						? 'w-full'
						: 'w-1/2'}"
					rows="25"
					placeholder="Enter markdown here"
				/>

				<div class="w-1/2">
					<article
						class="text-[0.85rem] prose dark:prose-invert prose-code:text-primary-600 {viewIndex ==
						0
							? 'hidden'
							: ''}"
					>
						{@html marked.parse(markdown)}
					</article>
				</div>
			</div>
		</form>

		<button
			on:click={() => {
				// publish();
				publishMarkdown();
			}}
			class="btn variant-filled-primary">Pubish</button
		>
	</div>
</div>
