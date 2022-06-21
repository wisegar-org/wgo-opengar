import { IEmailModel } from '../../../../../src/models/EmailModel';
import { defineComponent, PropType } from 'vue';
import Dialog from '../../../../../../wgo-base/core/components/Dialog/Dialog.vue';
import { UtilService } from '../../../../../../wgo-base/core/services/UtilService';

export default defineComponent({
  name: 'EmailDetailsDialog',
  components: {
    Dialog,
  },
  props: {
    open: { type: Boolean, default: false },
    email: {
      type: Object as PropType<IEmailModel>,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
  computed: {
    date() {
      return UtilService.parseDate(this.email.date);
    },
  },
  emits: {
    close() {
      return true;
    },
  },
});
