import { Action, Getter } from 'vuex-class';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { accountingActions } from 'src/modules/finance/store/actions/accountigActions';
import { githubGetters, githubNamespace } from 'src/modules/finance/store';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../../../wgo/store/ComponentsState';
import {
  AccountRecord,
  TemplateHTML,
  TemplateStyle
} from '../../../models/models';
import { INotify } from 'src/modules/wgo/models';

@Component({})
export default class AccountingTemplatePage extends Vue {
  @Action(accountingActions.loadAllAcounting, { namespace: githubNamespace })
  loadData!: (force: boolean) => Promise<void>;
  @Getter(githubGetters.getAccounting, { namespace: githubNamespace })
  accoutings!: AccountRecord[];
  @Action(accountingActions.loadAccountingTemplate, {
    namespace: githubNamespace
  })
  loadTemplate!: (entityTemplate: string) => Promise<TemplateHTML>;
  @Action(accountingActions.getAccountingDocumentPreview, {
    namespace: githubNamespace
  })
  getBillDocumentPreview!: (config: {
    entityTemplate: string;
    idAccounting: number;
    templateHTML: string;
    templateStyle: string;
  }) => Promise<string>;
  @Action(accountingActions.saveAccountingTemplate, {
    namespace: githubNamespace
  })
  saveTemplate!: (value: TemplateHTML) => Promise<boolean>;
  @Action(accountingActions.saveAccountingStyleTemplate, {
    namespace: githubNamespace
  })
  saveStyleTemplate!: (value: {
    template: TemplateStyle;
    documentToSet: number;
  }) => Promise<boolean>;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;
  content = '';
  template = <TemplateHTML>{};
  showPreview = false;
  templateOptions = ['ACCOUNTING_TEMPLATE', 'ACCOUNTING_EMAIL_TEMPLATE'];
  selectedTemplate = this.templateOptions[0];
  showLoading = false;

  async save() {
    const saveStyleTemplate = await this.saveStyleTemplate({
      template: this.template.styleTemplate,
      documentToSet: this.template.id
    });
    const saveTemplate = await this.saveTemplate(this.template);
    if (saveStyleTemplate && saveTemplate) {
      this.notify({
        message: 'Accounting template modified successfully ',
        type: 'positive'
      });
    }
  }

  // pasteCapture (evt: any) {
  //   // Let inputs do their thing, so we don't break pasting of links.
  //   if (evt.target.nodeName === 'INPUT') return
  //   let text, onPasteStripFormattingIEPaste
  //   evt.preventDefault()
  //   if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
  //     text = evt.originalEvent.clipboardData.getData('text/plain')
  //     (this.$refs.editorRef as QEditor).value.runCmd('insertText', text)
  //   }
  //   else if (evt.clipboardData && evt.clipboardData.getData) {
  //     text = evt.clipboardData.getData('text/plain')
  //     (this.$refs.editorRef as QEditor).editorRef.value.runCmd('insertText', text)
  //   }
  //   else if (window.clipboardData && window.clipboardData.getData) {
  //     if (!onPasteStripFormattingIEPaste) {
  //       onPasteStripFormattingIEPaste = true
  //       (this.$refs.editorRef as QEditor).editorRef.value.runCmd('ms-pasteTextOnly', text)
  //     }
  //     onPasteStripFormattingIEPaste = false
  //   }
  // }

  async getPreview() {
    this.showLoading = true;
    this.content = await this.getBillDocumentPreview({
      entityTemplate: this.selectedTemplate,
      idAccounting: this.accoutings.length > 0 ? this.accoutings[0].id : 0,
      templateHTML: this.template.body,
      templateStyle: this.template.styleTemplate.body
    });
    this.showLoading = false;
    this.showPreview = true;
  }

  @Watch('selectedTemplate')
  async getTemplateBySelection() {
    this.template = await this.loadTemplate(this.selectedTemplate);
  }

  async mounted() {
    await this.loadData(false);
    await this.getTemplateBySelection();
  }
}
