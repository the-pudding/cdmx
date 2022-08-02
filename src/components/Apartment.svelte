<script>
  let progress = -20;

  const go = () => {
    progress = 100;
  };
</script>

<div class="background">
  <!-- <div class="character" style={`--x: ${progress}vw`} /> -->
</div>

<!-- <button on:click={go}>go</button> -->
<style>
  .img-container {
    overflow: hidden;
    width: 100%;
  }
  img {
    height: 100vh;
    margin: auto;
  }
  .background {
    /* The image used */
    background-image: url("assets/img/apartment.jpeg");

    /* max-width: 989px;
    margin: auto; */
    /* Full height */
    height: 100vh;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .character {
    position: absolute;
    top: 100px;
    background: greenyellow;
    height: 200px;
    width: 200px;
    transform: translate(var(--x), 0);
    transition: transform 4s;
  }
  button {
    position: absolute;
    bottom: 100px;
    left: 20px;
    background: greenyellow;
  }
</style>
