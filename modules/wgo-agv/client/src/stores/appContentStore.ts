import { defineStore } from "pinia";
import { IPageContent } from "src/models/Content";
import { ContentService } from "src/services/Content/ContentService";

export const appContentId = "appContentStore";

export const useAppContentStore = defineStore({
  id: appContentId,
  state: () => ({
    content: {
      comitatoMembri: "",
      facebook: "",
      instagram: "",
    } as IPageContent,
  }),
  getters: {
    contentObj(state) {
      return state.content;
    },
  },
  actions: {
    async loadPageContent() {
      const contentService = new ContentService();
      const result = await contentService.allContent();
      if (result) {
        this.content = { ...this.content, ...result };
      }
    },
  },
});
