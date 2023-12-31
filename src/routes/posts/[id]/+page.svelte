<script lang="ts">
	import { Avatar, CodeBlock } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';

	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { formatDatetimeToHumanReadable } from '$lib/shared/utils.js';
	import { marked } from 'marked';

	import storeExample from '$lib/shared/stores/postTest.js';

	export let data;

	const { post, author } = data.data;
	const { display_name, avatar_url } = author.data[0];
	const { published_at, content, view_count, title, tags } = post[0];

	const viewCount = view_count;
	const score = data.score;

	let likes: number = 0;
	let dislikes: number = 0;

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

	const setPostViewCount = async (likes: number = 0, dislikes: number = 0) => {
		const postId = post[0].id;

		let { data: posts_score, error } = await data.supabase
			.from('posts_score')
			.select('score')
			.eq('post_id', postId);

		posts_score?.forEach((post) => {
			console.log(post.score);
			switch (post.score) {
				case 0:
					dislikes++;
					break;
				case 2:
					likes++;
					break;
				default:
					break;
			}
		});

		return {
			likes: likes,
			dislikes: dislikes
		};
	};

	async function updatePostScore() {
		const userId = data.session?.user.id;
		const supabase = data.supabase;
		const postId = post[0].id;

		let { data: _res, error: _e } = await supabase
			.from('posts_score')
			.select('score')
			.eq('user_id', userId)
			.eq('post_id', postId)
			.single();

		if (_res) {
			return;
		}

		let { data: res, error: e } = await supabase.from('posts_score').insert({
			user_id: userId,
			post_id: postId,
			score: 1
		});
	}

	const channel = data.supabase
		.channel('table-db-changes')
		.on(
			'postgres_changes',
			{
				event: 'UPDATE',
				schema: 'public',
				table: 'posts_score'
			},
			(payload) => {
				setPostViewCount().then((res) => {
					likes = res.likes;
					dislikes = res.dislikes;
				});
			}
		)
		.subscribe();

	async function addPostCount() {
		const userId = data.session?.user.id;
		const supabase = data.supabase;
		const postId = post[0].id;

		let { data: res, error: e } = await supabase.rpc('increment', { x: 1, row_id: postId });
		console.log('res', res);
		console.log('e', e);
	}

	setPostViewCount().then((res) => {
		likes = res.likes;
		dislikes = res.dislikes;
	});

	const _cleanTitleString = (postTitle: string) => {
		let transformedTitle = postTitle.toLowerCase();

		transformedTitle = transformedTitle.replace(/[^\w\s]/g, '');
		transformedTitle = transformedTitle.replace(/\s+/g, '-');

		return transformedTitle;
	};

	const setUrlName = (value: string) => {
		const url = new URL(window.location.toString());
		url.pathname = `/post/${_cleanTitleString(value)}`;
		history.replaceState(history.state, '', url);
	};

	onMount(() => {
		setLocalScore(score);
		addPostCount();

		updatePostScore();
		setUrlName(title);
	});

	// $: storeExample;
</script>

<div class="container h-full mx-auto flex items-center justify-center">
	<div class="space-y-8 text-left flex flex-col items-center py-8 max-w-3xl">
		<h1 class="h1">{title}</h1>
		<div class="flex gap-4 w-auto mb-2">
			{#each tags as tag}
				<div class="chip variant-filled-secondary px-8 h-8">{tag}</div>
			{/each}
		</div>

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
				<div class="logo-cloud gap-1 flex h-16">
					<button
						type="submit"
						formaction="?/like"
						disabled={data.session ? false : true}
						class=" logo-item btn {$storeExample == 'like'
							? 'btn variant-soft-success'
							: 'variant-surface-tertiary'}"
					>
						<Icon icon="octicon:thumbsup-16" width="20" />
						<span>Like</span>
						<span>{likes}</span>
					</button>

					<button
						formaction="?/dislike"
						type="submit"
						disabled={data.session ? false : true}
						class=" logo-item btn {$storeExample == 'dislike'
							? 'btn variant-soft-error'
							: 'variant-surface-tertiary'}"
					>
						<Icon icon="octicon:thumbsdown-16" width="20" />
						<span>Dislike</span>
						<span>{dislikes}</span>
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

		<article class="prose dark:prose-invert prose-code:text-primary-600 text-lg">
			{@html marked.parse(content)}
		</article>
	</div>
</div>
