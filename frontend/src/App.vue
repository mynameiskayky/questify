<template>
  <div class="app">
    <MainNavbar />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import MainNavbar from './components/MainNavbar.vue'
</script>

<style lang="scss">
:root {
  --primary: #6366f1;
  --primary-dark: #4f46e5;
  --surface: #1e1e2e;
  --surface-light: #2a2a3c;
  --text: #e2e8f0;
  --text-muted: #94a3b8;
  --success: #22c55e;
  --danger: #ef4444;
  --warning: #f59e0b;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
  background-color: var(--surface);
  color: var(--text);
  line-height: 1.5;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 64px;
}
</style>
