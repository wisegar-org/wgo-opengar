/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Action, Getter } from 'vuex-class';
import { Vue as VueProp, Component, Watch } from 'vue-property-decorator';
import { billsActions } from 'src/modules/finance/store/actions/billActions';
import { githubGetters, githubNamespace } from 'src/modules/finance/store';
import LanguageSimpleSelect from '../../../../wgo/components/Languages/LanguageSelect/LanguageSimpleSelect.vue';

import {
  componentsActionsKeys,
  componentsNamespace
} from '../../../../wgo/store/ComponentsState';
import {
  BillRecord,
  TemplateHTML,
  TemplateStyle
} from 'src/modules/finance/models/models';
import { INotify } from 'src/modules/wgo/models';
import { LanguageResponseGql } from 'src/graphql';
import {
  languageGetters,
  languageNamespace
} from 'src/modules/wgo/store/Language';

@Component({
  components: {
    LanguageSimpleSelect
  }
})
export default class BillTemplatePage extends VueProp {
  @Action(billsActions.loadBills, { namespace: githubNamespace })
  loadData!: (force: boolean) => Promise<void>;
  @Getter(githubGetters.getBills, { namespace: githubNamespace })
  bills!: BillRecord[];
  @Action(billsActions.loadBillTemplate, { namespace: githubNamespace })
  loadTemplate!: (value: {
    entityTemplate: string;
    langId: number;
  }) => Promise<TemplateHTML>;
  @Action(billsActions.getBillDocumentPreview, { namespace: githubNamespace })
  getBillDocumentPreview!: (config: {
    entityTemplate: string;
    idBill: number;
    templateHTML: string;
    templateStyle: string;
  }) => Promise<string>;
  @Action(billsActions.saveBillTemplate, { namespace: githubNamespace })
  saveTemplate!: (value: {
    value: TemplateHTML;
    langId: number;
  }) => Promise<boolean>;
  @Action(billsActions.saveBillStyleTemplate, { namespace: githubNamespace })
  saveStyleTemplate!: (value: {
    template: TemplateStyle;
    documentToSet: number;
  }) => Promise<boolean>;
  @Getter(languageGetters.getLanguage, { namespace: languageNamespace })
  languageGlobal!: LanguageResponseGql;

  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;
  template = <TemplateHTML>{};
  editorConfig = {
    allowedContent: true,
    fullPage: true
  };
  content = '';
  showPreview = false;
  templateOptions = ['BILL_TEMPLATE', 'BILL_EMAIL_TEMPLATE'];
  selectedTemplate = this.templateOptions[0];
  language: LanguageResponseGql = this.languageGlobal;
  translations: { [key: number]: { [key: string]: TemplateHTML } } = {};

  async save() {
    const saveStyleTemplate = await this.saveStyleTemplate({
      template: this.template.styleTemplate,
      documentToSet: this.template.id
    });
    const saveTemplate = await this.saveTemplate({
      value: this.template,
      langId: this.language.id
    });
    if (saveStyleTemplate && saveTemplate) {
      this.notify({
        message: 'Bill template modified successfully ',
        type: 'positive'
      });
    }
  }

  async getPreview() {
    this.content = await this.getBillDocumentPreview({
      entityTemplate: this.selectedTemplate,
      idBill: this.bills.length > 0 ? this.bills[0].id : 0,
      templateHTML: this.template.body,
      templateStyle: this.template.styleTemplate.body
    });
    this.showPreview = true;
  }

  async changeLanguage(lang: LanguageResponseGql) {
    this.language = lang;
    await this.getTemplate();
  }

  @Watch('languageGlobal')
  async setGlobalLanguage() {
    await this.changeLanguage(this.languageGlobal);
  }

  @Watch('selectedTemplate')
  async getTemplateBySelection() {
    await this.getTemplate();
  }

  async getTemplate() {
    if (
      this.language.id in this.translations &&
      !!this.translations[this.language.id] &&
      this.selectedTemplate in this.translations[this.language.id]
    ) {
      this.template = this.translations[this.language.id][
        this.selectedTemplate
      ];
    } else {
      this.template = await this.loadTemplate({
        entityTemplate: this.selectedTemplate,
        langId: this.language.id
      });
      if (!this.translations[this.language.id])
        this.translations[this.language.id] = {};
      this.translations[this.language.id][
        this.selectedTemplate
      ] = this.template;
    }
  }

  async mounted() {
    await this.loadData(false);
    if (this.languageGlobal) {
      await this.setGlobalLanguage();
    }
  }
}
