import Vue from 'vue';
import { Prop } from 'vue-property-decorator';

export default class Field extends Vue {
  @Prop({ default: '' })
  protected readonly label!: string;
  @Prop({ default: false })
  protected readonly obbligatorio!: boolean;
  @Prop({ default: false })
  protected readonly?: boolean;

  constructor() {
    super();
  }

  public validate(): Promise<boolean> {
    return (this.$refs['input'] as any).validate();
  }
  public resetValidate() {
    (this.$refs['input'] as any).resetValidate();
  }
}
