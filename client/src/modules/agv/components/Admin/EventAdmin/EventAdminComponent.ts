import { AGVAdminPaths } from 'src/modules/agv';
import {
  EventClassOption,
  EventEnrollmentOptions,
  EventStateOptions,
  EventTypeOptions,
  EventVisibleOptions,
  IEventResponseFilter
} from 'src/modules/agv/models/Events';
import { AgvEventResponseModel } from 'src/modules/agv/models/GraphqlModels';
import { IInscriptionResponseFilter } from 'src/modules/agv/models/Inscriptions';
import { LocalStorageSettings } from 'src/modules/agv/settings/LocalStorageSettings';
import {
  agvEventsActionsKeys,
  agvEventsGettersKeys,
  agvEventsNamespace
} from 'src/modules/agv/store/AGVEvents';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { ColumnsEventAdmin } from './ColumnsEventAdmin';
import EditAgvEventDialog from './EditAgvEvent/EditAgvEventDialog.vue';
import { filterEventsAdmin } from './FilterEventAdmin';

@Component({
  components: {
    EditAgvEventDialog
  }
})
export default class EventAdminComponent extends Vue {
  @Action(agvEventsActionsKeys.agvAllEvents, { namespace: agvEventsNamespace })
  loadData!: () => Promise<AgvEventResponseModel[]>;

  @Getter(agvEventsGettersKeys.getAgvEvents, { namespace: agvEventsNamespace })
  eventList!: AgvEventResponseModel[];
  columns = ColumnsEventAdmin;
  loading = false;

  eventListFiltered: AgvEventResponseModel[] = [];

  selectedAgvEvent: AgvEventResponseModel | null = null;
  showEditAgvEventDialog = false;
  filter: IEventResponseFilter = {
    class: '',
    state: '',
    title: '',
    type: '',
    enrollment: '',
    visible: ''
  };

  typeOptions = EventTypeOptions;
  stateOptions = EventStateOptions;
  classOptions = EventClassOption;
  enrollmentOptions = EventEnrollmentOptions;
  visibleOptions = EventVisibleOptions;

  @Watch('eventList')
  onChangeListEvent() {
    this.eventListFiltered = filterEventsAdmin(this.eventList, this.filter);
  }

  @Watch('filter.state')
  @Watch('filter.type')
  @Watch('filter.class')
  @Watch('filter.title')
  @Watch('filter.enrollment')
  @Watch('filter.visible')
  filterItems() {
    this.eventListFiltered = filterEventsAdmin(this.eventList, this.filter);
    this.setFilterStorage();
  }

  createAgvEvent(row: AgvEventResponseModel | null) {
    this.selectedAgvEvent = row;
    this.showEditAgvEventDialog = true;
  }

  setFilterStorage() {
    localStorage.setItem(
      LocalStorageSettings.KEY_EVENTS_ADMIN_FILTER,
      JSON.stringify(this.filter)
    );
  }

  getFilterStorage() {
    const filters = localStorage.getItem(
      LocalStorageSettings.KEY_EVENTS_ADMIN_FILTER
    );
    return filters
      ? (JSON.parse(filters) as IEventResponseFilter)
      : <IEventResponseFilter>{
          class: '',
          state: '',
          title: '',
          type: '',
          enrollment: '',
          visible: ''
        };
  }

  goToInscriptions(record: AgvEventResponseModel) {
    localStorage.setItem(
      LocalStorageSettings.KEY_INSCRIPTION_ADMIN_FILTER,
      JSON.stringify(<IInscriptionResponseFilter>{
        eventTitle: record.title,
        email: '',
        eventClass: '',
        nome: '',
        phone: ''
      })
    );
    void this.$router.push(AGVAdminPaths.adminInscriptions.url);
  }

  async mounted() {
    await this.loadData();
    this.filter = this.getFilterStorage();
    this.eventListFiltered = filterEventsAdmin(this.eventList, this.filter);
  }
}
