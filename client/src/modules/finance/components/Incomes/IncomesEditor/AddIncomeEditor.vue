<template>
  <div>
    <div class="q-mx-md q-mb-lg q-mt-md">
      <FilterSelect
        label="Client"
        :options="getValidCollaborators()"
        filterProp="login"
        @onChange="value => setCollaborator(value)"
        :value="income.collaborator"
      />
    </div>
    <q-input
      v-if="!!card_number"
      square
      outlined
      class="q-mx-md q-my-lg"
      :value="card_number"
      label="Card number"
      readonly
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="income.name"
      label="Name"
      :autofocus="true"
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="income.description"
      label="Description"
      autogrow
      dense
    />

    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="income.amount"
      type="number"
      label="Amount"
      dense
    />
    <q-input
      dense
      outlined
      v-model="initDate"
      mask="date"
      class="q-mx-md q-my-lg"
      label="Date"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="initDate">
              <div class="row items-center justify-end">
                <q-btn
                  unelevated
                  v-close-popup
                  label="Close"
                  color="primary"
                  flat
                />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <div class="q-mx-md q-my-lg">
      <FilterSelect
        label="Repeat"
        :options="repeatOption"
        filterProp="label"
        :value="repeat"
        @onChange="
          value => {
            setRepeat(value);
          }
        "
      />
    </div>
    <MediaListEditor
      :items="income.invoiceDocs"
      :addItems="
        items => {
          docsToAdd = items;
        }
      "
      title="Invoice documents"
      :changeValue="() => {}"
      :showLoading="showLoading"
    />
    <q-card-section
      class="row items-center justify-center text-primary q-mt-md"
    >
      <q-btn
        unelevated
        color="primary"
        align="center"
        :disable="!isValid()"
        class="col-12 col-sm-auto"
        @click="() => addIncomeClick()"
        :label="isUpdateIncome ? 'Update' : 'Create'"
      />
    </q-card-section>
  </div>
</template>

<script lang="ts">
import { Action, Getter } from 'vuex-class';
import { Dictionary, IncomeRecord } from '../../../models/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { githubActions, githubGetters, githubNamespace } from '../../../store';
import MediaListEditor from '../../../../wgo/components/MediaList/MediaListEditor.vue';
import moment from 'moment';
import { repeatOption } from '../FilterIncomes';
import FilterSelect from '../../FilterSelect.vue';
import { getFrequencyString } from '../../../models/parsers';
import {
  componentsActionsKeys,
  componentsNamespace
} from 'src/modules/wgo/store/ComponentsState';
import { INotify } from 'src/modules/wgo/models';

@Component({
  components: {
    MediaListEditor,
    FilterSelect
  }
})
export default class AddIncomeEditor extends Vue {
  @Prop() close!: () => void;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Prop() incomeToEdit!: IncomeRecord;

  @Action(githubActions.addIncome, { namespace: githubNamespace })
  addIncome!: (record: IncomeRecord) => Promise<boolean>;
  @Action(githubActions.updateIncome, { namespace: githubNamespace })
  updateIncome!: (record: IncomeRecord) => Promise<boolean>;
  @Getter(githubGetters.getCollaborators, { namespace: githubNamespace })
  collaborators!: Dictionary[];
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  income: IncomeRecord;
  isUpdateIncome: boolean;
  initDate: string;
  docsToAdd: number[] = [];
  repeatOption = repeatOption;
  repeat: Dictionary | undefined;
  card_number = '';

  constructor() {
    super();
    this.isUpdateIncome = !!this.incomeToEdit;
    this.initDate = moment(
      this.isUpdateIncome
        ? this.incomeToEdit.date.toString()
        : new Date().toString()
    ).format('YYYY/MM/DD');
    this.income = this.isUpdateIncome
      ? this.incomeToEdit
      : <IncomeRecord>{
          name: '',
          description: '',
          amount: 0,
          repeat: 0
        };
    this.card_number = this.income.collaborator
      ? this.income.collaborator.card_number
      : '';
    this.repeat = {
      label: getFrequencyString(this.income.repeat),
      value: this.income.repeat.toString()
    };
  }

  setCollaborator(collaborator: Dictionary) {
    if (collaborator !== null) {
      this.income.collaborator = collaborator;
      this.card_number = collaborator.card_number;
      this.income.collaboratorId = parseInt(collaborator.id);
    } else {
      this.income.collaboratorId = 0;
      this.card_number = '';
    }
  }

  getValidCollaborators() {
    return this.collaborators; //.filter((collaborator) => !!collaborator.card_number)
  }

  setRepeat(value: Dictionary | undefined) {
    this.repeat = value ? value : undefined;
  }

  isValid() {
    return (
      !!this.income.name &&
      !!this.income.amount &&
      moment(this.initDate, 'YYYY/MM/DD').isValid() &&
      this.repeat !== undefined &&
      !!this.income.collaboratorId
    );
  }

  async addIncomeClick() {
    this.showLoading(true);
    const result = this.isUpdateIncome
      ? await this.updateIncome(<IncomeRecord>{
          id: this.incomeToEdit.id,
          name: this.income.name,
          description: this.income.description,
          amount: this.income.amount,
          repeat: parseInt(this.repeat ? this.repeat.value : '0'),
          date: moment(this.initDate).toDate(),
          invoiceDocs: this.docsToAdd,
          collaboratorId: this.income.collaboratorId
        })
      : await this.addIncome(<IncomeRecord>{
          name: this.income.name,
          description: this.income.description,
          amount: this.income.amount,
          date: moment(this.initDate).toDate(),
          repeat: parseInt(this.repeat ? this.repeat.value : '0'),
          invoiceDocs: this.docsToAdd,
          collaboratorId: this.income.collaboratorId
        });
    this.showLoading(false);
    if (result) {
      this.notify({
        message: `Income ${
          this.isUpdateIncome ? 'updated' : 'created'
        } successfully`,
        type: 'positive'
      });
      if (!!this.close) {
        this.close();
      }
    }
  }
}
</script>
