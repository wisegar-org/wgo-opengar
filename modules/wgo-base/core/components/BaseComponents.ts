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
