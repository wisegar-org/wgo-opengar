<template>
  <div>
    <div class="q-mx-md q-mb-lg q-pt-md">
      <FilterSelect
        label="Provider"
        :options="getValidCollaborators()"
        filterProp="login"
        @onChange="(value) => setCollaborator(value)"
        :value="expense.collaborator"
      />
    </div>
    <q-input
      v-if="!!card_number"
      square
      outlined
      class="q-mx-md q-my-lg q-pb-sm"
      :value="card_number"
      label="Card number"
      readonly
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="expense.name"
      label="Name"
      :autofocus="true"
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="expense.description"
      label="Description"
      autogrow
      dense
    />

    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="expense.cost"
      type="number"
      label="Cost"
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
          (value) => {
            setRepeat(value);
          }
        "
      />
    </div>
    <MediaListEditor
      :items="expense.bildDocs"
      :addItems="
        (items) => {
          docsToAdd = items;
        }
      "
      title="Bild documents"
      :changeValue="() => {}"
      :showLoading="showLoading"
    />
    <q-card-section
      class="row items-center justify-center text-primary q-mt-md"
    >
      <q-btn
        unelevated
        color="primary"
        align="around"
        :disable="!isValid()"
        class="col-12 col-sm-auto"
        @click="() => addExpenseClick()"
        :label="isUpdateExpense ? 'Update' : 'Create'"
      />
    </q-card-section>
  </div>
</template>

<script lang="ts">
import { Action, Getter } from 'vuex-class';
import {
  Dictionary,
  ExpenseRecord,
} from '@wisegar-org/wgo-base-models/build/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { githubActions, githubGetters, githubNamespace } from '../../../store';
import MediaListEditor from '../../../../wgo/components/MediaList/MediaListEditor.vue';
import moment from 'moment';
import FilterSelect from '../../FilterSelect.vue';
import { getFrequencyString } from '@wisegar-org/wgo-base-models/build/parsers';
import { repeatOption } from '../FilterExpenses';
import {
  componentsActionsKeys,
  componentsNamespace,
} from '../../../../wgo/store/ComponentsState';
import { INotify } from '../../../../wgo/models';

@Component({
  components: {
    MediaListEditor,
    FilterSelect,
  },
})
export default class EditExpenseEditor extends Vue {
  @Prop() close!: () => void;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Prop() expenseToEdit!: ExpenseRecord;

  @Action(githubActions.addExpense, { namespace: githubNamespace })
  addExpense!: (record: ExpenseRecord) => Promise<boolean>;
  @Action(githubActions.updateExpense, { namespace: githubNamespace })
  updateExpense!: (record: ExpenseRecord) => Promise<boolean>;
  @Getter(githubGetters.getCollaborators, { namespace: githubNamespace })
  collaborators!: Dictionary[];
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  repeatOption = repeatOption;

  expense: ExpenseRecord;
  isUpdateExpense: boolean;
  initDate: string;
  docsToAdd: number[] = [];
  repeat: Dictionary | undefined;
  card_number = '';

  constructor() {
    super();
    this.isUpdateExpense = !!this.expenseToEdit;
    this.initDate = moment(
      this.isUpdateExpense
        ? this.expenseToEdit.date.toString()
        : new Date().toString()
    ).format('YYYY/MM/DD');
    this.expense = this.isUpdateExpense
      ? this.expenseToEdit
      : <ExpenseRecord>{
          name: '',
          description: '',
          cost: 0,
          repeat: 0,
        };
    this.card_number = this.expense.collaborator
      ? this.expense.collaborator.card_number
      : '';
    this.repeat = {
      label: getFrequencyString(this.expense.repeat),
      value: this.expense.repeat.toString(),
    };
  }

  setCollaborator(collaborator: Dictionary) {
    if (collaborator !== null) {
      this.expense.collaborator = collaborator;
      this.card_number = collaborator.card_number;
      this.expense.collaboratorId = parseInt(collaborator.id);
    } else {
      this.expense.collaboratorId = 0;
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
      !!this.expense.name &&
      !!this.expense.cost &&
      moment(this.initDate, 'YYYY/MM/DD').isValid() &&
      this.repeat !== undefined &&
      !!this.expense.collaboratorId
    );
  }

  async addExpenseClick() {
    this.showLoading(true);
    const result = this.isUpdateExpense
      ? await this.updateExpense(<ExpenseRecord>{
          id: this.expenseToEdit.id,
          name: this.expense.name,
          description: this.expense.description,
          cost: this.expense.cost,
          date: moment(this.initDate.toString()).toDate(),
          collaboratorId: this.expense.collaboratorId,
          repeat: parseInt(this.repeat ? this.repeat.value : '0'),
          bildDocs: this.docsToAdd,
        })
      : await this.addExpense(<ExpenseRecord>{
          name: this.expense.name,
          description: this.expense.description,
          cost: this.expense.cost,
          date: moment(this.initDate.toString()).toDate(),
          collaboratorId: this.expense.collaboratorId,
          repeat: parseInt(this.repeat ? this.repeat.value : '0'),
          bildDocs: this.docsToAdd,
        });
    this.showLoading(false);
    if (result) {
      this.notify({
        message: `Expense ${
          this.isUpdateExpense ? 'updated' : 'created'
        } successfully`,
        type: 'positive',
      });
      if (!!this.close) {
        this.close();
      }
    }
  }
}
</script>
