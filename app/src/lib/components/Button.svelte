<script lang="ts">
	export let label = 'Click me';
	export let icon = '';
	export let primary = false;
	export let func = () => {
		console.log('clicked');
	};
</script>

<!-- Primary button -->
<div class="p-2">
	{#if primary}
		<button
			on:click={func}
			class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300 ease-in-out flex items-center justify-center gap-1"
		>
			{#if icon}
				<img src="https://img.icons8.com/color/48/000000/{icon}.png" class="w-6" alt={icon} />
			{/if}
			{label}
		</button>
	{:else}
		<button
			on:click={func}
			class="bg-white-400 hover:bg-gray-300 text-dark font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300 ease-in-out flex items-center justify-center gap-1"
		>
			{#if icon}
				<img src="https://img.icons8.com/color/48/000000/{icon}.png" class="w-6" alt={icon} />
			{/if}
			{label}
		</button>
	{/if}
</div>
