<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';

	import PostContent from '$lib/components/PostContent.svelte';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { formatDatetimeToHumanReadable } from '$lib/shared/utils.js';
	import storeExample from '$lib/shared/stores/postTest.js';

	export let data;

	const { post, author } = data.data;

	const { display_name, avatar_url } = author.data[0];

	const { published_at, json_content, description, title, tags } = post[0];

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

	async function setPostCount() {
		const userId = data.session?.user.id;
		const supabase = data.supabase;
		const postId = post[0].id;

		let { data: posts_score, error } = await supabase
			.from('posts_score')
			.select('score')
			.eq('post_id', postId)
			.eq('user_id', userId);

		if (posts_score.length === 0) {
			let { data: res, error: e } = await supabase
				.from('posts_score')
				.insert([{ user_id: userId, post_id: postId, score: 1 }])
				.select();
		}
	}

	onMount(() => {
		setLocalScore(score);
		setPostCount();
	});

	$: storeExample;
</script>

<div class="container h-full mx-auto flex items-center justify-center">
	<div class="space-y-8 text-left flex flex-col items-center py-8 max-w-3xl">
		<h1 class="h1">{title}</h1>
		<h3 class="h3 text-tertiary-400">
			{description}
		</h3>

		<div class="flex w-full justify-evenly gap-8 align-middle items-stretch">
			<div class="flex items-center gap-8 justify-start w-full">
				<Avatar src={avatar_url || display_name} width="w-12" class="my-4" />
				<div>
					<p>{display_name}</p>
					<p>
						<span>
							{formatDatetimeToHumanReadable(published_at, 'en-US')}
						</span>
					</p>
				</div>
			</div>
			<div class="grid grid-cols-2 gap-4 w-auto justify-end items-end mb-2">
				{#each tags as tag}
					<div class="chip variant-filled-secondary px-8 h-8">{tag}</div>
				{/each}
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
				<!-- <input type="hidden" name="post_id" value={data.post.data[0].slug} /> -->
				<!-- <input type="hidden" name="author_id" value={data.post.data[0].author} /> -->

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
	</div>
</div>
