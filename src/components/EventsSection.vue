<template>
  <section class="events">
    <h2 class="eyebrow">Save the Date</h2>
    <h2 class="events__heading">Wedding <em>Events</em></h2>
    <div class="divider">
      <span></span>
      <div class="divider-diamond"></div>
      <span></span>
    </div>

    <p class="events__date">12 th July, 2026</p>

    <div class="events__list">
      <!-- Church Ceremony -->
      <div class="event-card">
        <div class="event-card__icon">✝</div>
        <h3 class="event-card__title">Holy Wedding</h3>
        <p class="event-card__time">3:30 PM</p>
        <p class="event-card__venue">
          St. John The Baptist Church<br />Yordhanapuram
        </p>
        <a
          class="btn-gold event-card__btn"
          href="https://www.google.com/maps/search/?api=1&query=St.+John+The+Baptist+Church+Yordhanapuram"
          target="_blank" rel="noopener"
        >
          View on Maps
        </a>
      </div>

      <!-- Reception -->
      <div class="event-card">
        <div class="event-card__icon">♡</div>
        <h3 class="event-card__title">Reception</h3>
        <p class="event-card__time">7:00 PM</p>
        <p class="event-card__venue">
          Star Convention Center<br />Manjapra
        </p>
        <a
          class="btn-gold event-card__btn"
          href="https://maps.app.goo.gl/adEoDSEAjeyKcUWN7?g_st=ic"
          target="_blank" rel="noopener"
        >
          View on Maps
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.events {
  padding: 4.5rem 1.5rem;
  text-align: center;
  background: var(--paper);
  position: relative;
}
.events::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--gold-light), transparent);
}

.events__heading {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 800;
  font-size: clamp(2.5rem, 5vw, 2.6rem);
  color: var(--text-body);
  margin-bottom: 0.5rem;
}
.events__heading em { font-style: italic; color: var(--gold-deep); }

.events__date {
  font-family: 'Great Vibes', cursive;
  font-size: 2rem;
  font-weight: 400;
  color: var(--blush-deep);
  margin: 1rem 0 2.5rem;
}

.events__list {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.event-card {
  background: var(--cream);
  border: 1px solid rgba(169,132,44,0.2);
  border-top: 3px solid var(--gold-light);
  border-radius: 6px;
  padding: 2.25rem 1.75rem;
  max-width: 280px;
  width: 100%;
  box-shadow: 0 8px 28px rgba(74,60,42,0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}
.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 36px rgba(74,60,42,0.14);
}

.event-card__icon {
  font-size: 1.8rem;
  color: var(--gold);
  margin-bottom: 0.75rem;
}

.event-card__title {
  font-family: 'Great Vibes', cursive;
  font-size: 2rem;
  color: var(--gold-deep);
  margin-bottom: 0.4rem;
}

.event-card__time {
  font-family: 'Cinzel', serif;
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--text-body);
  margin-bottom: 0.9rem;
}

.event-card__venue {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.event-card__btn {
  font-size: 0.8rem;
  font-weight: 800;
  padding: 0.55rem 1.5rem;
}
</style>
