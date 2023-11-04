<script>
	import { AppShell } from '@skeletonlabs/skeleton';
	import PostList from '$lib/components/PostList.svelte';
	export let data;
</script>

<div class=" my-4 flex max-w-6xl align-middle items-center justify-center mx-auto">
	<AppShell
		slotSidebarRight="border-3 mx-auto border-l flex  border-tertiary-500 p-6 min-h-[calc(100vh-120px)]"
		regionPage="px-6"
	>
		<svelte:fragment slot="sidebarRight">
			<div class="mb-12 text-center w-full">
				<h3 class="">{data.userId}</h3>
			</div>
		</svelte:fragment>
		<svelte:fragment slot="pageHeader">
			<h1 class="h2 text-center">{data.userId}</h1>
		</svelte:fragment>
		<section class="container flex flex-col align-middle justify-center items-center">
			<PostList posts={data.posts} />
		</section>
	</AppShell>
</div>
