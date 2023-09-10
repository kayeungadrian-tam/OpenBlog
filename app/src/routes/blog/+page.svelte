<script>
	import Welcome from '$lib/components/Welcome.svelte';
	import Card from '$lib/components/Card.svelte';
	import Recommend from '$lib/components/Recommend.svelte';
	import { Pagination } from 'carbon-components-svelte';

	export let data;

	const postsPerPage = 5;
	let currentPage = 1;
	let totalPages = Math.ceil(data.postList.length / postsPerPage);

	let currentPosts = [];

	function updatePosts() {
		const startIndex = (currentPage - 1) * postsPerPage;
		const endIndex = startIndex + postsPerPage;
		currentPosts = data.postList.slice(startIndex, endIndex);
	}

	/**
	 * @param {{ detail: { page: number; }; }} event
	 */
	function goToPage(event) {
		currentPage = event.detail.page;
		updatePosts();
	}

	$: totalPages = Math.ceil(data.postList.length / postsPerPage);

	$: updatePosts();
</script>

<div>
	<Welcome title="Blogs" description="Find out what people are talking about!" />
	<div class="grid gap-6 grid-cols-[1fr,16em] max-w-6xl mx-auto">
		<div class="">
			<ul>
				{#each data.postList as { slug, title, content }, i}
					<li>
						<a href="/blog/{slug}">
							<Card {title} author="Adrian Tam" {content} />
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<Recommend topStories={data.topPosts} />
	</div>
</div>
