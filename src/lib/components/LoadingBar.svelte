<script lang="ts">
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	let p = 0;
	let visible = false;
	onMount(() => {
		visible = true;
		function next() {
			p += 0.1;
			const remaining = 1 - p;
			if (remaining > 0.15) setTimeout(next, 500 / remaining);
		}
		setTimeout(next, 250);
	});
</script>

<!-- <h1>testing</h1> -->
<div class=" top-[68px] absolute left-0 w-full h-4">
	<ProgressBar height="h-1" />
</div>
