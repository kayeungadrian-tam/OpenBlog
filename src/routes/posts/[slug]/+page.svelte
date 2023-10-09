<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';

	import PostContent from '$lib/components/PostContent.svelte';
	import { enhance } from '$app/forms';
	import type { Writable } from 'svelte/store';
	import { localStorageStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let data;

	const storeExample: Writable<string> = localStorageStore('storeExample', '');

	const { display_name, avatar_url } = data.author_meta;
	const title = data.post.data[0].title;
	const { json_content, description } = data.post.data[0];

	const viewCount = data.view;
	const score = data.score;

	function setLocalScore(score: number) {
		switch (score) {
			case 0:
				storeExample.set('dislike');
				break;
			case 2:
				storeExample.set('like');
				break;
			default:
				storeExample.set('');
				break;
		}
	}
	onMount(() => {
		setLocalScore(score);
	});

	function formatDatetimeToHumanReadable(datetimeStr: string, locale: string): string {
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};

		const datetime = new Date(datetimeStr);

		const formattedDatetime = new Intl.DateTimeFormat(locale, options).format(datetime);

		return formattedDatetime;
	}

	$: storeExample;
</script>

<div class="container h-full mx-auto flex items-center justify-center">
	<div class="space-y-8 text-left flex flex-col items-center py-8 max-w-3xl">
		<h1 class="h1">{title}</h1>
		<h3 class="h3 text-tertiary-400">
			{description}
		</h3>
		<div class="flex items-center gap-8 justify-start w-full">
			<Avatar src={avatar_url || display_name} width="w-12" class="my-4" />
			<div>
				<p>{display_name}</p>
				<p>
					<span>
						{formatDatetimeToHumanReadable(data.post.data[0].published_at, 'en-US')}
					</span>
				</p>
			</div>
		</div>

		<div class="w-full py-0">
			<form
				method="post"
				use:enhance={(event) => {
					const _action = event.action.search.substring(2);
					storeExample.set(_action);
					return async ({ update }) => {
						await update();
					};
				}}
			>
				<input type="hidden" name="post_id" value={data.post.data[0].slug} />
				<input type="hidden" name="author_id" value={data.post.data[0].author} />

				<div class="logo-cloud gap-1 flex h-16">
					<button
						type="submit"
						formaction="?/like"
						class=" logo-item btn {$storeExample == 'like'
							? 'btn variant-soft-success'
							: 'variant-surface-tertiary'}"
					>
						<Icon icon="octicon:thumbsup-16" width="20" />
						<span>Like</span>
						<span>1.2k</span>
					</button>

					<button
						formaction="?/dislike"
						type="submit"
						class=" logo-item btn {$storeExample == 'dislike'
							? 'btn variant-soft-error'
							: 'variant-surface-tertiary'}"
					>
						<Icon icon="octicon:thumbsdown-16" width="20" />
						<span>Dislike</span>
						<span>1.2k</span>
					</button>

					<div class="btn variant-surface-tertiary hover:">
						<Icon icon="octicon:eye-16" width="20" />
						<span>View</span>
						<span>{viewCount}</span>
					</div>
				</div>

				<div />
			</form>
		</div>

		<PostContent contents={json_content.contents} />
		<button type="button" class="btn variant-ghost-tertiary" on:click={() => {}}> Post it. </button>
	</div>
</div>

<div
	class="
	w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100"
>
	OSEMTOESs
</div>
