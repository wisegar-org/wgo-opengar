import { Action } from 'vuex-class';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { MediaResponseGql } from 'src/graphql';
import {
  agvEventsActionsKeys,
  agvEventsNamespace
} from 'src/modules/agv/store/AGVEvents';
import QEditorToolbar from '../../../../../wgo/components/QEditorToolbar.vue';
import UploadImageDiv from '../../../../../wgo/components/UploadImageDiv/UploadImageDiv.vue';
import GalleryImage from '../../../../../wgo/components/GalleryImage/GalleryImage.vue';
import {
  AgvEventInputModel,
  AgvEventResponseModel
} from 'src/modules/agv/models/GraphqlModels';
import {
  EventClassOption,
  EventStateOptions,
  EventTypeOptions
} from 'src/modules/agv/models/Events';
import moment from 'moment';
import { QPopupProxy } from 'quasar';
import { isObject, isString } from 'lodash';
import {
  componentsActionsKeys,
  componentsNamespace
} from 'src/modules/wgo/store/ComponentsState';
import { INotify } from 'src/modules/wgo/models';

@Component({
  components: {
    QEditorToolbar,
    UploadImageDiv,
    GalleryImage
  }
})
export default class EditAgvEvent extends Vue {
  @Prop() agvEvent!: AgvEventResponseModel;
  @Prop() close!: () => void;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Action(agvEventsActionsKeys.agvModifyEvent, {
    namespace: agvEventsNamespace
  })
  updateEvent!: (item: AgvEventInputModel) => Promise<boolean>;
  @Action(agvEventsActionsKeys.agvCreateEvent, {
    namespace: agvEventsNamespace
  })
  createEvent!: (agvEvent: AgvEventInputModel) => Promise<boolean>;

  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  editProps: {
    id: number;
    title: string;
    description: string;
    shortDescription: string;
    class: string;
    type: string;
    startDate?: Date;
    endDate?: Date;
    visible: boolean;
    enrollment: boolean;
    state: string;
  };

  imgTitle: MediaResponseGql | null = null;
  imgList: MediaResponseGql[] = [];

  typeOptions = EventTypeOptions;
  stateOptions = EventStateOptions;
  classOptions = EventClassOption;
  date: string | { from: string; to: string } = '';

  constructor() {
    super();
    const classDefault = this.getDefaultClass();

    this.editProps = this.agvEvent
      ? {
          id: this.agvEvent.id,
          title: this.agvEvent.title || '',
          description: this.agvEvent.description || '',
          shortDescription: this.agvEvent.shortDescription || '',
          class: this.agvEvent.class || classDefault,
          type: this.agvEvent.type || 'Evento',
          startDate: this.agvEvent.startDate
            ? this.agvEvent.startDate
            : undefined,
          endDate: this.agvEvent.endDate ? this.agvEvent.endDate : undefined,
          visible: this.agvEvent.visible,
          enrollment: this.agvEvent.enrollment,
          state: this.agvEvent.state || ''
        }
      : {
          id: 0,
          title: '',
          description: '',
          shortDescription: '',
          class: classDefault,
          type: 'Evento',
          startDate: undefined,
          endDate: undefined,
          visible: true,
          enrollment: true,
          state: 'In sospeso'
        };
    if (this.agvEvent && this.agvEvent.imgTitle) {
      this.imgTitle = this.agvEvent.imgTitle;
    }
    if (this.agvEvent && this.agvEvent.imgList) {
      this.imgList = this.agvEvent.imgList;
    }
    if (
      this.agvEvent &&
      this.agvEvent.startDate &&
      this.agvEvent.endDate &&
      this.agvEvent.startDate !== this.agvEvent.endDate
    ) {
      this.date = {
        from: moment(this.agvEvent.startDate.toString()).format('DD/MM/YYYY'),
        to: moment(this.agvEvent.endDate.toString()).format('DD/MM/YYYY')
      };
    } else if (this.agvEvent && this.agvEvent.startDate) {
      this.date = moment(this.agvEvent.startDate.toString()).format(
        'DD/MM/YYYY'
      );
    } else if (this.agvEvent && this.agvEvent.endDate) {
      this.date = moment(this.agvEvent.endDate.toString()).format('DD/MM/YYYY');
    }
  }

  getDateStringValue() {
    if (isString(this.date)) {
      return this.date;
    }
    if (isObject(this.date)) {
      return `${this.date.from} - ${this.date.to}`;
    }
  }

  closePopUp(popup: unknown) {
    (popup as QPopupProxy).hide();
  }

  isValid() {
    return !!this.editProps && !!this.editProps.title;
  }

  getDefaultClass() {
    const date = new Date();
    const year = `${date.getFullYear() + (date.getMonth() > 7 ? 0 : -1)}`;
    const filterYears = EventClassOption.filter(cls => cls.startsWith(year));
    return filterYears.length > 0 ? filterYears[0] : EventClassOption[0];
  }

  setImageTitle(img: MediaResponseGql) {
    this.imgTitle = img;
  }

  setListImg(imgs: MediaResponseGql[]) {
    this.imgList = imgs;
  }

  getImgListIds() {
    return this.imgList.map(img => img.id);
  }

  getFormatServerDate(value: string | undefined) {
    return value ? moment(value, 'DD/MM/YYYY').format('YYYY/MM/DD') : undefined;
  }

  async updateProps() {
    this.showLoading(true);
    const arg = <AgvEventInputModel>{
      ...this.editProps,
      imgTitle: this.imgTitle ? this.imgTitle.id : 0,
      imgList: this.imgList ? this.getImgListIds() : []
    };
    if (this.date && isString(this.date)) {
      const date = this.getFormatServerDate(this.date);
      arg.startDate = date ? new Date(date) : undefined;
      arg.endDate = date ? new Date(date) : undefined;
    } else {
      const { from, to } = this.date as { from: string; to: string };
      const startD = this.getFormatServerDate(from);
      arg.startDate = startD ? new Date(startD) : undefined;
      const endD = this.getFormatServerDate(to);
      arg.endDate = endD ? new Date(endD) : undefined;
    }
    const result = this.agvEvent
      ? await this.updateEvent(arg)
      : this.createEvent(arg);

    if (result) {
      this.notify({
        message: `Evento ${
          this.agvEvent ? 'modificato' : 'creato'
        } con successo`,
        type: 'positive'
      });
      this.close();
    }
    this.showLoading(false);
  }
}
