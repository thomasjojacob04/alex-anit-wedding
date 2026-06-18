<template>
  <div v-if="!opened" class="envelope-gate">
      <video
        ref="video"
        class="envelope-gate__video"
        :class="{ 'is-playing': playing }"
        playsinline
        muted
        preload="auto"
        @ended="onEnded"
        @click="playing ? null : start()"
      >
        <source src="/envelope-open.mp4" type="video/mp4" />
      </video>

      <!-- Prompt: no dark scrim, text is legible via strong glow/shadow + soft chip -->
      <transition name="prompt-fade">
        <button v-if="!playing" class="envelope-gate__prompt" @click="start">
          <span class="envelope-gate__prompt-text">Click to untie the card</span>
          <span class="envelope-gate__prompt-icon">♡</span>
        </button>
      </transition>

      <!-- Skip button, appears once playing -->
      <transition name="prompt-fade">
        <button v-if="playing" class="envelope-gate__skip" @click="finish">
          Skip ›
        </button>
      </transition>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { startBgm } from '../audio.js'

const emit = defineEmits(['done'])

const video = ref(null)
const playing = ref(false)
const opened = ref(false)

function start() {
  if (!video.value) return
  playing.value = true
  video.value.currentTime = 0
  video.value.play().catch(() => {})
  // Start the persistent (looping) background track right as the card opens,
  // instead of relying on the clip's own short embedded sound — avoids the
  // same 11s sting playing once inline then immediately again on loop.
  startBgm()
}

function onEnded() {
  finish()
}

function finish() {
  opened.value = true
  emit('done')
}

onMounted(() => {
  if (video.value) video.value.load()
})
</script>

<style scoped>
.envelope-gate {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: #0c0805;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.envelope-gate__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  display: block;
}

/* No overlay/scrim — text relies on its own glow + a soft pill backing */
.envelope-gate__prompt {
  position: absolute;
  left: 50%;
  bottom: 14%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.envelope-gate__prompt-text {
  font-family: 'Cinzel', serif;
  font-size: 0.85rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #fffdf8;
  padding: 0.55rem 1.3rem;
  border-radius: 30px;
  background: rgba(20, 14, 6, 0.42);
  backdrop-filter: blur(2px);
  border: 1px solid rgba(255,255,255,0.55);
  text-shadow:
    0 1px 3px rgba(0,0,0,0.9),
    0 0 14px rgba(0,0,0,0.6);
  animation: prompt-pulse 2s ease-in-out infinite;
}

.envelope-gate__prompt-icon {
  font-size: 1.5rem;
  color: #f0c7d6;
  text-shadow:
    0 1px 4px rgba(0,0,0,0.9),
    0 0 16px rgba(0,0,0,0.7);
  animation: prompt-pulse 2s ease-in-out infinite;
}

@keyframes prompt-pulse {
  0%, 100% { opacity: 0.88; transform: scale(1); }
  50%      { opacity: 1;    transform: scale(1.06); }
}

.envelope-gate__skip {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: rgba(0,0,0,0.4);
  border: 1px solid rgba(255,255,255,0.5);
  color: #fdf6e8;
  font-family: 'Cinzel', serif;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  padding: 0.5rem 0.9rem;
  border-radius: 20px;
  cursor: pointer;
  backdrop-filter: blur(3px);
}

.prompt-fade-enter-active, .prompt-fade-leave-active { transition: opacity 0.3s ease; }
.prompt-fade-enter-from, .prompt-fade-leave-to { opacity: 0; }
</style>
