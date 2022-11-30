import { TranslationStore } from "../../translation/models/TranslationStore";
import { ObjectDictionary } from "../models";
import { ISeoModel } from "../models/seo";
import { UtilService } from "../services/UtilService";

export class BaseResizeComponent {
  public componentHeight = 300;

  public addResize(onResizeFn: any) {
    window.addEventListener("resize", onResizeFn);
    onResizeFn();
  }

  public removeResize(onResizeFn: any) {
    window.removeEventListener("resize", onResizeFn);
  }

  public resizeTable(
    placeholder: HTMLElement,
    defaultBottomPx: number = 0,
    defaultPlaceholderPx: number = 157
  ) {
    if (placeholder) {
      const h =
        placeholder.getBoundingClientRect().bottom || defaultPlaceholderPx;
      const height = window.innerHeight - h - defaultBottomPx;
      this.componentHeight = Math.max(400, height);
    } else {
      this.componentHeight = 500;
    }
  }
}

export class BaseTranslateComponent {
  public getLabel(tranStore: TranslationStore, name: string) {
    if (tranStore && name) return tranStore.getTranslation(name);
    return name;
  }

  public getTrimLabel(tranStore: TranslationStore, name: string) {
    if (tranStore && name) {
      return UtilService.removeTags(tranStore.getTranslation(name));
    }
    return name;
  }
}

export class BaseSeoDataComponent {
  public seoData: ObjectDictionary = {
    title: "Title default",
    titleTemplate: (title: string) => `${title} - My Website`,
    meta: {
      description: { name: "description", content: "Page 1" },
      keywords: { name: "keywords", content: "Quasar website" },
      equiv: {
        "http-equiv": "Content-Type",
        content: "text/html; charset=UTF-8",
      },
      ogTitle: {
        property: "og:title",
        template(ogTitle: string) {
          return `${ogTitle} - My Website`;
        },
      },
    },
  };

  public setSeoData(seoData: ISeoModel) {
    this.seoData.title = seoData.title;
    if (seoData.description)
      this.seoData.meta.description.content = seoData.description;
    if (seoData.keywords) this.seoData.meta.keywords.content = seoData.keywords;
    if (seoData.equiv) this.seoData.meta.equiv.content = seoData.equiv;
  }
}
