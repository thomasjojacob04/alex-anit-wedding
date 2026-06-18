<template>
  <div class="popper-burst" aria-hidden="true">
    <span
      v-for="p in pieces"
      :key="p.id"
      class="popper-burst__piece"
      :style="{
        left: p.left + '%',
        bottom: p.bottom + '%',
        backgroundColor: p.color,
        animationDelay: p.delay + 's',
        animationDuration: p.duration + 's',
        width: p.size + 'px',
        height: p.size * (p.round ? 1 : 0.4) + 'px',
        borderRadius: p.round ? '50%' : '2px',
        '--tx': p.tx + 'vw',
        '--ty': p.ty + 'vh',
        '--rot': p.rot + 'deg',
      }"
    ></span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const colors = ['#8b004a', '#dbbac4', '#c483a0', '#b45989', '#f2efe7', '#ffffff']

function makeBurst(side, count) {
  // side: 'left' launches from bottom-left corner, 'right' from bottom-right
  const originLeft = side === 'left' ? -2 : 98
  return Array.from({ length: count }, (_, i) => {
    // Spread angle skews inward and upward from the corner
    const angle = side === 'left'
      ? (10 + Math.random() * 70)   // 10°-80° from horizontal, sweeping up-right
      : (100 + Math.random() * 70)  // mirrored sweep up-left
    const rad = (angle * Math.PI) / 180
    const distance = 55 + Math.random() * 40 // vw/vh travel distance
    const tx = Math.cos(rad) * distance
    const ty = -Math.abs(Math.sin(rad) * distance) - 20

    return {
      id: `${side}-${i}`,
      left: originLeft,
      bottom: -2,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.35,
      duration: 1.4 + Math.random() * 1.1,
      size: 5 + Math.random() * 8,
      round: Math.random() > 0.5,
      tx: tx.toFixed(1),
      ty: ty.toFixed(1),
      rot: Math.round(360 + Math.random() * 540),
    }
  })
}

// Large volume, launched from both bottom corners
const pieces = ref([
  ...makeBurst('left', 90),
  ...makeBurst('right', 90),
])
</script>

<style scoped>
.popper-burst {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 500;
  overflow: hidden;
}

.popper-burst__piece {
  position: absolute;
  opacity: 0.95;
  animation-name: popper-fly;
  animation-timing-function: cubic-bezier(0.15, 0.7, 0.4, 1);
  animation-fill-mode: forwards;
}

@keyframes popper-fly {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx), var(--ty)) rotate(var(--rot));
    opacity: 0;
  }
}
</style>
