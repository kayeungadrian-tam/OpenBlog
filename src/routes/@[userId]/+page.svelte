<script>
	import { AppShell } from '@skeletonlabs/skeleton';
	import PostList from '$lib/components/PostList.svelte';
	export let data;

	const profile = data.session?.user.user_metadata;
	const { full_name, email } = profile;
</script>

<div class=" my-4 flex max-w-6xl align-middle items-center justify-center mx-auto">
	<AppShell
		slotSidebarRight="border-3 mx-auto border-l flex  border-tertiary-500 p-6 min-h-[calc(100vh-120px)]"
		regionPage="px-6"
	>
		<svelte:fragment slot="sidebarRight">
			<div class="mb-12 text-center w-full">
				<h3 class="">{full_name}</h3>
			</div>
		</svelte:fragment>
		<svelte:fragment slot="pageHeader">
			<div class="my-6">
				<h1 class="h2 text-center">{full_name}</h1>
				<h5 class="h5 text-center">{email}</h5>
			</div>
		</svelte:fragment>
		<section class="container flex flex-col align-middle justify-center items-center">
			<PostList posts={data.posts} />
		</section>
	</AppShell>
</div>
