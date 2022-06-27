import { IEmailModel, IEmailMediaModel } from '../../../../src/models/EmailModel';
import { EmailMediaService } from 'src/services/EmailMedia/EmailMediaService';
import { useAuthStore } from 'src/stores/authStore';
import { defineComponent, computed } from 'vue';
import Table from '../../../../../wgo-base/core/components/Table/Table.vue';
import { ITableData, ITableRowButton } from '../../../../../wgo-base/core/models/Table';
import { getEmailMediaListSchema } from './EmailMediaSchema';
import EmailDetailsDialog from './EmailDetails/EmailDetailsDialog.vue';
import { BaseResizeComponent } from '../../../../../wgo-base/core/components/BaseComponents';
import { useRouter } from 'vue-router';
import { RouteService } from '../../../../../wgo-base/core/services/RouteService';
import { EmailMediaPaths } from 'src/router/paths/emailMediaPaths';
import { AuthPaths } from '../../../../../wgo-base/authentication/router';
import { useAppStatusStore } from 'src/stores/appStatusStore';

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
    const router = useRouter();
    const routeService = new RouteService(router);

    const fnAction = (row: any) => {
      this.showDetails(row);
      console.log('click on', row);
    };

    const rowBtns: ITableRowButton[] = [
      {
        icon: 'email',
        fnAction,
      },
      {
        icon: 'edit',
        fnAction: (row: any) => {
          const path = EmailMediaPaths.emailMediaDetails.path.replace(':mediaId', row.id);
          routeService.goTo(path);
        },
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
      routeService,
    };
  },
  methods: {
    async showDetails(row: IEmailMediaModel) {
      this.appStatusStore.loading = true;
      const email = await this.emailMediaService.getEmailById({ id: row.emailId });
      this.appStatusStore.loading = false;
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
    const appStatusStore = useAppStatusStore();
    return {
      authStore: authStore.authStore,
      appStatusStore,
    };
  },
  async mounted() {
    const user = this.authStore.user;
    this.appStatusStore.loading = true;
    if (user.email) {
      const data = await this.emailMediaService.getAllEmailMedia({
        email: user.email,
      });
      this.data = data as any as ITableData[];
    }
    this.appStatusStore.loading = false;
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
