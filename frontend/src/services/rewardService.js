import { api } from './api'

export const rewardService = {
  async getAll() {
    const { data } = await api.get('/rewards')
    return data
  },

  async create(reward) {
    const { data } = await api.post('/rewards', reward)
    return data
  },

  async update(id, reward) {
    const { data } = await api.put(`/rewards/${id}`, reward)
    return data
  },

  async delete(id) {
    await api.delete(`/rewards/${id}`)
  },

  async claim(id, userXp) {
    const { data } = await api.post(`/rewards/${id}/claim`, { userXp })
    return data
  }
}
