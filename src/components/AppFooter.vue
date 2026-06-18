<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__ornament">✝</div>
      <p class="footer__eyebrow">Together Forever</p>
      <div class="footer__names">
        <span>Alex</span>
        <span class="footer__heart">♡</span>
        <span>Anit</span>
      </div>
      <div class="divider footer__divider">
        <span></span>
        <div class="divider-diamond"></div>
        <span></span>
      </div>
      <p class="footer__verse">
        "What God has joined together,<br />let no one separate."
      </p>
      <p class="footer__date">12 . 07 . 2026</p>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1.5rem;
  background: linear-gradient(160deg, var(--deep-1), var(--deep-2));
  position: relative;
  overflow: hidden;
}
.footer::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 15% 20%, rgba(219,186,196,0.1), transparent 45%),
    radial-gradient(circle at 85% 80%, rgba(180,89,137,0.12), transparent 50%);
}

.footer__content {
  position: relative;
  z-index: 1;
}

.footer__ornament {
  font-size: 1.6rem;
  color: var(--gold-light);
  opacity: 0.8;
  margin-bottom: 1.25rem;
}

.footer__eyebrow {
  font-family: 'Cinzel', serif;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--blush);
  margin-bottom: 1rem;
}

.footer__names {
  font-family: 'Parisienne', cursive;
  font-size: clamp(4rem, 10vw, 5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: var(--cream);
  line-height: 1;
}

.footer__heart {
  font-size: clamp(1.5rem, 3vw, 1.8rem);
  color: var(--blush);
}

.footer__divider span { background: var(--gold-light); }
.footer__divider .divider-diamond { background: var(--gold-light); }

.footer__verse {
  font-size: 1.2rem;
  font-weight: 400;
  font-style: italic;
  color: rgba(219,186,196,0.9);
  line-height: 1.7;
  margin: 1.25rem 0 1.5rem;
}

.footer__date {
  font-family: 'Cinzel', serif;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: var(--gold-light);
}
</style>
