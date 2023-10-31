<script lang="ts">
	import { formatDatetimeToHumanReadable } from '$lib/shared/utils.js';
	import { TabGroup, Tab, TabAnchor, Avatar } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import InfoCard from '$lib/components/InfoCard.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
	let tabSet: number = 0;

	const posts = data.posts;

	const getAuthor = async (data: any) => {
		const res = await data.json();
		return res;
	};

	const exampleTags = [
		'javascript',
		'nodejs',
		'express',
		'nextjs',
		'vitejs',
		'svelte',
		'sapper',
		'vite',
		'vite-plugin',
		'vite-plugin-ssr',
		'vite-plugin-ssr-svelte',
		'vite-plugin-ssr-svelte-tailwindcss'
	];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center w-screen">
		<h2 class="h2">Welcome to Skeleton.</h2>

		<div
			class="
			lg:max-w-6xl
			w-screen
		lg:grid
		lg:grid-cols-[1fr_250px]
		md:flex
		md:flex-col
		"
		>
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
						<div class="w-100">
							{#each posts as { id, discription, title, content, author, published_at, tags }, i}
								<div class="card variant-glass-surface my-6">
									<a href="/posts/{id}">
										<header class="card-header h3 text-left">{title}</header>
										<section class="p-4 text-left">
											{discription}
										</section>
									</a>
									<footer class="card-footer">
										<div class="flex">
											<div class="flex align-middle items-center gap-4 text-sm italic">
												<span>
													<Avatar
														src="https://lh3.googleusercontent.com/a/ACg8ocLkaCye9ZoiP2MdgYa9TrZmtyiyytpeAHBYpFb4UcgwC5I=s96-c"
														initials="AB"
														width="w-10"
													/>
												</span>
												<span class="flex flex-col items-start">
													<a class="hover:text-primary-400" href="/">
														<span>
															Adrian Tam
															<!-- {author.substring(0, 8)} -->
														</span>
													</a>
													<div class="text-tertiary-700">
														{formatDatetimeToHumanReadable(published_at, 'en-US')}
													</div>
												</span>
											</div>
											<div class="right-0 absolute bottom-0 space-x-2 m-4">
												{#each tags as tag}
													<span class="chip variant-filled-secondary">{tag}</span>
												{/each}
											</div>
										</div>
									</footer>
									<!-- <Avatar src={author.avatar} alt={author.name} /> -->
								</div>
							{/each}
						</div>
					{:else if tabSet === 1}
						(coming soon...)
					{:else if tabSet === 2}
						(coming soon...)
					{/if}
				</svelte:fragment>
			</TabGroup>
			<div class="">
				<div class="mb-6">
					<strong class="h4 text-center">Popular Tags</strong>
				</div>
				<div class=" flex flex-col h-100 justify-between">
					<div class="text-left p-6">
						{#each exampleTags as tag}
							<a href="/tags/{tag}" class=" m-1 chip variant-filled">{tag}</a>
						{/each}
					</div>
				</div>

				<InfoCard />
			</div>
		</div>
	</div>
</div>
