<template>
  <div class="heart-scratch">
    <p class="heart-scratch__label">{{ label }}</p>
    <div class="heart-scratch__box" ref="container">
      <!-- Revealed value + permanent heart outline, sits underneath -->
      <svg class="heart-scratch__shape" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <clipPath :id="clipId" clipPathUnits="objectBoundingBox">
            <path :d="heartPathUnit" />
          </clipPath>
        </defs>
        <g :clip-path="`url(#${clipId})`">
          <rect x="0" y="0" width="100" height="100" fill="var(--paper)" />
        </g>
        <!-- Heart outline stays visible always, including after the scratch coating is gone -->
        <path :d="heartPathScaled" class="heart-scratch__outline" />
        <text x="50" y="50" text-anchor="middle" class="heart-scratch__text">{{ reveal }}</text>
      </svg>

      <!-- Canvas scratch layer, masked to the same heart shape -->
      <canvas
        v-show="!fullyFaded"
        ref="canvas"
        class="heart-scratch__canvas"
        :style="{ clipPath: `url(#${clipId})`, WebkitClipPath: `url(#${clipId})` }"
        @mousedown="startScratch"
        @mousemove="doScratch"
        @mouseup="stopScratch"
        @mouseleave="stopScratch"
        @touchstart.prevent="startScratch"
        @touchmove.prevent="doScratch"
        @touchend="stopScratch"
      ></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  label: String,
  reveal: String,
  clipId: { type: String, required: true },
  // fraction of scratched area needed before we consider it "revealed" — kept low
  // so the user only needs a little scratch, not full coverage
  threshold: { type: Number, default: 0.01 },
})
const emit = defineEmits(['revealed'])

// Heart path defined once in a 0-1 unit box (for clipPathUnits="objectBoundingBox")
// and a matching 0-100 version for the visible outline stroke.
const heartPathUnit = 'M0.5 0.92 C 0.16 0.66, 0.02 0.45, 0.02 0.27 C 0.02 0.12, 0.16 0.02, 0.32 0.02 C 0.42 0.02, 0.48 0.09, 0.5 0.16 C 0.52 0.09, 0.58 0.02, 0.68 0.02 C 0.84 0.02, 0.98 0.12, 0.98 0.27 C 0.98 0.45, 0.84 0.66, 0.5 0.92 Z'
const heartPathScaled = 'M50 92 C 16 66, 2 45, 2 27 C 2 12, 16 2, 32 2 C 42 2, 48 9, 50 16 C 52 9, 58 2, 68 2 C 84 2, 98 12, 98 27 C 98 45, 84 66, 50 92 Z'

const canvas = ref(null)
const container = ref(null)
const scratching = ref(false)
const done = ref(false)
const fullyFaded = ref(false)
let ctx = null
let SIZE = 120

function getPos(e) {
  const rect = canvas.value.getBoundingClientRect()
  const src = e.touches ? e.touches[0] : e
  return {
    x: (src.clientX - rect.left) * (canvas.value.width / rect.width),
    y: (src.clientY - rect.top)  * (canvas.value.height / rect.height),
  }
}

function initCanvas() {
  const c = canvas.value
  SIZE = container.value.offsetWidth || 120
  c.width = SIZE
  c.height = SIZE
  ctx = c.getContext('2d')
  const grad = ctx.createLinearGradient(0, 0, SIZE, SIZE)
  grad.addColorStop(0, '#b45989')
  grad.addColorStop(1, '#8b004a')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, SIZE, SIZE)
  ctx.fillStyle = 'rgba(255,255,255,0.55)'
  ctx.font = `700 ${SIZE * 0.16}px serif`
  ctx.textAlign = 'center'
  ctx.fillText('♡', SIZE / 2, SIZE / 2 + SIZE * 0.06)
}

function startScratch(e) { if (done.value) return; scratching.value = true; doScratch(e) }
function stopScratch()   { scratching.value = false; checkClear() }

function doScratch(e) {
  if (!scratching.value || done.value) return
  const { x, y } = getPos(e)
  ctx.globalCompositeOperation = 'destination-out'
  ctx.beginPath()
  ctx.arc(x, y, SIZE * 0.16, 0, Math.PI * 2)
  ctx.fill()
}

function checkClear() {
  if (done.value) return
  const data = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height).data
  let clear = 0
  for (let i = 3; i < data.length; i += 4) { if (data[i] === 0) clear++ }
  const ratio = clear / (canvas.value.width * canvas.value.height)
  if (ratio > props.threshold) {
    done.value = true
    fadeOutRemainder()
  }
}

function fadeOutRemainder() {
  let alpha = 1
  const step = () => {
    alpha -= 0.08
    ctx.save()
    ctx.globalCompositeOperation = 'destination-out'
    ctx.globalAlpha = 0.25
    ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
    ctx.restore()
    if (alpha > 0) {
      requestAnimationFrame(step)
    } else {
      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
      fullyFaded.value = true
      emit('revealed')
    }
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  setTimeout(initCanvas, 50)
  window.addEventListener('resize', initCanvas)
})
onUnmounted(() => window.removeEventListener('resize', initCanvas))
</script>

<style scoped>
.heart-scratch { text-align: center; }

.heart-scratch__label {
  font-family: 'Cinzel', serif;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
  font-weight: bolder;
}

.heart-scratch__box {
  position: relative;
  width: 100%;
  max-width: 110px;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
  cursor: crosshair;
  touch-action: none;
}

.heart-scratch__shape {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.heart-scratch__outline {
  fill: none;
  stroke: var(--gold);
  stroke-width: 2.5;
  opacity: 0.55;
}

.heart-scratch__text {
  font-family: 'Great Vibes', cursive;
  font-size: 26px;
  fill: var(--gold-deep);
  font-weight: 700;
}

.heart-scratch__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
