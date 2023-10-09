<script lang="ts">
	import '../app.postcss';
	import { browser } from '$app/environment';

	import type { ComponentEvents } from 'svelte';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	import { AppShell, initializeStores } from '@skeletonlabs/skeleton';
	import AppBar from '$lib/components/AppBar.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	import { Modal, getModalStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	let y = 0;

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidateAll();
			}
		});

		return () => subscription.unsubscribe();
	});
	initializeStores();

	function scrollHandler(event: ComponentEvents<AppShell>['scroll']) {
		y = event.currentTarget.scrollTop;
	}
</script>

<Modal />
<!-- App Shell -->
<AppShell on:scroll={scrollHandler}>
	<svelte:fragment slot="header">
		{#if y < 100}
			<span class="opacity-1 duration-300 ease-in-out animate fade-in">
				<AppBar session={data.session} />
			</span>
		{:else}
			<span class="opacity-0">
				<AppBar session={data.session} />
			</span>
		{/if}
	</svelte:fragment>
	<!-- Page Route Content -->
	<main>
		<slot />
	</main>

	<svelte:fragment slot="footer">
		<!-- <div class="bg-primary-300 text-secondary-500">Footer</div> -->
	</svelte:fragment>
</AppShell>

<style>
	.fade-in {
		animation: fade-in 0.2s ease-in-out forwards;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}
</style>
