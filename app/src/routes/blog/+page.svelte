<script>
	import Welcome from '$lib/components/Welcome.svelte';
	import Card from '$lib/components/Card.svelte';
	import Recommend from '$lib/components/Recommend.svelte';

	export let data;
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
