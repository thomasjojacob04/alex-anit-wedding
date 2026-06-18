<template>
  <section class="couple">
    <h2 class="eyebrow">With Love &amp; Blessings</h2>
    <h2 class="couple__heading">Bride & Groom</h2>
    <div class="divider">
      <span></span>
      <div class="divider-diamond"></div>
      <span></span>
    </div>

    <div class="couple__panel">
      <!-- Groom -->
      <div class="couple__person">
        <div class="couple__photo-wrap">
          <img src="/groom.png" alt="Alex Vincent" class="couple__photo" />
        </div>
        <p class="couple__role">Groom</p>
        <h3 class="couple__name">Alex Vincent</h3>
        <p class="couple__lineage">S/o Mr. P V Vincent &amp; Mrs. Shirly Vincent</p>
        <p class="couple__house">Punnassery House, Thuravoor</p>
      </div>

      <!-- Center ornament -->
      <div class="couple__center">
        <span class="couple__center-line"></span>
        <span class="couple__center-amp">&amp;</span>
        <span class="couple__center-line"></span>
      </div>

      <!-- Bride -->
      <div class="couple__person">
        <div class="couple__photo-wrap">
          <img src="/bride.png" alt="Anit Rose Antony" class="couple__photo" />
        </div>
        <p class="couple__role">Bride</p>
        <h3 class="couple__name">Anit Rose Antony</h3>
        <p class="couple__lineage">D/o Mr. C K Antony &amp; Mrs. Lincy Antony</p>
        <p class="couple__house">Chenathuparambil House, Potta</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.couple {
  padding: 4.5rem 1.25rem;
  text-align: center;
  background: var(--cream);
}

.couple__heading {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(2.5rem, 5vw, 2.6rem);
  color: var(--text-body);
  margin-bottom: 0.5rem;
}
.couple__heading em { font-style: italic; color: var(--gold-deep); }

.couple__panel {
  max-width: 640px;
  /* margin: 2.5rem auto 0; */
  display: flex;
  align-items: center;
  justify-content: center;
  /* gap: 1rem; */
}

.couple__person {
  flex: 1;
  position: relative;
  padding: 2rem 1rem 1.75rem;
}

.couple__photo-wrap {
  width: 140px;
  height: 180px;
  margin: auto;
  /* border-radius: 50%; */
  /* overflow: hidden; */
  /* border: 2px solid var(--gold); */
  /* background: #000; */
}

.couple__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.couple__role {
  font-family: 'Cinzel', serif;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
}

.couple__name {
  font-family: 'Parisienne', cursive;
  font-size: clamp(2.4rem, 6vw, 2.5rem);
  color: var(--gold-deep);
  line-height: 1.15;
  margin-bottom: 1rem;
  font-weight: 400;
}

.couple__lineage {
  font-size: 1.1rem;
  color: var(--text-body);
  line-height: 1.55;
  margin-bottom: 0.4rem;
}

.couple__house {
  font-size: 1.2rem;
  color: var(--text-muted);
  font-style: italic;
}

.couple__center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
  padding-top: 0.5rem;
}

.couple__center-line {
  width: 1px;
  height: 34px;
  background: var(--gold-light);
  opacity: 0.6;
}

.couple__center-amp {
  font-family: 'Parisienne', cursive;
  font-size: 1.9rem;
  color: var(--blush-deep);
}

@media (max-width: 600px) {
  .couple__panel { flex-direction: column; gap: 0; }
  .couple__center { flex-direction: row; padding: 0.5rem 0; }
  .couple__center-line { width: 34px; height: 1px; }
  .couple__person { padding: 1.25rem 0.5rem; max-width: 320px; }
}
</style>