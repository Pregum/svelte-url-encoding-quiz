import { writable } from 'svelte/store';
// import { setInterval } from 'node:timers';

export const countdown = writable(3);
export const gameStarted = writable(false);
export const timeLeft = writable(30); // 制限時間（秒）

export function startCountdown(onCompletedCountdown: () => void) {
	const interval = setInterval(() => {
		countdown.update((n) => {
			if (n > 1) {
				return n - 1;
			} else {
				clearInterval(interval);
				gameStarted.set(true);
				onCompletedCountdown();
				return 0;
			}
		});
	}, 1000);
}

export function startTimer() {
	const interval = setInterval(() => {
		timeLeft.update((t) => {
			if (t > 0) {
				return t - 0.1;
			} else {
				clearInterval(interval);
				return 0;
			}
		});
	}, 100);
}
