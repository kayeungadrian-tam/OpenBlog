<script>
	import AuthComponent from '$lib/common/Auth.svelte';
	import Welcome from '$lib/components/Welcome.svelte';
	import Recommend from '$lib/components/Recommend.svelte';
	import About from './about/+page.svelte';
	import Card from '$lib/components/Card.svelte';

	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';

	export let data;

	// const posts = data.dummy.posts;

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
	<div class="grid gap-6 grid-cols-[1fr,16em] max-w-6xl mx-auto">
		<div>
			<Tabs autoWidth>
				<Tab label="Discover" />
				<Tab label="Following" />
				<svelte:fragment slot="content">
					<TabContent>
						<div class="">
							<ul>
								{#each data.postList as { slug, title, content }, i}
									<li>
										<a href="/blog/{slug}">
											<Card {title} author="Adrian Tam" {content} />
										</a>
									</li>
								{/each}
							</ul>
						</div>
					</TabContent>
					<TabContent>Content 2</TabContent>
				</svelte:fragment>
			</Tabs>
		</div>
		<Recommend topStories={data.topPosts} />
	</div>
</section>
