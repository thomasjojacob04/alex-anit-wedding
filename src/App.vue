<template>
  <div class="app">
    <EnvelopeIntro v-if="!revealed" @done="revealed = true" />

    <MusicToggle v-if="revealed" />
    <AmbientConfetti v-if="revealed" />

    <div v-if="revealed" class="home">
        <HeroSection />
        <CoupleDetails />
        <CountdownTimer />
        <GallerySection />
        <EventsSection />
        <AppFooter />
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import EnvelopeIntro from './components/EnvelopeIntro.vue'
import MusicToggle from './components/MusicToggle.vue'
import AmbientConfetti from './components/AmbientConfetti.vue'
import HeroSection from './components/HeroSection.vue'
import CoupleDetails from './components/CoupleDetails.vue'
import CountdownTimer from './components/CountdownTimer.vue'
import GallerySection from './components/GallerySection.vue'
import EventsSection from './components/EventsSection.vue'
import AppFooter from './components/AppFooter.vue'

const revealed = ref(false)
</script>

<style scoped>
.app { width: 100%; overflow-x: hidden; background: #0c0805; }
</style>
