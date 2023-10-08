<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';

	import PostContent from '$lib/components/PostContent.svelte';
	import { enhance } from '$app/forms';

	export let data;

	const { display_name, avatar_url } = data.author_meta;
	const title = data.post.data[0].title;
	const { json_content, description } = data.post.data[0];

	const viewCount = data.view;
	const score = data.score;

	const likeClassMap = [
		'btn variant-surface-tertiary',
		'btn variant-soft-success',
		'btn variant-soft-error'
	];

	let buttonStyle = likeClassMap[score];

	$: buttonStyle;
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
				<p>Published on Apr 15</p>
			</div>
		</div>

		<div class="w-full py-0">
			<form method="post" use:enhance>
				<input type="hidden" name="post_id" value={data.post.data[0].slug} />
				<input type="hidden" name="author_id" value={data.post.data[0].author} />

				<div class="logo-cloud gap-1 flex h-16">
					<button type="submit" formaction="?/like" class=" logo-item btn variant-surface-tertiary">
						<Icon icon="octicon:thumbsup-16" width="20" />
						<span>Like</span>
						<span>1.2k</span>
					</button>

					<button formaction="?/dislike" type="submit" class=" logo-item btn ${buttonStyle}">
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
