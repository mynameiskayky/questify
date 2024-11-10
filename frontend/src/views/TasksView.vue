<template>
  <div class="tasks-view">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="title">Minhas Missões</h1>
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-value">{{ availablePoints }}</div>
            <div class="stat-label">XP Disponível</div>
            <div class="stat-progress">
              <div
                class="progress-bar"
                :style="{ width: `${(availablePoints / 1000) * 100}%` }"
              ></div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ tasks.length }}</div>
            <div class="stat-label">Missões</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ completedTasks }}</div>
            <div class="stat-label">Concluídas</div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-container">
      <div class="action-bar">
        <button @click="showAddModal = true" class="add-button">
          <span class="button-icon">+</span>
          Nova Missão
        </button>
        <div class="filters">
          <button
            v-for="filter in ['Todas', 'Pendentes', 'Concluídas']"
            :key="filter"
            :class="['filter-button', { active: currentFilter === filter }]"
            @click="currentFilter = filter"
          >
            {{ filter }}
          </button>
        </div>
      </div>

      <div v-if="isLoading" class="loading-container">
        <div class="loader"></div>
        <span>Carregando suas missões...</span>
      </div>

      <div v-else-if="filteredTasks.length === 0" class="empty-state">
        <div class="empty-illustration">🎯</div>
        <h3>Nenhuma missão encontrada</h3>
        <p>Comece adicionando sua primeira missão!</p>
        <button @click="showAddModal = true" class="add-button">Criar Missão</button>
      </div>

      <div v-else class="tasks-grid">
        <div
          v-for="task in filteredTasks"
          :key="task.id"
          class="task-card"
          :class="{ completed: task.completed }"
        >
          <div class="task-card-inner">
            <div class="task-header">
              <label class="checkbox-wrapper">
                <input type="checkbox" :checked="task.completed" @change="toggleTask(task)" />
                <div class="checkbox">
                  <svg class="checkbox-icon" viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </svg>
                </div>
              </label>
              <div class="xp-pill">+{{ task.points }} XP</div>
            </div>

            <div class="task-content">
              <h3 class="task-title">{{ task.title }}</h3>
              <div class="task-date">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {{ formatDate(task?.createdAt) }}
              </div>
            </div>

            <div class="task-actions">
              <button @click="editTask(task)" class="action-button edit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <button @click="deleteTask(task.id)" class="action-button delete">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path
                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Transition name="modal">
      <div v-if="showAddModal" class="modal-backdrop" @click.self="closeModal">
        <div class="modal-window">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-title">
                <div class="title-icon">🎯</div>
                <h2>{{ editingTask ? 'Editar Missão' : 'Nova Missão' }}</h2>
              </div>
              <button class="close-button" @click="closeModal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <form @submit.prevent="saveTask" class="modal-form">
              <div class="form-group">
                <label for="title">Título da Missão</label>
                <div class="input-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  <input
                    id="title"
                    v-model="currentTask.title"
                    type="text"
                    placeholder="Ex: Ler um capítulo do livro"
                    required
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="points">Recompensa</label>
                <div class="input-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                  <input
                    id="points"
                    v-model.number="currentTask.points"
                    type="number"
                    min="0"
                    placeholder="Quantidade de XP"
                    required
                  />
                  <span class="input-suffix">XP</span>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn-secondary" @click="closeModal">Cancelar</button>
                <button type="submit" class="btn-primary">
                  {{ editingTask ? 'Salvar Missão' : 'Criar Missão' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { taskService } from '../services/tasksService'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const tasks = ref([])
const isLoading = ref(false)
const showAddModal = ref(false)
const currentTask = ref({
  title: '',
  points: 0,
})
const editingTask = ref(null)
const currentFilter = ref('Todas')

const availablePoints = computed(() => {
  return tasks.value.filter((task) => !task.completed).reduce((sum, task) => sum + task.points, 0)
})

const completedTasks = computed(() => tasks.value.filter((task) => task.completed).length)

const filteredTasks = computed(() => {
  switch (currentFilter.value) {
    case 'Pendentes':
      return tasks.value.filter((t) => !t.completed)
    case 'Concluídas':
      return tasks.value.filter((t) => t.completed)
    default:
      return tasks.value
  }
})

const loadTasks = async () => {
  try {
    isLoading.value = true
    tasks.value = await taskService.getAll()
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error)
  } finally {
    isLoading.value = false
  }
}

const saveTask = async () => {
  try {
    if (editingTask.value) {
      await taskService.update(editingTask.value.id, {
        title: currentTask.value.title,
        points: currentTask.value.points,
        completed: editingTask.value.completed,
      })
    } else {
      await taskService.create({
        title: currentTask.value.title,
        points: currentTask.value.points,
      })
    }
    await loadTasks()
    closeModal()
  } catch (error) {
    console.error('Erro ao salvar tarefa:', error)
  }
}

const toggleTask = async (task) => {
  try {
    const updatedTask = await taskService.toggleComplete(task.id, {
      title: task.title,
      points: task.points,
      completed: task.completed,
    })

    if (updatedTask.completed) {
      userStore.addXp(task.points)
    } else {
      userStore.removeXp(task.points)
    }

    await loadTasks()
  } catch (error) {
    console.error('Erro ao atualizar status da tarefa:', error)
  }
}

const editTask = (task) => {
  editingTask.value = task
  currentTask.value = {
    title: task.title,
    points: task.points,
  }
  showAddModal.value = true
}

const deleteTask = async (taskId) => {
  if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return

  try {
    await taskService.delete(taskId)
    await loadTasks()
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error)
  }
}

