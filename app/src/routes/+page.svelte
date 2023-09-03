<script>
	import AuthComponent from '$lib/common/Auth.svelte';
	import Welcome from '$lib/components/Welcome.svelte';
	import Tabs from '$lib/components/Tabs.svelte';
	import Recommend from '$lib/components/Recommend.svelte';

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
			component: AuthComponent
		}
	];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Welcome />
	{data.session}
	<!-- 
	{#if data.session}
		{Object.keys(data.session.user)}
		{data.session.user.email}
		{data.session.user.user_metadata.full_name}
		<a href={data.session.user.user_metadata.avatar_url} target="_blank">
			<img src={data.session.user.user_metadata.avatar_url} alt="avatar" />
		</a>
	{/if} -->
	<div class="max-w-6xl mx-auto grid grid-cols-[1fr,16em] gap-8">
		<Tabs {items} />

		<!-- <Recommend topStories={posts} /> -->
	</div>
</section>
