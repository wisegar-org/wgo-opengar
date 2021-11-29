import { QFile } from 'quasar';
import {
  Vue,
  Component,
  Watch,
  Prop,
  Model,
  Emit
} from 'vue-property-decorator';
import VueSignaturePad from 'vue-signature-pad';
import { Getter } from 'vuex-class';
import {
  componentsGettedKeys,
  componentsNamespace
} from '../../store/ComponentsState';

@Component({
  components: {
    VueSignaturePad
  }
})
export default class InputDrawer extends Vue {
  @Prop({ default: '100%' }) width!: string;
  @Prop({ default: '100%' }) height!: string;
  @Prop({ default: false }) readonly!: boolean;
  @Model() urlData!: string;

  @Getter(componentsGettedKeys.getLeftDrawerOpen, {
    namespace: componentsNamespace
  })
  show!: boolean;
  @Getter(componentsGettedKeys.getLeftDrawerMinState, {
    namespace: componentsNamespace
  })
  minState!: boolean;
  isEmpty = true;
  data = '';
  options = {
    onBegin: () => {},
    onEnd: this.onEndPad
  };
  id_input =
    'upload-button-' +
    Math.random()
      .toString(36)
      .substring(2, 10);

  /**
   *
   */
  constructor() {
    super();
    if (this.readonly)
      this.$nextTick(() => {
        (this.$refs.signaturePad as any).lockSignaturePad();
      });
  }

  @Watch('readonly')
  signatureStatus() {
    !!this.readonly
      ? (this.$refs.signaturePad as any).lockSignaturePad()
      : (this.$refs.signaturePad as any).openSignaturePad();
  }

  openLoadFile() {
    (this.$refs[this.id_input] as QFile).pickFiles();
  }

  @Emit('urlData')
  onChange() {
    const { data } = (this.$refs.signaturePad as any).saveSignature();
    return data;
  }

  onEndPad() {
    this.isEmpty = false;
    this.onChange();
  }

  undoSignature() {
    (this.$refs.signaturePad as any).undoSignature();
    const { isEmpty } = (this.$refs.signaturePad as any).saveSignature();
    this.isEmpty = isEmpty;
  }

  downloadSignature() {
    const { data } = (this.$refs.signaturePad as any).saveSignature();
    void fetch(data)
      .then(response => response.blob())
      .then(blob => {
        let link = window.document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'file';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });

    (this.$refs.signaturePad as any).fromDataURL(`${data}`);
  }

  async uploadSignature(qFile: any) {
    const stream = new FileReader();
    stream.onloadend = () => {
      (this.$refs.signaturePad as any).fromDataURL(`${stream.result}`);
    };
    stream.readAsDataURL(qFile);
  }

  getDisplayInXS() {
    return this.$q.screen.xs;
  }

  @Watch('show', { immediate: false })
  @Watch('minState', { immediate: false })
  reziseSignaturePad() {
    this.$nextTick(() => {
      (this.$refs.signaturePad as any).resizeCanvas();
      if (this.urlData) {
        (this.$refs.signaturePad as any).fromDataURL(`${this.urlData}`);
        this.isEmpty = false;
      }
    });
  }
  mounted() {
    this.reziseSignaturePad();
    if (this.urlData) {
      (this.$refs.signaturePad as any).fromDataURL(`${this.urlData}`);
      this.isEmpty = false;
    }
  }
}
