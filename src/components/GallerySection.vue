<template>
  <section class="gallery">
    <h2 class="eyebrow">A Glimpse of Us</h2>
    <h2 class="gallery__heading">Our Beautiful <br /><em>Moments</em></h2>
    <div class="divider">
      <span></span>
      <div class="divider-diamond"></div>
      <span></span>
    </div>

    <div class="carousel">
      <div class="carousel__viewport">
        <transition-group name="slide" tag="div" class="carousel__track">
          <img
            v-for="(photo, i) in photos"
            v-show="i === current"
            :key="photo"
            :src="photo"
            class="carousel__img"
            alt="A moment from Alex & Anit's journey"
          />
        </transition-group>

        <button class="carousel__nav carousel__nav--prev" @click="prev" aria-label="Previous photo">‹</button>
        <button class="carousel__nav carousel__nav--next" @click="next" aria-label="Next photo">›</button>
      </div>

      <div class="carousel__dots">
        <button
          v-for="(photo, i) in photos"
          :key="'dot-'+i"
          class="carousel__dot"
          :class="{ active: i === current }"
          @click="goTo(i)"
          :aria-label="'Go to photo ' + (i+1)"
        ></button>
      </div>
    </div>

    <p class="gallery__caption">Every picture, a page from our story</p>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Replace these with the couple's own photos — drop files into /public/gallery/
// and list their paths here, e.g. '/gallery/photo-1.jpg'
const photos = [
  '/1.jpeg',
  '/2.jpeg',
]

const current = ref(0)
let autoTimer = null

function next() { current.value = (current.value + 1) % photos.length }
function prev() { current.value = (current.value - 1 + photos.length) % photos.length }
function goTo(i) { current.value = i }

function startAuto() {
  if (photos.length < 2) return
  autoTimer = setInterval(next, 4000)
}

onMounted(startAuto)
onUnmounted(() => clearInterval(autoTimer))
</script>

<style scoped>
.gallery {
  padding: 4.5rem 1.5rem;
  background: var(--cream);
  text-align: center;
}

.gallery__heading {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 800;
  font-size: clamp(2.5rem, 5vw, 2.6rem);
  color: var(--text-body);
  margin-bottom: 0.5rem;
}
.gallery__heading em { font-style: italic; color: var(--gold-deep); }

.carousel {
  max-width: 420px;
  margin: 2.25rem auto 1rem;
}

.carousel__viewport {
  position: relative;
  aspect-ratio: 3/4;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 14px 40px rgba(74,60,42,0.2);
  border: 1px solid rgba(169,132,44,0.25);
  background: var(--paper);
}

.carousel__track {
  width: 100%;
  height: 100%;
  position: relative;
}

.carousel__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(20,14,6,0.4);
  color: var(--cream);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
  transition: background 0.2s;
}
.carousel__nav:hover { background: rgba(20,14,6,0.6); }
.carousel__nav--prev { left: 0.6rem; }
.carousel__nav--next { right: 0.6rem; }

.carousel__dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}
.carousel__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid var(--gold);
  background: transparent;
  cursor: pointer;
  padding: 0;
  transition: background 0.2s;
}
.carousel__dot.active { background: var(--gold); }

.gallery__caption {
  font-style: italic;
  color: var(--text-muted);
  font-size: 1rem;
  font-weight: 800;
  margin-top: 0.75rem;
}

.slide-enter-active, .slide-leave-active { transition: opacity 0.4s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; }
</style>
