<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-window">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title">
            <div class="title-icon">🎁</div>
            <h2>{{ isEditing ? 'Editar Recompensa' : 'Nova Recompensa' }}</h2>
          </div>
          <button class="close-button" @click="$emit('close')">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="modal-form">
          <div class="form-group">
            <label for="title">Qual recompensa você quer?</label>
            <div class="input-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
                ></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
              <input
                id="title"
                v-model="form.title"
                type="text"
                placeholder="Ex: 1h de jogos, 1 hambúrguer..."
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="xpCost">Quanto XP vai custar?</label>
            <div class="input-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
              <input
                id="xpCost"
                v-model.number="form.xpCost"
                type="number"
                min="1"
                placeholder="Ex: 100"
                required
              />
              <span class="input-suffix">XP</span>
            </div>
          </div>

          <div class="form-group">
            <label for="description">Detalhes (opcional)</label>
            <textarea
              id="description"
              v-model="form.description"
              rows="3"
              placeholder="Adicione mais informações sobre sua recompensa..."
            ></textarea>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn-secondary" @click="$emit('close')">Cancelar</button>
            <button type="submit" class="btn-primary">
              {{ isEditing ? 'Salvar' : 'Adicionar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  reward: {
    type: Object,
    default: null,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'save'])

const form = ref({
  title: '',
  description: '',
  xpCost: null,
})

// Quando o reward mudar, atualizar o formulário
watch(
  () => props.reward,
  (newReward) => {
    if (newReward) {
      form.value = {
        title: newReward.title,
        description: newReward.description || '',
        xpCost: newReward.xpCost,
      }
    } else {
      form.value = {
        title: '',
        description: '',
        xpCost: null,
      }
    }
  },
  { immediate: true },
)

const handleSubmit = () => {
  emit('save', form.value)
}
</script>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-window {
  width: 90%;
  max-width: 500px;
  background: linear-gradient(145deg, #2a2d3d, #1f2233);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

.modal-content {
  padding: 24px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .modal-title {
    display: flex;
    align-items: center;
    gap: 12px;

    .title-icon {
      font-size: 24px;
    }

    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
      background: linear-gradient(135deg, #818cf8, #6366f1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .close-button {
    background: none;
    border: none;
    color: var(--text-muted);
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 0.5rem;
    line-height: 1;
    transition: all 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text);
    }
  }
}

.modal-form {
  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 8px;
      color: var(--text-muted);
      font-size: 0.875rem;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;

      svg {
        position: absolute;
        left: 12px;
        color: var(--primary);
      }

      input {
        width: 100%;
        padding: 12px 16px 12px 44px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        color: var(--text);
        font-size: 1rem;
        transition: all 0.3s ease;

        &:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }

        &::placeholder {
          color: var(--text-muted);
        }
      }

      .input-suffix {
        position: absolute;
        right: 12px;
        color: var(--text-muted);
        font-size: 0.875rem;
      }
    }

    textarea {
      width: 100%;
      padding: 12px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: var(--text);
      font-size: 1rem;
      resize: vertical;
      min-height: 100px;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
      }

      &::placeholder {
        color: var(--text-muted);
      }
    }
  }
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;

  button {
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.875rem;
    transition: all 0.3s ease;
    cursor: pointer;

    &.btn-secondary {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text-muted);
      border: none;

      &:hover {
        background: rgba(255, 255, 255, 0.15);
      }
    }

    &.btn-primary {
      background: linear-gradient(135deg, #818cf8, #6366f1);
      color: white;
      border: none;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
      }
    }
  }
}
</style>
