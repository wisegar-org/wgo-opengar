import { TranslationStore } from "../../translation/models/TranslationStore";

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
      this.componentHeight = window.innerHeight - h - defaultBottomPx;
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
}
