<script>
	import { Grid, Row, Column } from 'carbon-components-svelte';
	import { Tile } from 'carbon-components-svelte';
	import { Button } from 'carbon-components-svelte';

	export let data;
</script>

<div>
	<main>
		<slot />
	</main>

	<aside class="flex items-center flex-col mt-12 gap-4">
		<h2>You may also like...</h2>

		<!-- <ul>
			{#each data.postList as { slug, title }}
				<li class="my-2">
					<a href="/blog/{slug}">{title}</a>
				</li>
			{/each}
		</ul> -->

		<Grid>
			<Row>
				{#each data.topPosts as { slug, title }}
					<Column>
						<Tile class="lg:w-[20rem]">
							<div class="mb-3">{title}</div>
							<Button size="small" href="/blog/{slug}">Read more</Button>
						</Tile>
					</Column>
				{/each}
			</Row>
		</Grid>
	</aside>
</div>
