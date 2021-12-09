import { ApiSettings } from '../../../settings/ApiSettings';
import {
  FilterIssuesModel,
  FiltersIsuesKeys,
  githubGetters,
  githubNamespace,
  OptionFilter,
  OrganizationDataRecord
} from 'src/modules/finance';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';
import FilterSelect from '../../FilterSelect.vue';
import { UserLogged } from 'src/modules/wgo/models/models';

@Component({
  components: {
    Dialog,
    FilterSelect
  }
})
export default class IssuesFilter extends Vue {
  @Prop({ default: false }) open!: boolean;
  @Prop() title!: string;
  @Prop() icon!: string;
  @Prop() filters!: FilterIssuesModel;
  @Prop({ default: () => {} }) close!: () => unknown;
  @Prop({ default: () => {} }) applyFilter!: (
    filter: FilterIssuesModel
  ) => unknown;
  @Getter(ApiSettings.USER_LOGGED_GETTER, {
    namespace: ApiSettings.USER_NAMESPACE
  })
  userLogged!: UserLogged;
  @Getter(githubGetters.getMilestones, { namespace: githubNamespace })
  optionsMilestones!: OptionFilter[];
  @Getter(githubGetters.getLabels, { namespace: githubNamespace })
  optionsLabels!: OptionFilter[];
  @Getter(githubGetters.getProjects, { namespace: githubNamespace })
  optionsProjects!: OptionFilter[];
  @Getter(githubGetters.getCollaborators, { namespace: githubNamespace })
  optionsCollaborators!: OptionFilter[];
  @Getter(githubGetters.getRepositories, { namespace: githubNamespace })
  optionsRepository!: OptionFilter[];
  @Getter(githubGetters.getOrganizationData, { namespace: githubNamespace })
  organizationData!: OrganizationDataRecord;

  optionsStatus: OptionFilter[] = [
    { id: 1, label: 'Accounted', title: 'Accounted' },
    { id: 2, label: 'Pending', title: 'Pending' }
  ];

  filtersEdit: FilterIssuesModel;

  constructor() {
    super();
    this.filtersEdit = { ...this.filters };
  }

  setFilter(prop: FiltersIsuesKeys, value: OptionFilter | null) {
    this.filtersEdit[prop] = value;
  }

  onResetFilter() {
    this.filtersEdit = {
      milestones: null,
      labels: null,
      project: null,
      assignedTo: null,
      repository: null,
      minDate: null,
      maxDate: null,
      status: null
    };
  }

  onApplyFilter() {
    if (this.applyFilter) {
      this.applyFilter(this.filtersEdit);
    }
    if (this.close) {
      this.close();
    }
  }

  getOptionsCollaborators() {
    return this.optionsCollaborators.filter(coll => coll.isCollaborator);
  }
}
