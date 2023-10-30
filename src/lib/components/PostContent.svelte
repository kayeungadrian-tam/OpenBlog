<script lang="ts">
	import type { Content } from '$lib/shared/types';
	import { CodeBlock } from '@skeletonlabs/skeleton';

	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import hljs from 'highlight.js/lib/core';
	import python from 'highlight.js/lib/languages/python';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('python', python);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	export let contents: Content[] = [];
</script>

<div>
	{#each contents as { type, content, lang }, i}
		<div>
			{#if type === 'h1'}
				<h1 class="h1">{content}</h1>
			{:else if type === 'h2'}
				<h2 class="h2">{content}</h2>
			{:else if type === 'h3'}
				<h3 class="h3">{content}</h3>
			{:else if type === 'h4'}
				<h4 class="h4">{content}</h4>
			{:else if type === 'h5'}
				<h5 class="h5">{content}</h5>
			{:else if type === 'h6'}
				<h6 class="h6">{content}</h6>
			{:else if type === 'code'}
				<div class="my-4">
					<CodeBlock language={lang} code={content} />
				</div>
			{:else if type === 'textarea'}
				<p class="p">{content}</p>
			{/if}
		</div>
	{/each}
</div>
