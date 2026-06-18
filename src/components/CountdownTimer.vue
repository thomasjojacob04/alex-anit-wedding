<template>
  <section class="countdown-section">
    <PopperBurst v-if="showPoppers" />

    <h2 class="eyebrow">Save The Date</h2>
    <h2 class="reveal-stage__heading">Reveal Our <br /><em>Big Day</em></h2>
    <div class="divider">
      <span></span>
      <div class="divider-diamond"></div>
      <span></span>
    </div>
    <p class="reveal-stage__hint">Scratch each heart to reveal</p>

    <!-- 3 hearts, always a single row even on mobile -->
    <div class="reveal-stage__hearts">
      <ScratchHeart
        label="Day"
        reveal="12"
        clip-id="heart-day"
        @revealed="onRevealed('day')"
      />
      <ScratchHeart
        label="Month"
        reveal="July"
        clip-id="heart-month"
        @revealed="onRevealed('month')"
      />
      <ScratchHeart
        label="Year"
        reveal="2026"
        clip-id="heart-year"
        @revealed="onRevealed('year')"
      />
    </div>

    <!-- Countdown appears below the hearts once all three are revealed -->
    <transition name="countdown-grow">
      <div v-if="allRevealed" class="countdown">
        <div class="countdown__rule"></div>
        <p class="countdown__label">Counting down to forever</p>
        <!-- <p class="countdown__date">12th July 2026 &middot; 4:00 PM</p> -->

        <div class="countdown__row">
          <div class="countdown__unit" v-for="u in units" :key="u.label">
            <span class="countdown__num">{{ pad(u.value) }}</span>
            <span class="countdown__lbl">{{ u.label }}</span>
          </div>
        </div>

        <a class="countdown__cta btn-gold" :href="calendarUrl" target="_blank" rel="noopener">
          Save the Date
        </a>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import ScratchHeart from './ScratchHeart.vue'
import PopperBurst from './PopperBurst.vue'

// Wedding: 12 July 2026, ceremony at 4 PM IST
const TARGET = new Date('2026-07-12T16:00:00+05:30').getTime()

const revealedMap = reactive({ day: false, month: false, year: false })
const allRevealed = computed(() => revealedMap.day && revealedMap.month && revealedMap.year)
const showPoppers = ref(false)

function onRevealed(key) {
  revealedMap[key] = true
  if (allRevealed.value) {
    showPoppers.value = true
    setTimeout(() => { showPoppers.value = false }, 2400)
  }
}

const now = ref(Date.now())
let timer = null
onMounted(() => { timer = setInterval(() => { now.value = Date.now() }, 1000) })
onUnmounted(() => clearInterval(timer))

const diff = computed(() => Math.max(0, TARGET - now.value))

const units = computed(() => {
  const s = Math.floor(diff.value / 1000)
  return [
    { label: 'Days', value: Math.floor(s / 86400) },
    { label: 'Hrs',  value: Math.floor((s % 86400) / 3600) },
    { label: 'Mins', value: Math.floor((s % 3600) / 60) },
    { label: 'Secs', value: s % 60 },
  ]
})

function pad(n) { return String(n).padStart(2, '0') }

// Google Calendar "add event" link
const calendarUrl = (() => {
  const start = '20260712T103000Z' // 16:00 IST = 10:30 UTC
  const end   = '20260712T143000Z'
  const text  = encodeURIComponent("Alex & Anit's Wedding")
  const details = encodeURIComponent('Holy Wedding Ceremony at St. John The Baptist Church, Yordhanapuram, followed by Reception at Star Convention Center, Manjapra.')
  const location = encodeURIComponent('St. John The Baptist Church, Yordhanapuram')
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`
})()
</script>

<style scoped>
.countdown-section {
  background: linear-gradient(135deg, var(--deep-1), var(--deep-2));
  padding: 4rem 1.25rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.reveal-stage__heading {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(2.5rem, 5vw, 2.6rem);
  color: var(--cream);
  margin-bottom: 0.5rem;
}
.reveal-stage__heading em { font-style: italic; color: var(--blush); }

.reveal-stage__hint {
  font-size: 1.2rem;
  color: rgba(219,186,196,0.85);
  font-style: italic;
  margin-bottom: 2.25rem;
}

/* Always a single row, even on small phones — hearts shrink to fit */
.reveal-stage__hearts {
  display: flex;
  gap: clamp(0.6rem, 4vw, 1.75rem);
  justify-content: center;
  align-items: flex-start;
  flex-wrap: nowrap;
  max-width: 420px;
  margin: 0 auto;
}
.reveal-stage__hearts > * {
  flex: 1 1 0;
  min-width: 0;
  max-width: 120px;
}

/* Countdown block, appears below hearts */
.countdown {
  margin-top: 2.75rem;
}

.countdown__rule {
  width: 50px;
  height: 1px;
  background: var(--blush);
  opacity: 0.5;
  margin: 0 auto 2rem;
}

.countdown__label {
  font-family: 'Cinzel', serif;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--blush);
  margin-bottom: 2rem;
}

.countdown__date {
  font-family: 'Great Vibes', cursive;
  font-size: 1.7rem;
  color: var(--cream);
  margin-bottom: 2rem;
}

.countdown__row {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 0.5rem;
  flex-wrap: nowrap;
  margin-bottom: 2.25rem;
}

.countdown__unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(180,89,137,0.4);
  border-radius: 10px;
  padding: 0.75rem 0.5rem;
  flex: 1 1 0;
  min-width: 0;
  max-width: 85px;
}

.countdown__num {
  font-family: 'Cinzel', serif;
  font-size: clamp(1.3rem, 5vw, 2.1rem);
  color: var(--cream);
  line-height: 1;
  font-weight: 600;
}
.countdown__lbl {
  font-size: 0.6rem;
  font-weight: bold;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--blush);
  margin-top: 0.4rem;
  font-family: 'Cinzel', serif;
}

.countdown__cta {
  border-color: var(--blush);
  color: var(--cream);
}
.countdown__cta:hover {
  background: var(--blush);
  color: var(--deep-2);
}

.countdown-grow-enter-active { transition: opacity 0.5s ease, transform 0.5s ease; }
.countdown-grow-enter-from { opacity: 0; transform: translateY(-12px); }

@media (max-width: 360px) {
  .countdown__row { gap: 0.35rem; }
  .countdown__unit { padding: 0.6rem 0.35rem; }
}
</style>
