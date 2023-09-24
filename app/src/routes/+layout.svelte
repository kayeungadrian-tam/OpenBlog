<script lang="ts">
	import '../app.postcss';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	import { AppShell, initializeStores } from '@skeletonlabs/skeleton';
	import AppBar from '$lib/components/AppBar.svelte';

	import { Modal, getModalStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	export let data;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				// invalidate('supabase:auth');
				invalidateAll();
			}
		});

		return () => subscription.unsubscribe();
	});
	initializeStores();
</script>

<Modal />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar session={data.session} />
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />

	<svelte:fragment slot="footer">
		<div class="bg-primary-300 text-secondary-500">Footer</div>
	</svelte:fragment>
</AppShell>
