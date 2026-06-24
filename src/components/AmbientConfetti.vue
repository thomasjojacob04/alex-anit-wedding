<template>
  <div class="ambient-confetti" aria-hidden="true">
    <span
      v-for="p in pieces"
      :key="p.id"
      class="ambient-confetti__piece"
      :style="{
        left: p.left + '%',
        animationDelay: p.delay + 's',
        animationDuration: p.duration + 's',
        width: p.size + 'px',
        '--sway': p.sway + 'px',
        '--rot': p.initialRotate + 'deg',
      }"
    >
      <img
        :src="p.petal === 0 ? '/petal-pink.png' : '/petal-white.png'"
        alt=""
        class="ambient-confetti__img"
      />
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const pieces = ref(
  Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    petal: Math.random() > 0.5 ? 0 : 1,
    delay: -(Math.random() * 18),         // negative delay = already mid-fall on load, no hang
    duration: 18 + Math.random() * 10,    // 18–28s, slow drift
    size: 9 + Math.random() * 10,         // 9–19px, smaller than before
    initialRotate: Math.random() * 360,
    sway: (Math.random() - 0.5) * 50,
  }))
)
</script>

<style scoped>
.ambient-confetti {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 400;
  overflow: hidden;
}

.ambient-confetti__piece {
  position: absolute;
  top: -5%;
  opacity: 0;
  animation-name: ambient-fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform, opacity;
}

.ambient-confetti__img {
  width: 100%;
  height: auto;
  display: block;
  mix-blend-mode: multiply;
  transform: rotate(var(--rot));
}

@keyframes ambient-fall {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0;
  }
  5% {
    opacity: 0.78;
  }
  50% {
    transform: translateY(56vh) translateX(var(--sway)) rotate(180deg);
    opacity: 0.78;
  }
  92% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(112vh) translateX(calc(var(--sway) * 2)) rotate(360deg);
    opacity: 0;
  }
}
</style>