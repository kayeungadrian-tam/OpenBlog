<script>
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import AuthComponent from '$lib/common/Auth.svelte';

	import Welcome from '$lib/components/Welcome.svelte';
	import Tabs from '$lib/components/Tabs.svelte';

	let items = [
		{
			label: 'Home',
			value: 1,
			component: Welcome
		},
		{
			label: 'Auth',
			value: 2,
			component: AuthComponent
		}
	];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Welcome />
	<Tabs {items} />
</section>
