<script>
	import { AppShell, Avatar } from '@skeletonlabs/skeleton';

	export let data;

	let { display_name, email, avatar_url } = data.profile;
	const followings = data.following;
</script>

<div class="mx-16 my-4">
	<AppShell
		slotSidebarRight="w-1/3 border-1 border border-tertiary-500 p-6 min-h-[calc(100vh-120px)]"
		regionPage="px-6"
	>
		<svelte:fragment slot="sidebarRight">
			<div class="flex flex-col justify-center align-middle items-start space-y-4">
				<Avatar src={avatar_url} width="w-28" />
				<p>{email}</p>
				<a class="text-primary-700" href="/">update photo</a>
			</div>
			<div class="my-12" data-sveltekit-reload>
				<h3 class="h3">Following</h3>
				{#each followings as { id, age, image, email }, i}
					<a href="/profiles/24b2d0de-d683-43de-bcc4-8d8988f77558">
						<div class="text-sm text-tertiary-500 my-4 flex align-middle items-center gap-2">
							<Avatar src={image} width="w-6" />
							{email}
						</div>
					</a>
				{/each}
			</div>
		</svelte:fragment>
		<svelte:fragment slot="pageHeader">
			<h1 class="h1">{display_name}</h1>
		</svelte:fragment>
		<section>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ab labore facere architecto.
			Nostrum distinctio cumque ratione itaque saepe, asperiores maxime laudantium mollitia
			perspiciatis odio corrupti, ea omnis velit dolor.
		</section>
	</AppShell>
</div>
