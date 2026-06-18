<template>
  <div class="ambient-confetti" aria-hidden="true">
    <span
      v-for="p in pieces"
      :key="p.id"
      class="ambient-confetti__piece"
      :style="{
        left: p.left + '%',
        backgroundColor: p.color,
        animationDelay: p.delay + 's',
        animationDuration: p.duration + 's',
        width: p.size + 'px',
        height: p.size * (p.round ? 1 : 0.4) + 'px',
        borderRadius: p.round ? '50%' : '2px',
      }"
    ></span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const colors = ['#8b004a', '#dbbac4', '#c483a0', '#b45989', '#f2efe7']

// A fixed pool of pieces, each with its own randomized, staggered, looping
// fall animation — reads as a gentle continuous drift rather than a single burst.
const pieces = ref(
  Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: colors[i % colors.length],
    delay: Math.random() * 12,
    duration: 9 + Math.random() * 6,
    size: 5 + Math.random() * 6,
    round: Math.random() > 0.5,
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
  top: -8%;
  opacity: 0;
  animation-name: ambient-fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes ambient-fall {
  0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
  6%   { opacity: 0.85; }
  90%  { opacity: 0.85; }
  100% { transform: translateY(112vh) rotate(360deg); opacity: 0; }
}
</style>
