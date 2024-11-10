<template>
  <div class="profile-view">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="title">Perfil</h1>
      </div>
    </div>

    <div class="content-container">
      <p>Em desenvolvimento...</p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.profile-view {
  min-height: 100vh;
  background-color: var(--surface);
  color: var(--text);
}

.hero-section {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary));
  padding: 4rem 2rem;

  .hero-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }
}

.content-container {
  max-width: 1200px;
  margin: -2rem auto 0;
  padding: 0 2rem;
  position: relative;
}
</style>
