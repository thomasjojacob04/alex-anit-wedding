<template>
  <button class="music-toggle" @click="toggleBgm" :title="audioState.playing ? 'Mute music' : 'Play music'">
    <!-- <span v-if="audioState.playing">♫</span> -->
     <svg v-if="audioState.playing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="currentColor" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="6.5" cy="18.5" r="3.5"></circle>
    <circle cx="18" cy="16" r="3"></circle>
    <path d="M10 18.5L10 7C10 6.07655 10 5.61483 10.2635 5.32794C10.5269 5.04106 11.0175 4.9992 11.9986 4.91549C16.022 4.57222 18.909 3.26005 20.3553 2.40978C20.6508 2.236 20.7986 2.14912 20.8993 2.20672C21 2.26432 21 2.4315 21 2.76587V16" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M10 10C15.8667 10 19.7778 7.66667 21 7" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
    <!-- <span v-else class="music-toggle__muted">♫</span> -->
     <svg v-else class="music-toggle__muted" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.41667 18.3333C7.0275 18.3333 8.33333 17.0275 8.33333 15.4167C8.33333 13.8058 7.0275 12.5 5.41667 12.5C3.80584 12.5 2.5 13.8058 2.5 15.4167C2.5 17.0275 3.80584 18.3333 5.41667 18.3333Z" stroke="currentColor" stroke-width="1.66667"/>
<path d="M15 15.8333C16.3807 15.8333 17.5 14.7141 17.5 13.3333C17.5 11.9526 16.3807 10.8333 15 10.8333C13.6193 10.8333 12.5 11.9526 12.5 13.3333C12.5 14.7141 13.6193 15.8333 15 15.8333Z" stroke="currentColor" stroke-width="1.66667"/>
<path d="M8.33398 15.4167V5.83334C8.33398 5.0638 8.33398 4.67904 8.55357 4.43996C8.77307 4.20089 9.1819 4.16601 9.99948 4.09625C13.3523 3.8102 15.7582 2.71672 16.9634 2.00816C17.2097 1.86335 17.3328 1.79095 17.4167 1.83895C17.5006 1.88695 17.5007 2.02626 17.5007 2.3049V13.3333" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.33398 8.33334C13.2229 8.33334 16.4822 6.3889 17.5007 5.83334" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2 1L18.479 18.4483" stroke="currentColor" stroke-width="1.67" stroke-linecap="round"/>
</svg>

  </button>
</template>

<script setup>
import { audioState, toggleBgm } from '../audio.js'
</script>

<style scoped>
.music-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 200;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(169, 132, 44, 0.15);
  border: 1px solid var(--gold);
  color: var(--gold-deep);
  font-size: 1.15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: background 0.3s, transform 0.2s;
}
.music-toggle:hover { background: rgba(169, 132, 44, 0.3); transform: scale(1.05); }

.music-toggle__muted {
  position: relative;
  opacity: 0.5;
}
.music-toggle__muted::after {
  content: '';
  position: absolute;
  left: -4px;
  right: -4px;
  top: 50%;
  height: 1.5px;
  background: var(--gold-deep);
  transform: rotate(-45deg);
}
</style>
