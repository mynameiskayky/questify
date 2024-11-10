import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    xp: 0,
    completedTasks: [],
    claimedRewards: []
  }),

  getters: {
    currentLevel: (state) => Math.floor(state.xp / 100) + 1,
    xpToNextLevel: (state) => {
      const nextLevel = Math.floor(state.xp / 100) + 1
      return (nextLevel * 100) - state.xp
    },
    progress: (state) => (state.xp % 100),
    hasEnoughXp: (state) => (requiredXp) => state.xp >= requiredXp
  },

  actions: {
    addXp(amount) {
      this.xp += amount
    },

    removeXp(amount) {
      this.xp = Math.max(0, this.xp - amount)
    },

    spendXp(amount) {
      if (this.xp >= amount) {
        this.xp -= amount
        return true
      }
      return false
    },

    addCompletedTask(task) {
      this.completedTasks.push(task)
    },

    addClaimedReward(reward) {
      this.claimedRewards.push(reward)
    }
  },

  persist: true
})
