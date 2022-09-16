<script>
	import { soundOn, ambi, ambiVolume } from "$stores/misc.js";
	import { Howl } from "howler";
	import { previous } from "$stores/previous.js";

	const duration = 6000;
	const volumes = [0.4, 0.6, 0.75];
	const previousAmbi = previous(ambi);

	let started = false;
	const sounds = [1, 2, 3].map(
		(i) =>
			new Howl({
				src: [`assets/sound/ambi/loop${i}.mp3`],
				loop: true,
				html5: true
			})
	);

	$: $ambi, rotateTrack();
	$: $ambiVolume, changeVolume();
	$: $soundOn, handleMute();

	const changeVolume = () => {
		if ($ambi) {
			console.log("new volume", $ambiVolume);
			const featuredSound = sounds[$ambi - 1];
			const currentVolume = featuredSound.volume();

			featuredSound.fade(currentVolume, $ambiVolume, duration);
		}
	};

	const handleMute = () => {
		sounds.forEach((sound) => {
			sound.mute(!$soundOn);
		});
	};

	const rotateTrack = () => {
		if ($ambi) {
			const featuredSound = sounds[$ambi - 1];

			if (!started) {
				started = true;

				sounds.forEach((sound) => {
					sound.volume(0);
					sound.play();
				});

				featuredSound.fade(0, 1, duration);
			} else {
				const others = sounds.filter((d) => d !== featuredSound);
				others.forEach((d) => {
					d.fade(d.volume(), 0, $ambi === 1 ? 5000 : 1000);
				});

				let prevVolume;
				if (!$previousAmbi || ($previousAmbi === 1 && $ambi === 3)) {
					prevVolume = 0;
				} else {
					prevVolume = volumes[$previousAmbi - 1];
				}

				const destinationVolume = volumes[$ambi - 1];

				featuredSound.fade(prevVolume, destinationVolume, duration);
			}
		}
	};
</script>
