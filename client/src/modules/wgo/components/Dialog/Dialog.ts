import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({})
export default class Dialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() title!: string;
  @Prop() icon!: string;
  @Prop() iconUrl!: string;
  @Prop({ default: false }) loading!: boolean;
  @Prop({ default: 'width: 800px; max-width: 90vw' }) styleDialog!: string;
  @Prop({ default: false }) fullWidth!: boolean;
  @Prop({ default: false }) fullHeight!: boolean;

  contentHeight = '380px';

  @Watch('showModal', { immediate: false })
  resizeContent() {
    if (this.showModal === true && this.contentHeight === '380px')
      this.$nextTick(() => setTimeout(this.onResize, 300));
  }

  onResize() {
    const vueElement = this.$refs.placeholder2 as Vue;
    if (vueElement && vueElement.$el) {
      const element = vueElement.$el as HTMLElement;
      const h = element.children[0].children[0].getBoundingClientRect().height;
      this.contentHeight = `max(min(70vh,${h}px), 20vh)`;
    } else {
      this.contentHeight = `300px`;
    }
  }

  getIcon() {
    if (!this.icon && !this.iconUrl) return '';
    return this.iconUrl ? `img:${this.iconUrl}` : this.icon;
  }

  mounted() {
    window.addEventListener('resize', this.onResize);
  }

  unmounted() {
    window.removeEventListener('resize', this.onResize);
  }
}
