<script>
	let message = '';
	let isOpen = false;

	export function showSnackbar(text) {
		message = text;
		isOpen = true;

		setTimeout(() => {
			closeSnackbar();
		}, 3000); // Close the Snackbar after 3 seconds
	}

	function closeSnackbar() {
		isOpen = false;
	}
</script>

{#if isOpen}
	<div
		class="fixed bottom-0 left-0 right-0 flex justify-between items-center p-4 bg-gray-800 text-white z-10"
	>
		<p>{message}</p>
		<button class="text-white" on:click={closeSnackbar}>Close</button>
	</div>
{/if}
