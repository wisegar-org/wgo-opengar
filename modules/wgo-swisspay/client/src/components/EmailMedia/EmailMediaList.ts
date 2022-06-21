import { IEmailModel, IEmailMediaModel } from '../../../../src/models/EmailModel';
import { EmailMediaService } from 'src/services/EmailMedia/EmailMediaService';
import { useAuthStore } from 'src/stores/authStore';
import { defineComponent, computed } from 'vue';
import Table from '../../../../../wgo-base/core/components/Table/Table.vue';
import { ITableData, ITableRowButton } from '../../../../../wgo-base/core/models/Table';
import { getEmailMediaListSchema } from './EmailMediaSchema';
import EmailDetailsDialog from './EmailDetails/EmailDetailsDialog.vue';
import { BaseResizeComponent } from '../../../../../wgo-base/core/components/BaseComponents';

export default defineComponent({
  name: 'EmailMediaList',
  components: {
    Table,
    EmailDetailsDialog,
  },
  data() {
    const emailMediaService = new EmailMediaService();
    const data = [] as ITableData[];
    const emailDetails: IEmailModel = {} as IEmailModel;

    const fnAction = (row: any) => {
      this.showDetails(row);
      console.log('click on', row);
    };

    const rowBtns: ITableRowButton[] = [
      {
        icon: 'email',
        fnAction,
      },
    ];

    const resizeComponent = new BaseResizeComponent();
    const { componentHeight, addResize, removeResize, resizeTable } = resizeComponent;
    return {
      data,
      emailMediaService,
      emailDetails,
      open: false,
      schema: getEmailMediaListSchema([], rowBtns),
      componentHeight,
      addResize,
      removeResize,
      resizeTable,
    };
  },
  methods: {
    async showDetails(row: IEmailMediaModel) {
      const email = await this.emailMediaService.getEmailById({ id: row.emailId });
      if (!!email) {
        this.emailDetails = email;
        this.open = true;
      }
    },
    closeDetails() {
      this.open = false;
    },
    onResize() {
      // this.$nextTick(() => {
      this.resizeTable(this.$refs.placeholder as HTMLElement);
      // });
    },
  },
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    };
  },
  async mounted() {
    const user = this.authStore.user;
    if (user.email) {
      const data = await this.emailMediaService.getAllEmailMedia({
        email: user.email,
      });
      this.data = data as any as ITableData[];
    }
  },
  created() {
    this.$nextTick(() => {
      this.addResize(this.onResize);
    });
  },
  async unmounted() {
    this.removeResize(this.onResize);
  },
});
