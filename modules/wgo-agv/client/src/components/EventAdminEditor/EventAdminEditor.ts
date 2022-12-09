import { defineComponent, PropType } from "vue";
import UploadImageDiv from "src/wgo-base/client/storage/components/UploadImageDiv/UploadImageDiv.vue";
import GalleryImage from "src/wgo-base/client/storage/components/GalleryImage/GalleryImage.vue";
import QCKEditor from "src/wgo-base/client/core/components/CKEditor/QCKEditor.vue";
import { translations as transBase } from "src/wgo-base/models/core";
import { translations } from "src/models/translations/events";
import { useTranslationStore } from "src/stores/translationStore";
import { BaseTranslateComponent } from "src/wgo-base/client/core/components/BaseComponents";
import { AgvEventInputModel, AgvEventResponseModel } from "src/models/models";
import { useAppStatusStore } from "src/stores/appStatusStore";
import { useNotifyStore } from "src/stores/notifyStore";
import { EventService } from "src/services/Event/EventService";
import {
  EventClassOption,
  EventStateOptions,
  EventTypeOptions,
} from "src/models/Events";
import { QPopupProxy } from "quasar";
import Dialog from "src/wgo-base/client/core/components/Dialog/Dialog.vue";
import { apiSettings } from "src/api/ApiOptions";
import { IMediaResponse } from "src/wgo-base/models/storage";
import { UtilService } from "src/wgo-base/client/core/services/UtilService";
import { TranslationStore } from "src/wgo-base/client/translation/store/TranslationStore";

export default defineComponent({
  name: "EventAdminEditor",
  components: {
    Dialog,
    GalleryImage,
    UploadImageDiv,
    QCKEditor,
  },
  props: {
    event: { type: Object as PropType<AgvEventResponseModel>, required: true },
  },
  data(vm) {
    const imgTitle: IMediaResponse = this.event.imgTitle || {};
    const imgList: IMediaResponse[] = this.event.imgList || [];
    const { getLabel } = new BaseTranslateComponent();
    const startDate = UtilService.parseDate(
      (this.event.startDate || new Date()).toString(),
      "DD/MM/YYYY"
    );
    const endDate = UtilService.parseDate(
      (this.event.endDate || new Date()).toString(),
      "DD/MM/YYYY"
    );
    const date: any =
      startDate !== endDate
        ? {
            from: startDate,
            to: endDate,
          }
        : startDate;
    const urlApi = apiSettings.API_BASE;

    return {
      date,
      urlApi,
      imgTitle,
      imgList,
      transBase,
      translations,
      getLabel: (name: string) => getLabel(this.tranStore as any, name),
    };
  },
  setup() {
    const translationStore = useTranslationStore();
    const appStatusStore = useAppStatusStore();
    const notifyStore = useNotifyStore();

    const typeOptions = EventTypeOptions;
    const stateOptions = EventStateOptions;
    const classOptions = EventClassOption;
    return {
      typeOptions,
      stateOptions,
      classOptions,
      tranStore: translationStore.translationStore as TranslationStore,
      appStatusStore,
      notifyStore,
    };
  },
  methods: {
    async updateProps() {
      this.appStatusStore.setLoading(true);
      const arg = <AgvEventInputModel>{
        class: this.event.class,
        description: this.event.description,
        enrollment: this.event.enrollment,
        id: this.event.id,
        state: this.event.state,
        title: this.event.title,
        type: this.event.type,
        visible: this.event.visible,
        shortDescription: this.event.shortDescription || "",
        imgTitle: this.imgTitle ? this.imgTitle.id : 0,
        imgList: this.imgList ? this.getImgListIds() : [],
      };
      if (this.date && typeof this.date === "string") {
        const date = this.getFormatServerDate(this.date);
        arg.startDate = date ? new Date(date) : undefined;
        arg.endDate = date ? new Date(date) : undefined;
      } else {
        const { from, to } = this.date as any as { from: string; to: string };
        const startD = this.getFormatServerDate(from);
        arg.startDate = startD ? new Date(startD) : undefined;
        const endD = this.getFormatServerDate(to);
        arg.endDate = endD ? new Date(endD) : undefined;
      }
      const eventService = new EventService();
      const result = this.event.id
        ? await eventService.modifyEvent(arg)
        : await eventService.createEvent(arg);

      if (result) {
        this.notifyStore.setNotify({
          message: `Evento ${
            this.event.id ? "modificato" : "creato"
          } con successo`,
          type: "positive",
          position: "top",
        });
        this.$emit("success");
      }
      this.appStatusStore.setLoading(false);
    },
    setImageTitle(img: IMediaResponse) {
      this.imgTitle = img;
    },

    setListImg(imgs: IMediaResponse[]) {
      this.imgList = imgs;
    },
    closePopUp(popup: unknown) {
      (popup as QPopupProxy).hide();
    },
    getImgListIds() {
      return this.imgList.map((img) => img.id);
    },
    getDateStringValue() {
      if (typeof this.date === "string") {
        return this.date;
      } else {
        return `${(this.date as any).from} - ${(this.date as any).to}`;
      }
    },
    getFormatServerDate(value: string | undefined) {
      return value
        ? UtilService.parseDateFormFormat(value, "DD/MM/YYYY", "YYYY/MM/DD")
        : undefined;
    },
    isValid() {
      return !!this.event && !!this.event.title;
    },
  },
  emits: ["success"],
});
