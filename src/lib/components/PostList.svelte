<script lang="ts">
	import { formatDatetimeToHumanReadable, trancate } from '$lib/shared/utils.js';
	import { Avatar } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';

	export let posts = [];
</script>

<div class="w-100">
	{#each posts as { id, title, content, author, published_at, tags, view_count }, i}
		<div class="card my-6 relative">
			<a href="/posts/{id}">
				<header class="card-header h3 text-left">{title}</header>
				<section class="p-4 text-left">
					<!-- {discription} -->
					<div class="hidden lg:block">
						{trancate(content, 300)}
					</div>
				</section>
			</a>
			<footer class="card-footer">
				<div class="flex">
					<div class="flex align-middle items-center gap-4 text-sm italic">
						<span>
							<Avatar
								src="https://lh3.googleusercontent.com/a/ACg8ocLkaCye9ZoiP2MdgYa9TrZmtyiyytpeAHBYpFb4UcgwC5I=s96-c"
								initials="AB"
								width="w-10"
							/>
						</span>
						<span class="flex flex-col items-start">
							<a class="hover:text-primary-400" href="/">
								<span>
									Adrian Tam
									<!-- {author.substring(0, 8)} -->
								</span>
							</a>
							<div class="text-tertiary-700">
								{formatDatetimeToHumanReadable(published_at, 'en-US')}
							</div>
						</span>
					</div>
					<div class="right-0 absolute bottom-0 space-x-2 m-4">
						{#each tags as tag}
							<span class="chip variant-filled-secondary">{tag}</span>
						{/each}
					</div>
				</div>
			</footer>
			<div class="absolute top-0 right-0 m-4">
				<div class="flex align-middle items-center gap-3 px-2">
					<Icon icon="octicon:eye-16" />{view_count}
				</div>
			</div>
		</div>
	{/each}
</div>
