import { api } from './api'

// Função auxiliar para limpar os dados antes de enviar
// const cleanTaskData = (task) => {
//   const { id, createdAt, updatedAt, ...cleanedTask } = task
//   return cleanedTask
// }

export const taskService = {
  async getAll() {
    const { data } = await api.get('/tasks')
    return data
  },

  async create(task) {
    const taskData = {
      title: task.title,
      points: task.points
    }

    const { data } = await api.post('/tasks', taskData)
    return data
  },

  async update(id, task) {
    const taskData = {
      title: task.title,
      points: task.points,
      completed: task.completed
    }

    const { data } = await api.put(`/tasks/${id}`, taskData)
    return data
  },

  async delete(id) {
    await api.delete(`/tasks/${id}`)
  },

  async toggleComplete(id, task) {
    const taskData = {
      title: task.title,
      points: task.points,
      completed: !task.completed
    }

    const { data } = await api.put(`/tasks/${id}`, taskData)
    return data
  },

  async getCompletedTasks() {
    const { data } = await api.get('/tasks?completed=true')
    return data
  },

  async getPendingTasks() {
    const { data } = await api.get('/tasks?completed=false')
    return data
  },

  async getTotalPoints() {
    const tasks = await this.getAll()
    return tasks.reduce((total, task) => total + task.points, 0)
  },

  async getAvailablePoints() {
    const tasks = await this.getPendingTasks()
    return tasks.reduce((total, task) => total + task.points, 0)
  }
}
