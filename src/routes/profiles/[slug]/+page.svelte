<script>
	import { AppShell, Avatar } from '@skeletonlabs/skeleton';

	export let data;

	let { display_name, email, avatar_url } = data.profile;
</script>

<div class="mx-16 my-4">
	<AppShell
		slotSidebarRight="w-1/3 border-1 border border-tertiary-500 p-6 flex align-middle justify-center  items-center gap-4"
		regionPage="px-6"
	>
		<svelte:fragment slot="sidebarRight">
			<Avatar src={avatar_url} />
			<p>{email}</p>
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
