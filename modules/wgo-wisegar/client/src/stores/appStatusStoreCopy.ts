import { defineStore } from "pinia";

export const appStatusCopyId = "appStatusCopyStore";

export const useAppStatusCopyStore = defineStore({
  id: appStatusCopyId,
  state: () => ({
    loading: false,
  }),
  getters: {},
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading;
    },
  },
});