const closeModal = () => {
  showAddModal.value = false
  editingTask.value = null
  currentTask.value = {
    title: '',
    points: 0,
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

onMounted(loadTasks)
</script>

<style lang="scss" scoped>
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

.tasks-view {
  min-height: 100vh;
  background-color: var(--surface);
  color: var(--text);
}

.hero-section {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary));
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }

  .hero-content {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);

  .stat-value {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
  }

  .stat-progress {
    margin-top: 1rem;
    background: rgba(0, 0, 0, 0.2);
    height: 4px;
    border-radius: 2px;
    overflow: hidden;

    .progress-bar {
      height: 100%;
      background: var(--success);
      transition: width 0.3s ease;
    }
  }
}

.content-container {
  max-width: 1200px;
  margin: -2rem auto 0;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  .add-button {
    background: var(--primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s;

    &:hover {
      background: var(--primary-dark);
      transform: translateY(-1px);
    }

    .button-icon {
      font-size: 1.2rem;
    }
  }

  .filters {
    display: flex;
    gap: 0.5rem;

    .filter-button {
      background: var(--surface-light);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      &.active {
        background: var(--primary);
        color: white;
        border-color: var(--primary);
      }
    }
  }
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.task-card {
  background: linear-gradient(145deg, rgba(43, 45, 66, 0.5), rgba(32, 34, 50, 0.5));
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    border-color: rgba(99, 102, 241, 0.3);
  }

  .task-card-inner {
    padding: 20px;
  }

  &.completed {
    background: linear-gradient(145deg, rgba(43, 45, 66, 0.3), rgba(32, 34, 50, 0.3));
    .task-title {
      text-decoration: line-through;
      opacity: 0.6;
    }
  }
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.checkbox-wrapper {
  position: relative;
  display: block;
  cursor: pointer;

  input {
    display: none;
  }

  .checkbox {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(99, 102, 241, 0.3);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    .checkbox-icon {
      width: 12px;
      height: 12px;
      fill: none;
      stroke: white;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      opacity: 0;
      transition: all 0.3s ease;
    }
  }

  input:checked + .checkbox {
    background: #6366f1;
    border-color: #6366f1;

    .checkbox-icon {
      opacity: 1;
    }
  }
}

.xp-pill {
  background: rgba(99, 102, 241, 0.2);
  color: #818cf8;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.task-content {
  margin: 16px 0;

  .task-title {
    font-size: 1.125rem;
    font-weight: 500;
    margin-bottom: 8px;
    color: #f8fafc;
  }

  .task-date {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #94a3b8;
    font-size: 0.875rem;

    svg {
      stroke: currentColor;
      stroke-width: 2;
    }
  }
}

.task-actions {
  display: flex;
  gap: 8px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.task-card:hover .task-actions {
  opacity: 1;
  transform: translateY(0);
}

.action-button {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #94a3b8;

  svg {
    stroke: currentColor;
    stroke-width: 2;
  }

  &.edit:hover {
    background: rgba(99, 102, 241, 0.2);
    color: #818cf8;
  }

  &.delete:hover {
    background: rgba(239, 68, 68, 0.2);
    color: #f87171;
  }
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 1rem;
  color: var(--text-muted);
}

.loader {
  width: 48px;
  height: 48px;
  border: 4px solid var(--primary);
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--surface-light);
  border-radius: 1rem;
  border: 2px dashed rgba(255, 255, 255, 0.1);

  .empty-illustration {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--text);
  }

  p {
    color: var(--text-muted);
    margin-bottom: 2rem;
  }

  // Estilo específico para o botão no empty-state
  .add-button {
    background: var(--primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s;

    .button-icon {
      font-size: 1.2rem;
    }

    &:hover {
      background: var(--primary-dark);
      transform: translateY(-1px);
    }
  }
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
}

.form-group {
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    color: #94a3b8;
    font-size: 0.875rem;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;

    svg {
      position: absolute;
      left: 12px;
      color: #6366f1;
    }

    input {
      width: 100%;
      padding: 12px 16px 12px 44px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: #f8fafc;
      font-size: 1rem;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
      }

      &::placeholder {
        color: #64748b;
      }
    }

    .input-suffix {
      position: absolute;
      right: 12px;
      color: #64748b;
      font-size: 0.875rem;
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
      color: #94a3b8;
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

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 1rem;

    .title {
      font-size: 2rem;
    }
  }

  .content-container {
    padding: 0 1rem;
  }

  .action-bar {
    flex-direction: column;
    gap: 1rem;

    .filters {
      width: 100%;
      justify-content: center;
      flex-wrap: wrap;
    }

    .add-button {
      width: 100%;
      justify-content: center;
    }
  }

  .stats-container {
    grid-template-columns: 1fr;
  }

  .tasks-grid {
    grid-template-columns: 1fr;
  }

  .modal-window {
    width: 95%;
    margin: 1rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .modal-footer {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--surface);
}

::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 4px;

  &:hover {
    background: var(--primary-dark);
  }
}

@media print {
  .hero-section {
    background: none;
    padding: 1rem;
  }

  .action-bar,
  .task-actions,
  .modal-backdrop {
    display: none;
  }

  .task-card {
    break-inside: avoid;
    border: 1px solid #ddd;
    margin-bottom: 1rem;
    background: none;
  }
}
</style>
