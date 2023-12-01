<script lang="ts">
	import '../app.postcss';
	import { navigating } from '$app/stores';

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
	import LoadingBar from '$lib/components/LoadingBar.svelte';

	export let data;
	let rotatingCube;

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

{#if $navigating}
	<LoadingBar />
{/if}

<Modal />
<!-- App Shell -->
<AppShell on:scroll={scrollHandler}>
	<svelte:fragment slot="pageHeader">
		<span class="">
			<AppBar {y} session={data.session} />
		</span>
	</svelte:fragment>
	<main class="w-screen bg-surface-50-900-token min-h-[calc(100vh-120px)]">
		<slot />
	</main>

	<svelte:fragment slot="footer" />
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
