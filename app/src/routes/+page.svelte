<script>
	import Welcome from '$lib/components/Welcome.svelte';
	import Recommend from '$lib/components/Recommend.svelte';
	import About from './about/+page.svelte';
	import Card from '$lib/components/Card.svelte';

	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';
	import { ClickableTile } from 'carbon-components-svelte';
	import { Pagination } from 'carbon-components-svelte';
	import { Tag } from 'carbon-components-svelte';

	export let data;

	// const posts = data.dummy.posts;
	const postsPerPage = 5;
	let currentPage = 1;

	let items = [
		{
			label: 'Feeds',
			value: 1,
			component: Welcome
		},
		{
			label: 'Auth',
			value: 2,
			component: About
		}
	];

	let totalPages = Math.ceil(data.postList.length / postsPerPage);

	/**
	 * @type {any[]}
	 */
	let currentPosts = [];

	function updatePosts() {
		const startIndex = (currentPage - 1) * postsPerPage;
		const endIndex = startIndex + postsPerPage;
		currentPosts = data.postList.slice(startIndex, endIndex);
	}

	/**
	 * @param {any} event
	 */
	function goToPage(event) {
		// console.log(totalPages);
		currentPage = event.detail.page;
		updatePosts();
	}

	$: totalPages = Math.ceil(data.postList.length / postsPerPage);
	$: updatePosts();
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Welcome title="OpenBlog" description="Welcome to the other side of knowledge." />
	<!-- 
	{#if data.session}
		{Object.keys(data.session.user)}
		{data.session.user.email}
		{data.session.user.user_metadata.full_name}
		<a href={data.session.user.user_metadata.avatar_url} target="_blank">
			<img src={data.session.user.user_metadata.avatar_url} alt="avatar" />
		</a>
	{/if} -->
	<!-- <div class="grid gap-6 grid-cols-[1fr,16em] max-w-6xl mx-auto">
		 -->
	<div class="grid gap-6 grid-cols-[1fr,16em] md:max-w-4xl lg:max-w-6xl mx-auto">
		<div>
			<Tabs autoWidth>
				<Tab label="Discover" />
				<Tab label="Following" />
				<svelte:fragment slot="content">
					<TabContent>
						<div class="">
							{#each currentPosts as { slug, title, content }, i}
								<!-- <li>
										<a href="/blog/{slug}">
											<Card {title} author="Adrian Tam" {content} />
										</a>
									</li> -->

								<ClickableTile href="/blog/{slug}" class="my-4">
									<div class="px-6 gap-2 flex flex-col justify-evenly align-middle">
										<div class="font-bold text-xl">
											{title}
										</div>
										<div class="truncate max-w-[35rem]">
											{content}
										</div>
										<div class="italic text-gray-500 mt-4">@Author</div>
									</div>
									<Tag type="teal">Tag</Tag>
									<Tag type="purple">purple</Tag>
									<Tag type="red">red</Tag>
								</ClickableTile>
							{/each}
						</div>
					</TabContent>
					<TabContent>Content 2</TabContent>
				</svelte:fragment>
			</Tabs>
			<Pagination
				page={currentPage}
				on:click:button--next={goToPage}
				on:click:button--previous={goToPage}
				pageSize={postsPerPage}
				totalItems={10}
			/>
		</div>

		<Recommend topStories={data.topPosts} />
	</div>
</section>
