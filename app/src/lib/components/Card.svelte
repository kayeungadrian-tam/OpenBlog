<script>
	export let title = '';
	export let content = '';
	export let author = '';
	export let date = '';
	export let tags = [];
	export let imageUrl = '';
</script>

<div
	class=" rounded shadow-sm border border-purple-100 bg-white cursor-pointer m-4 hover:border-purple-300 duration-200 ease-in-out hover:shadow-purple-300"
>
	<div class="px-6 py-4 gap-5 flex flex-col justify-evenly align-middle h-full">
		<div class="font-bold text-xl mb-2">{title}</div>
		<div class="truncate max-w-[35rem]">
			{content}
		</div>
		<div class="italic text-gray-500">
			@{author}
		</div>
	</div>
	<div class="px-6 pt-4 pb-2" />
</div>
