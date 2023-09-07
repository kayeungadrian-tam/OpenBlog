<script>
	import { onMount } from 'svelte';
	import { OverflowMenu, OverflowMenuItem } from 'carbon-components-svelte';
	import CaretDown from 'carbon-icons-svelte/lib/CaretDown.svelte';
	import UserAvatar from 'carbon-icons-svelte/lib/UserAvatar.svelte';
	import Settings from 'carbon-icons-svelte/lib/Settings.svelte';
	import Bookmark from 'carbon-icons-svelte/lib/Bookmark.svelte';
	import Logout from 'carbon-icons-svelte/lib/Logout.svelte';

	import { settingData } from '$lib/config/settings';
	import { Icon, PencilSquare } from 'svelte-hero-icons';

	export let session = null;

	let currentTimestamp = new Date();
	let url = settingData.github;
	/**
	 * @type {HTMLButtonElement | null}
	 */
	let _buttonRef = null;
	$: _buttonRef = null;

	let isOpen = false;

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	onMount(() => {
		const interval = setInterval(() => {
			currentTimestamp = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<header class="bg-white shadow-md p-4">
	<div class="mx-auto px-10">
		<nav class="flex items-center justify-between">
			<div class="text-xl font-semibold text-purple-700">
				<a href="/">My Blogs</a>
			</div>

			<div class="flex gap-4 align-middle items-center">
				<a
					href="/blog"
					class="block transition duration-300 ease-in-out hover:font-semibold hover:text-purple-700"
					rel="self">Blogs</a
				>

				{#if !session}
					<a href="/login" rel="self">Sign In</a>
				{:else}
					<a
						href="/write"
						class="block transition duration-300 ease-in-out hover:font-semibold hover:text-purple-700"
					>
						<div class="flex items-center gap-1">
							<Icon src={PencilSquare} class="w-5" />
							Write
						</div>
					</a>

					<OverflowMenu
						icon={CaretDown}
						style="width: auto"
						class="bg-transparent"
						data-sveltekit-noscroll
						flipped
					>
						<!-- <div slot="menu" class="bg-transparent" /> -->
						<div slot="menu">
							<img
								src={session.user.user_metadata.avatar_url}
								alt="avatar"
								class="h-12 rounded-full"
							/>
						</div>
						<OverflowMenuItem text="Profile">
							<span class="flex gap-4">
								<UserAvatar />
								Profile
							</span>
						</OverflowMenuItem>
						<OverflowMenuItem>
							<span class="flex gap-4">
								<Settings />
								Settings
							</span>
						</OverflowMenuItem>
						<OverflowMenuItem>
							<span class="flex gap-4">
								<Bookmark />
								Favorites
							</span>
						</OverflowMenuItem>
						<OverflowMenuItem danger href="/logout" hasDivider>
							<span class="flex gap-4">
								<Logout />
								Sign out
							</span>
						</OverflowMenuItem>
					</OverflowMenu>

					<button
						id="options-menu"
						class="relative inline-block"
						aria-haspopup="true"
						aria-expanded="true"
						data-dropdown-toggle="dropdown"
						on:click={toggleDropdown}
					/>

					{#if false}
						<div
							id="dropdown"
							class="z-10
							absolute
							shadow-2xl
							rounded-lg p-1
							right-10
							 top-20 bg-white divide-y divide-gray-100 w-44 text-center"
						>
							<div class="text-sm text-gray-700 p-2 flex justify-center">
								{session.user.user_metadata.full_name}
							</div>
							{#each dropDownItems as item}
								{#each Object.keys(item) as section}
									<ul class="text-sm text-gray-700">
										{#each item[section] as link}
											<li>
												<a
													href="#"
													class="block transition duration-300 ease-in-out hover:font-semibold hover:text-purple-700"
												>
													<div class="flex items-center justify-start gap-4 px-4 py-2">
														{#if link.icon}
															<Icon src={link.icon} class="w-5 " />
														{/if}
														{link.label}
													</div>
												</a>
											</li>
										{/each}
									</ul>
								{/each}

								<div class="text-sm text-gray-700 mt-6 p-2 w-full flex justify-center">
									<form action="/logout" method="post">
										<button
											type="submit"
											class="block transition w-full duration-300 ease-in-out hover:font-semibold hover:text-purple-700"
										>
											Sign out
										</button>
									</form>
								</div>
							{/each}
						</div>
					{/if}
				{/if}
				<!-- <Dropdown /> -->
				<!-- {session} -->
			</div>
		</nav>
	</div>
</header>
