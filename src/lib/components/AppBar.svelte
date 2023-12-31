<script lang="ts">
	import type { Session } from '@supabase/supabase-js';
	import { onMount } from 'svelte';

	import { AppBar, getModalStore, popup, Avatar, LightSwitch } from '@skeletonlabs/skeleton';
	import type { ModalSettings, PopupSettings } from '@skeletonlabs/skeleton';

	import Icon from '@iconify/svelte';

	import testSetting from '$lib/configs/textSetting.json';

	export let session: Session | null;
	export let y: number;

	const userData =
		session && (session as { user: { user_metadata: any } } | null)?.user?.user_metadata;

	onMount(() => {
		console.table('session', session);
	});

	const popupFeatured: PopupSettings = {
		// Represents the type of event that opens/closed the popup
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'popupFeatured',
		// Defines which side of your trigger the popup will appear
		placement: 'bottom'
	};

	const modal: ModalSettings = {
		type: 'alert',
		title: 'Example Alert',
		body: 'This is an example modal.',
		image: 'https://i.imgur.com/WOgTG96.gif'
	};

	const openModal = () => {
		getModalStore().trigger(modal);
	};

	// A function that redacts the user's email address
	const redactEmail = (email: string) => {
		const [name, domain] = email.split('@');
		const redactedName = name.slice(0, 3) + '****';
		return `${redactedName}@${domain}`;
	};

	$: y;
</script>

<AppBar background="bg-surface-100-800-token">
	<svelte:fragment slot="lead">
		<a href="/">
			<strong class="text-xl uppercase">{testSetting.siteLogo}</strong>
		</a>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<!-- Get started button -->

		{#if !session}
			<a href="/login" class="btn variant-filled rounded-full" on:click={() => {}}>Get Started</a>
		{:else}
			<a href="/posts/write" rel="self">
				<div class="flex items-center gap-2">
					<Icon icon="octicon:pencil-16" />
					Write
				</div>
			</a>
			<button use:popup={popupFeatured}>
				<Avatar
					border="border-4 border-surface-300-600-token hover:!border-primary-500 w-9"
					initials={userData?.full_name}
					cursor="cursor-pointer"
					src={userData?.avatar_url}
					on:click={() => {
						// openModal();
					}}
				/>
			</button>

			<div data-popup="popupFeatured">
				<div class="flex flex-col items-center align-middle card p-4 shadow-xl gap-2">
					<a href="/@{session.user?.id}" class="flex items-center gap-2 px-2 w-full">
						<Icon icon="octicon:book-16" />
						<span>My Posts</span>
					</a>

					<a href="/setting/{session.user?.id}" class="flex items-center gap-2 px-2 w-full">
						<Icon icon="octicon:gear-16" />
						<span>Setting</span>
					</a>

					<!-- Divider -->
					<div class="w-full h-px bg-surface-100-800-token py-2"><hr /></div>

					<a href="/api/logout">
						<div class="flex items-center gap-2 px-2 w-full">
							<Icon icon="octicon:sign-out-16" />
							<span>Logout</span>
						</div>
						<span class="text-tertiary-500 italic opacity-50 text-sm">
							{redactEmail(userData?.email)}
						</span>
					</a>

					<div class="arrow bg-surface-100-800-token" />
				</div>
			</div>
		{/if}
		<LightSwitch />
	</svelte:fragment>
</AppBar>
