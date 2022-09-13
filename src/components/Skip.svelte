<script>
	import { inModal, language } from "$stores/misc.js";

	const skip = () => {
		const el = document.getElementById("detect-end");
		el.scrollIntoView();
		$inModal = true;
	};
</script>

<section id="skip">
	<p>
		Read on to learn about the relationship between the city & its street
		vendors,
	</p>
	<a href="#" on:click={skip}
		>or skip ahead to explore the sounds of the city on your own.</a
	>
</section>

<style>
	section {
		width: 90%;
		max-width: 700px;
		margin: 5em auto;
		padding: 1em;
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 3px solid var(--color-fg);
	}
	p {
		font-size: 1.8em;
		padding: 0.3em;
		margin-top: 0;
		text-align: center;
	}
	a {
		font-size: 1.2em;
		text-align: center;
		color: var(--highlight);
		font-family: var(--sans);
	}
	a:hover {
		background: var(--color-gray-100);
	}
</style>
