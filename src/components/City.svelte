<script>
  import { zoom, select } from "d3";
  import { onMount } from "svelte";
  import Zoom from "svelte-zoom";

  let wrapper;
  let image;
  const handleZoom = (e) => {
    const x = e.transform.x;
    const y = e.transform.y;
    const s = e.transform.k;
    const h = height / 3;

    const newX = Math.min((width / 2) * (s - 1), Math.max((width / 2) * (1 - s), x));
    const newY = Math.min(
      (height / 2) * (s - 1) + h * s,
      Math.max((height / 2) * (1 - s) - h * s, y)
    );
    console.log({ newX, newY });

    select(image).style(
      "transform",
      "translate(" + newX + "px," + newY + "px) scale(" + e.transform.k + ")"
    );
    select(image).style("transform-origin", "0 0");
  };
  const z = zoom().on("zoom", handleZoom);

  let height;
  let width;
  // onMount(() => {
  //   z.scaleExtent([1, 5]);
  //   // z.extent([
  //   //   [0, 0],
  //   //   [width, height]
  //   // ]);
  //   // z.translateExtent([0, 0], [width, height]);

  //   select(wrapper).call(z);
  // });
</script>

<!-- <Zoom src="assets/img/city.jpg" /> -->

<div class="wrapper" bind:this={wrapper} bind:clientHeight={height} bind:clientWidth={width}>
  <div class="background" bind:this={image} />
</div>

<style>
  .wrapper {
    height: 100vh;
  }
  .background {
    height: 100%;

    /* The image used */
    background-image: url("assets/img/city.jpg");

    /* Buffer version */
    /* max-width: 989px;
    margin: auto; */

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
