import { IEmailModel, IEmailMediaModel } from '../../../../src/models/EmailModel';
import { EmailMediaService } from 'src/services/EmailMedia/EmailMediaService';
import { useAuthStore } from 'src/stores/authStore';
import { defineComponent, computed, PropType } from 'vue';
import Table from '../../wgo-base/core/components/Table/Table.vue';
import { ITableData, ITableRowButton } from '../../wgo-base/core/models/Table';
import { getEmailMediaListSchema } from './EmailMediaSchema';
import EmailDetailsDialog from './EmailDetails/EmailDetailsDialog.vue';
import { BaseResizeComponent } from '../../wgo-base/core/components/BaseComponents';
import { useRouter } from 'vue-router';
import { RouteService } from '../../wgo-base/core/services/RouteService';
import { EmailMediaPaths } from 'src/router/paths/emailMediaPaths';
import { AuthPaths } from '../../wgo-base/authentication/router';
import { useAppStatusStore } from 'src/stores/appStatusStore';
import { translations as tranBase } from '../../wgo-base/core/models';
import { translations } from './translations';
import { TranslationStore } from '../../wgo-base/translation/models/TranslationStore';

export default defineComponent({
  name: 'EmailMediaList',
  props: {
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
  },
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
      const path = EmailMediaPaths.emailMediaDetails.path.replace(':mediaId', row.id);
      routeService.goTo(path);
    };

    const rowBtns: ITableRowButton[] = [
      {
        icon: 'email',
        fnAction: (row: any) => {
          this.showDetails(row);
          console.log('click on', row);
        },
        tooltip: translations.TAB_EMAIL_TITLE,
      },
      {
        icon: 'preview',
        fnAction,
        tooltip: tranBase.DETAILS,
      },
    ];

    const resizeComponent = new BaseResizeComponent();
    const { componentHeight, addResize, removeResize, resizeTable } = resizeComponent;
    const schema = getEmailMediaListSchema(this.tranStore, [], rowBtns);
    schema.rowDblClick = fnAction;
    schema.rowsPerPage = this.$q.platform.is.mobile ? [5, 10, 20, 0] : [15, 20, 30, 50, 100, 0];
    schema.rowsPerPageDefault = 0;
    return {
      data,
      emailMediaService,
      emailDetails,
      open: false,
      schema: schema,
      componentHeight,
      addResize,
      removeResize,
      resizeTable,
      routeService,
      translations,
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
