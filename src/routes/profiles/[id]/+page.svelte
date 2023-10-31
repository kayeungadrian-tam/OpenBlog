<script>
	// Import markdown conversion library
	import { marked } from 'marked';

	// Declare a variable to store the markdown data
	let markdown = `
    # test

    ## header 2

    * 1
    * 2
    
    `;

	const content = `
  # Welcome to my Markdown site! 

  _Here's a list of my favorite fruits:_
  ## test
  ### gead



  * 1
  * 2
  
  - [ ] adrain

  - [x] asd
  
    > blockquote

    [ad](asd)

    
    ![sa](https://media.istockphoto.com/id/1470130937/photo/young-plants-growing-in-a-crack-on-a-concrete-footpath-conquering-adversity-concept.webp?b=1&s=170667a&w=0&k=20&c=IRaA17rmaWOJkmjU_KD29jZo4E6ZtG0niRpIXQN17fc=)

  

    | Fruit | Rating |
    | --- | --- |
    | Banana | 10 |
    | Apple | 10 |
    | Cherry | 10 |
    `;
</script>

<textarea bind:value={markdown} class="text-primary-700" placeholder="Enter markdown here" />

<main class="m-5">
	<article class="prose dark:prose-invert prose-code:text-primary-600">
		{@html marked.parse(markdown)}
	</article>
</main>

<!-- Make it look (slightly) nicer ;) -->
<style>
	.prose {
	}

	textarea,
	.preview {
		box-sizing: border-box;
		display: block;
		width: 100%;
	}

	textarea {
		font-family: monospace, Roboto;
		height: 25%;
		border: none;
		margin: 0;
		padding: 1rem;
	}

	.preview {
		height: 75%;
		padding: 2rem;
		border-top: solid 2px #888;
	}

	h1 {
		background: #e1e1e1;
		margin: 0px;
		padding: 0.8rem;
		font-size: 1.2rem;
	}

	:global(body) {
		padding: 0;
	}
</style>
