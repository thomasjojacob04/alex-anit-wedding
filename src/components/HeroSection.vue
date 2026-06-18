<template>
  <section class="hero">
    <img src="/hero-bg.png" alt="Alex & Anit - We Are Getting Married" class="hero__bg-img" />
    <div class="hero__scrim"></div>

    <div class="hero__content">
      <p class="hero__intro">
        With joyful hearts &amp; God's grace, we invite you to witness our union
      </p>

      <div class="divider hero__divider">
        <span></span>
        <div class="divider-diamond"></div>
        <span></span>
      </div>

      <div class="hero__scroll" @click="scrollDown">
        <span class="hero__scroll-text">Scroll for details</span>
        <div class="hero__scroll-arrow">↓</div>
      </div>
    </div>
  </section>
</template>

<script setup>
function scrollDown() {
  window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' })
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
}

.hero__bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.hero__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(20,4,12,0.45) 100%);
  z-index: 1;
}

.hero__content {
  position: relative;
  z-index: 2;
  width: 100%;
  padding-bottom: 1.2rem;
  text-align: center;
}

.hero__intro {
  font-size: 0.95rem;
  font-style: italic;
  color: var(--cream);
  line-height: 1.7;
  margin-bottom: 0.25rem;
  padding: 0 1rem;
  text-shadow: 0 1px 8px rgba(0,0,0,0.55);
}

.hero__divider span { background: var(--cream); opacity: 0.7; }
.hero__divider .divider-diamond { background: var(--cream); }

.hero__scroll {
  margin-top: 0.8rem;
  cursor: pointer;
  color: var(--cream);
  opacity: 0.92;
  animation: bounce 2s infinite;
}
.hero__scroll-text {
  font-family: 'Cinzel', serif;
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 6px;
  text-shadow: 0 1px 6px rgba(0,0,0,0.5);
}
.hero__scroll-arrow {
  font-size: 1.1rem;
  text-shadow: 0 1px 6px rgba(0,0,0,0.5);
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}
</style>
