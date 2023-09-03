<script>
	// import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	import { settingData } from '$lib/config/settings';

	import Dropdown from '$lib/components/Dropdown.svelte';
	import { Icon, Cog6Tooth, User, Bookmark, PencilSquare } from 'svelte-hero-icons';

	export let session = null;

	let currentTimestamp = new Date();
	let url = settingData.github;

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

	const dropDownItems = [
		{
			section_1: [
				{
					label: 'Profile',
					url: '/profile',
					icon: User
				},
				{
					label: 'Settings',
					url: '/settings',
					icon: Cog6Tooth
				},
				{
					label: 'Bookmark',
					url: '/bookmark',
					icon: Bookmark
				}
			]
		}
	];
</script>

<header class="bg-white shadow-md p-4">
	<div class="mx-auto px-10">
		<nav class="flex items-center justify-between">
			<div class="text-xl font-semibold text-purple-700">
				<a href="/">My Blogs</a>
			</div>

			<div class="flex gap-4 align-middle items-center">
				<a href="/blog" rel="self">Blogs</a>
				<a
					href="#"
					class="block transition duration-300 ease-in-out hover:font-semibold hover:text-purple-700"
				>
					<div class="flex items-center gap-1">
						<Icon src={PencilSquare} class="w-5" />
						Write
					</div>
				</a>
				{#if !session}
					<a href="/login" rel="self">Sign In</a>
				{:else}
					<button
						id="options-menu"
						class="relative inline-block"
						aria-haspopup="true"
						aria-expanded="true"
						data-dropdown-toggle="dropdown"
						on:click={toggleDropdown}
					>
						<div class="flex items-center">
							<img src={session.user.user_metadata.avatar_url} alt="avatar" class="h-12" />

							<svg
								class="-mr-1 ml-2 h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M7.293 6.293a1 1 0 011.414 0L10 7.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414 1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
					</button>

					{#if isOpen}
						<div
							id="dropdown"
							class="z-10
							absolute
							shadow-2xl
							rounded-lg p-1

							 top-20 bg-white divide-y divide-gray-100 w-44 text-center"
						>
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

								<div class="text-sm text-gray-700 mt-6 p-2 flex justify-center">
									<form action="/logout" method="post">
										<button
											type="submit"
											class="block transition duration-300 ease-in-out hover:font-semibold hover:text-purple-700"
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
