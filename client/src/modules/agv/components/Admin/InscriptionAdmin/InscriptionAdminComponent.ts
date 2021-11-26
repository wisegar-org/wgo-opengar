import { EventClassOption } from 'src/modules/agv/models/Events';
import {
  AgvEventResponseModel,
  AgvInscriptionResponseModel
} from 'src/modules/agv/models/GraphqlModels';
import { IInscriptionResponseFilter } from 'src/modules/agv/models/Inscriptions';
import { PollService } from 'src/modules/agv/services';
import { LocalStorageSettings } from 'src/modules/agv/settings/LocalStorageSettings';
import {
  agvEventsActionsKeys,
  agvEventsNamespace
} from 'src/modules/agv/store/AGVEvents';

import {
  agvInscriptionsActionsKeys,
  agvInscriptionsGettersKeys,
  agvInscriptionsNamespace
} from 'src/modules/agv/store/AGVInscriptions';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { ColumnsInscriptionAdmin } from './ColumnsInscriptionAdmin';
import { filterInscriptionsAdmin } from './FilterInscriptionAdmin';
import InscriptionViewerDialog from './InscriptionsViewer/InscriptionViewerDialog.vue';

@Component({
  components: {
    InscriptionViewerDialog
  }
})
export default class InscriptionAdminComponent extends Vue {
  @Action(agvInscriptionsActionsKeys.agvAllInscriptions, {
    namespace: agvInscriptionsNamespace
  })
  loadData!: () => Promise<AgvInscriptionResponseModel[]>;
  @Action(agvEventsActionsKeys.agvAllEvents, { namespace: agvEventsNamespace })
  loadEventData!: () => Promise<AgvEventResponseModel[]>;

  @Getter(agvInscriptionsGettersKeys.getAgvInscriptions, {
    namespace: agvInscriptionsNamespace
  })
  inscriptionList!: AgvInscriptionResponseModel[];

  @Action(agvEventsActionsKeys.agvGetEventsTitle, {
    namespace: agvEventsNamespace
  })
  getEvenstTitles!: () => Promise<string[]>;

  eventTitleOptions: string[] = [];

  columns = ColumnsInscriptionAdmin;
  loading = false;
  showInscriptionViewerDialog = false;
  eventClassOptions = EventClassOption;
  classOptions: string[] = [];

  inscriptionListFiltered: AgvInscriptionResponseModel[] = [];

  selectedAgvInscription: AgvInscriptionResponseModel | null = null;

  filter: IInscriptionResponseFilter = {
    email: '',
    eventTitle: '',
    eventClass: '',
    nome: '',
    phone: '',
    class: ''
  };

  @Watch('inscriptionList')
  onChangeListInscription() {
    this.inscriptionListFiltered = filterInscriptionsAdmin(
      this.inscriptionList,
      this.filter
    );
  }

  @Watch('filter.email')
  @Watch('filter.eventTitle')
  @Watch('filter.eventClass')
  @Watch('filter.nome')
  @Watch('filter.phone')
  @Watch('filter.class')
  filterItems() {
    this.inscriptionListFiltered = filterInscriptionsAdmin(
      this.inscriptionList,
      this.filter
    );
    this.setFilterStorage();
  }

  setFilterStorage() {
    localStorage.setItem(
      LocalStorageSettings.KEY_INSCRIPTION_ADMIN_FILTER,
      JSON.stringify(this.filter)
    );
  }

  getFilterStorage() {
    const filters = localStorage.getItem(
      LocalStorageSettings.KEY_INSCRIPTION_ADMIN_FILTER
    );
    return filters
      ? (JSON.parse(filters) as IInscriptionResponseFilter)
      : <IInscriptionResponseFilter>{
          eventTitle: '',
          email: '',
          eventClass: '',
          nome: '',
          phone: '',
          class: ''
        };
  }

  showInscriptionDetail(record: AgvInscriptionResponseModel) {
    this.selectedAgvInscription = record;
    this.showInscriptionViewerDialog = true;
  }

  async mounted() {
    await this.loadData();
    await this.loadEventData();
    const pollService = new PollService();
    const pollConfig = await pollService.getPollConfig();
    this.classOptions = pollConfig.options.class;
    this.eventTitleOptions = await this.getEvenstTitles();
    this.filter = this.getFilterStorage();
    this.inscriptionListFiltered = filterInscriptionsAdmin(
      this.inscriptionList,
      this.filter
    );
  }
}
