<template>
  <nav class="navbar">
    <div class="navbar-content">
      <RouterLink to="/" class="logo">
        <PhRocketLaunch :size="28" weight="duotone" class="logo-icon" />
        <span class="logo-text">Questify</span>
      </RouterLink>

      <div class="nav-items">
        <RouterLink to="/tasks" class="nav-item" :class="{ active: currentRoute === '/tasks' }">
          <PhTarget :size="24" weight="duotone" />
          <span class="label">Missões</span>
        </RouterLink>

        <RouterLink to="/rewards" class="nav-item" :class="{ active: currentRoute === '/rewards' }">
          <PhGift :size="24" weight="duotone" />
          <span class="label">Recompensas</span>
        </RouterLink>

        <RouterLink to="/profile" class="nav-item" :class="{ active: currentRoute === '/profile' }">
          <PhUser :size="24" weight="duotone" />
          <span class="label">Perfil</span>
        </RouterLink>
      </div>

      <div class="profile-section">
        <div class="xp-display">
          <div class="xp-amount">
            <PhStar :size="16" weight="fill" class="xp-icon" />
            {{ xp }} XP
          </div>
          <div class="level-progress">
            <div class="progress-track">
              <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
            </div>
            <div class="level-label">Nível {{ level }}</div>
          </div>
        </div>

        <div class="profile-menu" @click="toggleProfileMenu" ref="profileMenuRef">
          <PhUserCircle :size="32" weight="duotone" class="avatar" />
          <div class="profile-info">
            <span class="profile-name">{{ userName }}</span>
            <span class="profile-level">Nível {{ level }}</span>
          </div>

          <div v-if="showProfileMenu" class="profile-dropdown">
            <RouterLink to="/profile" class="dropdown-item">
              <PhUser :size="20" />
              Perfil
            </RouterLink>
            <RouterLink to="/settings" class="dropdown-item">
              <PhGear :size="20" />
              Configurações
            </RouterLink>
            <button class="dropdown-item logout" @click="handleLogout">
              <PhSignOut :size="20" />
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import {
  PhRocketLaunch,
  PhTarget,
  PhGift,
  PhUser,
  PhStar,
  PhUserCircle,
  PhGear,
  PhSignOut,
} from '@phosphor-icons/vue'

const route = useRoute()
const userStore = useUserStore()
const userName = ref('Usuário')
const showProfileMenu = ref(false)

const currentRoute = computed(() => route.path)
const xp = computed(() => userStore.xp)
const level = computed(() => userStore.level)
const progress = computed(() => userStore.progress)

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: linear-gradient(to right, var(--surface), var(--surface-light));
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 100;
  backdrop-filter: blur(10px);
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--text);
  font-weight: 600;

  .logo-icon {
    color: var(--primary);
  }

  .logo-text {
    font-size: 1.25rem;
    background: linear-gradient(135deg, #818cf8, #6366f1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.nav-items {
  display: flex;
  gap: 1rem;

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: var(--text-muted);
    border-radius: 0.5rem;
    transition: all 0.2s;

    .label {
      font-size: 0.875rem;
      font-weight: 500;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text);
    }

    &.active {
      background: var(--primary);
      color: white;

      svg {
        color: white;
      }
    }
  }
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.xp-display {
  text-align: right;

  .xp-amount {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-weight: 600;
    color: var(--primary);
    margin-bottom: 0.25rem;

    .xp-icon {
      color: var(--primary);
    }
  }

  .level-progress {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .progress-track {
      width: 100px;
      height: 4px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
      overflow: hidden;

      .progress-bar {
        height: 100%;
        background: linear-gradient(to right, var(--primary), var(--primary-dark));
        transition: width 0.3s ease;
      }
    }

    .level-label {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.75rem;
      color: var(--text-muted);

      .level-icon {
        color: var(--warning);
      }
    }
  }
}

.profile-menu {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .avatar {
    color: var(--primary);
  }

  .profile-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .profile-name {
      font-size: 0.875rem;
      font-weight: 500;
    }

    .profile-level {
      font-size: 0.75rem;
      color: var(--text-muted);
    }
  }
}

@media (max-width: 768px) {
  .logo-text,
  .nav-items .label,
  .xp-display,
  .profile-info {
    display: none;
  }

  .navbar-content {
    padding: 0 1rem;
  }

  .nav-items {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem 1rem;
    background: var(--surface);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    justify-content: space-around;

    .nav-item {
      padding: 0.5rem;
    }
  }
}

.profile-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 200px;
  background: var(--surface-light);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 100;

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    color: var(--text);
    text-decoration: none;
    transition: all 0.2s;
    font-size: 0.875rem;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;

    svg {
      color: currentColor;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    &.logout {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--danger);
    }
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.profile-dropdown {
  animation: slideDown 0.2s ease-out;
}

@media (max-width: 768px) {
  .profile-dropdown {
    right: -1rem;
    width: 180px;
  }
}
</style>
