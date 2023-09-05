<script>
	export let data;
	$: post_data = data.data[0];
	import Welcome from '$lib/components/Welcome.svelte';

	import SvelteMarkdown from 'svelte-markdown';
	const source = `
  # This is a header

  This is a paragraph.

  * This is a list
  * With two items
      1. And a sublist
      2. That is ordered
          * With another
          * Sublist inside

  | And this is | A table |
  |-------------|---------|
  | With two    | columns |
`;
</script>

<div>
	<Welcome title={post_data.title} />

	<div class="max-w-6xl mx-auto">
		<h1>{post_data.title}</h1>
		<p>{post_data.content}</p>
	</div>

	<SvelteMarkdown {source} />
</div>
