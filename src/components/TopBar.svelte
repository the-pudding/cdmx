<script>
	import Buttons from "$components/TopBar.Buttons.svelte";
	import logo from "$svg/logo.svg";
	import { fade } from "svelte/transition";
	import scrollY from "$stores/scrollY.js";

	$: visible = $scrollY > 300;
</script>

<section id="top-bar">
	{#if visible}
		<div class="logo" transition:fade>
			<a href="https://pudding.cool" aria-label="The Pudding">{@html logo}</a>
		</div>
	{/if}

	<div class="logo invisible">
		<a href="https://pudding.cool" aria-label="The Pudding">{@html logo}</a>
	</div>

	{#if visible}
		<Buttons />
	{/if}
</section>

<style>
	#top-bar {
		position: fixed;
		width: 100%;
		display: flex;
		justify-content: space-between;
		right: 10px;
		top: 10px;
		z-index: 100;
	}
	.invisible {
		visibility: hidden;
	}
	.logo {
		width: 35px;
		margin-left: 24px;
	}
	.logo a {
		border: none;
		display: block;
		color: var(--color-fg);
	}
</style>
