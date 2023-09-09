<script>
	export let data;
	$: post_data = data.data[0];
	import Welcome from '$lib/components/Welcome.svelte';

	import SvelteMarkdown from 'svelte-markdown';
	import { CodeSnippet } from 'carbon-components-svelte';

	const source = `
  # Header1
  ## Header2
  ### Header3
  
  This is a paragraph with *emphasis* and **strong importance**.

  This is a paragraph with _emphasis_ and __strong importance__.

  > test
'

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

	const htmlTemplate = `
  <h1>Header1</h1>
  <h2>Header2</h2>
  <h3>Header3</h3>

  <p>This is a paragraph with <em>emphasis</em> and <strong>strong importance</strong>.</p>

  <p>This is a paragraph with <em>emphasis</em> and <strong>strong importance</strong>.</p>

  <blockquote>
    <p>test</p>
  </blockquote>

  <ul>
    <li>This is a list</li>
    <li>With two items
      <ol>
        <li>And a sublist</li>
        <li>That is ordered
          <ul>
            <li>With another</li>
            <li>Sublist inside</li>
          </ul>
        </li>
      </ol>
    </li>

  </ul>

  <table>
    <thead>
      <tr>
        <th>And this is</th>
        <th>A table</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>With two</td>
        <td>columns</td>
      </tr>
    </tbody>


  </table>

  

  `;
</script>

<div>
	<Welcome title={post_data.title} />

	<div class="max-w-6xl mx-auto px-4">
		<h1>{post_data.title}</h1>
		<p>{post_data.content}</p>

		<SvelteMarkdown {source} />
		<CodeSnippet code="yarn add " />

		{@html htmlTemplate}
	</div>
</div>
