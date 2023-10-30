<script>
	import { enhance } from '$app/forms';
	import { AppShell, Avatar } from '@skeletonlabs/skeleton';

	export let data;

	let { display_name, email, avatar_url, id } = data.profile;

	let name = display_name;

	$: name;

	const followings = data.following;
</script>

<div class="mx-16 my-4">
	<AppShell
		slotSidebarRight="w-1/3 border-3 border-l border-tertiary-500 p-6 min-h-[calc(100vh-120px)]"
		regionPage="px-6"
	>
		<svelte:fragment slot="sidebarRight">
			<div class="mb-12" data-sveltekit-reload>
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
			<h1 class="h1 text-center">{display_name}</h1>
		</svelte:fragment>
		<section class="container flex flex-col align-middle justify-center items-center">
			<div>
				<form method="post" class="flex flex-col items-center gap-4 px-16 max-w-2xl container">
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<div class="input-group-shim">email</div>
						<input name="email" type="text" placeholder={email} disabled={true} />
					</div>
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<div class="input-group-shim">Display name:</div>
						<input name="display_name" type="text" placeholder="Display Name" bind:value={name} />
					</div>
					<Avatar src={avatar_url} width="w-48" />
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<div class="input-group-shim">Upload photo</div>

						<input class="input" type="file" />
					</div>
					<div class="mt-16">
						<button type="submit" formaction="?/update" class="btn variant-filled-primary"
							>Update</button
						>
					</div>
				</form>
			</div>
		</section>
	</AppShell>
</div>
