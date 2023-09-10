<script>
	import { settingData } from '$lib/config/settings';
</script>

<!-- Add border -->
<footer clasS="my-2">
	<div class="py-8 border-t border-solid border-gray-300">
		<div class="container mx-auto px-4">
			<div class="flex flex-row justify-evenly">
				<p class="text-gray-600 text-sm">© {settingData.year} {settingData.author}</p>
			</div>
		</div>
	</div>
</footer>
