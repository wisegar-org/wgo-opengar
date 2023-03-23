import {
  MediaResponseGql,
  SeoInputGql,
  SeoMetaResponseGql,
  SeoResponseGql
} from 'src/graphql';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from '../../store/Language';
import { seoActions, seoGetters, seoNamespace } from '../../store/Seo';
import { ITranslationSeoKeys, TranslationsKeys } from './TranslationsKeys';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../store/ComponentsState';
import { INotify } from '../../models';
import SeoExpandedEditor from './SeoExpanded/SeoExpandedEditor.vue';
import UploadFavIconDiv from '../UploadImageDiv/UploadFavIconDiv.vue';

@Component({
  components: {
    SeoExpandedEditor,
    UploadFavIconDiv
  }
})
export default class SeoComponent extends Vue {
  @Action(seoActions.loadSeoData, { namespace: seoNamespace })
  loadSeoData!: () => Promise<unknown>;
  @Action(seoActions.setSeoData, { namespace: seoNamespace })
  setSeoData!: (record: SeoInputGql) => Promise<boolean>;
  @Getter(seoGetters.getSeoData, { namespace: seoNamespace })
  seoData!: SeoResponseGql;
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationSeoKeys;

  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  showEditMedaData = false;
  loading = false;
  innerLoading = true;
  metaData: { [key: string]: SeoMetaResponseGql } = {};
  metaProps: string[] = [];
  path = '';
  search = '';
  maxPage = 0;
  currentPage = 1;
  metaCount = 0;
  seoMetaXPage = 5;
  imgFavIcon: MediaResponseGql | null = null;

  clickEditMetaData() {
    this.showEditMedaData = true;
  }

  @Watch('search')
  editSearch() {
    this.currentPage = 1;
    const props = Object.keys(this.metaData).filter(
      prop => !this.search || prop.indexOf(this.search) !== -1
    );
    this.metaProps = props.slice(0, this.seoMetaXPage);
    this.metaCount = props.length;
    this.maxPage =
      Math.floor(this.metaCount / this.seoMetaXPage) +
      (this.metaCount % this.seoMetaXPage > 0 ? 1 : 0);
  }

  @Watch('currentPage')
  changePage() {
    const props = Object.keys(this.metaData).filter(
      prop => !this.search || prop.indexOf(this.search) !== -1
    );
    const index = (this.currentPage - 1) * this.seoMetaXPage;
    this.metaProps = props.slice(index, index + this.seoMetaXPage);
  }

  async clickSaveSeoData() {
    this.loading = true;
    const seoData = <SeoInputGql>{
      module: this.seoData.module,
      path: this.path,
      meta: Object.values(this.metaData)
    };
    if (await this.setSeoData(seoData)) {
      this.reloadPage();
      this.notify({
        message: this.translationContent.WGO_SEO_SUCCESS_EDIT_ACTION,
        type: 'positive'
      });
    } else {
      this.notify({
        message: this.translationContent.WGO_SEO_FAIL_EDIT_ACTION,
        type: 'negative'
      });
    }
    this.loading = false;
  }

  @Watch('seoData')
  reloadMetaData() {
    this.metaData = {};
    this.seoData.meta.forEach(item => {
      this.metaData[item.name || item.property] = {
        name: item.name,
        property: item.property,
        content: item.content,
        type: item.type
      };
    });
    this.path = this.seoData.path;
    this.imgFavIcon = this.seoData.favicon ? this.seoData.favicon : null;

    this.editSearch();
  }

  reloadPage() {
    location.reload();
  }

  setFaviconImage(img: MediaResponseGql) {
    this.imgFavIcon = img;
  }

  showLoading(loading: boolean) {
    this.loading = loading;
  }

  async created() {
    await this.registerTranslations(TranslationsKeys);
    await this.loadSeoData();
    this.reloadMetaData();
    this.innerLoading = false;
  }
}
