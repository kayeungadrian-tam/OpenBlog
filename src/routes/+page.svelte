<script lang="ts">
	import { formatDatetimeToHumanReadable } from '$lib/shared/utils.js';
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';

	import type { PageData } from './$types';

	export let data: PageData;
	let tabSet: number = 0;

	const posts = data.posts;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center w-screen max-w-5xl">
		<h2 class="h2">Welcome to Skeleton.</h2>

		<div class="w-full lg:grid lg:grid-cols-[1fr_300px] md:flex md:flex-col">
			<TabGroup
				hover="hover:text-primary-400"
				active="text-primary-600 border-b border-primary-600"
			>
				<Tab bind:group={tabSet} name="tab1" value={0}>
					<svelte:fragment slot="lead">
						<span class="flex align-middle items-center gap-2">
							<Icon icon="octicon:globe-16" />Global
						</span>
					</svelte:fragment>
					<!-- <span>(label 1)</span> -->
				</Tab>
				<Tab bind:group={tabSet} name="tab2" value={1}>
					<span class="flex align-middle items-center gap-2">
						<Icon icon="octicon:graph-16" />Trending
					</span>
				</Tab>
				<Tab bind:group={tabSet} name="tab3" value={2}>
					<span class="flex align-middle items-center gap-2">
						<Icon icon="octicon:person-16" />For You
					</span></Tab
				>
				<!-- Tab Panels --->
				<svelte:fragment slot="panel">
					{#if tabSet === 0}
						{#each posts as { slug, title, content, author, published_at }, i}
							<div class="card variant-glass-surface max-w-3xl my-6">
								<a href="/posts/{slug}">
									<header class="card-header text-2xl">{title}</header>
								</a>
								<section class="p-4" />
								<footer class="card-footer">
									{formatDatetimeToHumanReadable(published_at, 'en-US')}
								</footer>
							</div>
						{/each}
					{:else if tabSet === 1}
						(tab panel 2 contents)
					{:else if tabSet === 2}
						(tab panel 3 contents)
					{/if}
				</svelte:fragment>
			</TabGroup>
			<div>Something else</div>
		</div>

		<!-- Animated Logo -->
		<figure>
			<section class="img-bg" />
			<svg
				class="fill-token -scale-x-[100%]"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 200 200"
			/>
		</figure>
		<!-- / -->
		<div class="flex justify-center space-x-2">
			<a class="btn variant-filled" href="https://skeleton.dev/" target="_blank" rel="noreferrer">
				Launch Documentation
			</a>
		</div>

		<div class="space-y-2">
			<p>Try editing the following:</p>
			<p><code class="code">/src/routes/+layout.svelte</code></p>
			<p><code class="code">/src/routes/+page.svelte</code></p>
		</div>
		<button type="button" class="btn variant-outline-tertiary">Button</button>
		<button type="button" class="btn bg-gradient-to-br variant-gradient-tertiary-secondary"
			>Button</button
		>
	</div>
</div>

<div class="bg-primary-300 text-secondary-500">Footer</div>

<style lang="postcss">
	figure {
		@apply flex relative flex-col;
	}
	figure svg,
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite, glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
