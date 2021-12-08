<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" ref="stepper" color="primary" animated>
      <q-step
        :name="1"
        title="Select collaborator"
        caption=""
        icon="people"
        :done="step > 1"
      >
        <SelectCollaboratorStep
          :value="collaboratorValue"
          @change="value => selectCollaborator(value)"
        />
      </q-step>
      <q-step
        :name="2"
        title="Collaborator info"
        caption=""
        icon="person"
        :error="
          step === 2 && (!collaboratorValue || !collaboratorValue.pay_by_hours)
        "
        :done="step > 2"
      >
        <ShowInfoCollaboratorStep :user="collaboratorValue" />
      </q-step>

      <q-step
        :name="3"
        title="Issues to Accounting"
        icon="assignment"
        :done="step > 3"
        :error="
          step === 3 && (issues.length === 0 || accountingValue.hours === 0)
        "
      >
        <ShowIssuesToAccount
          :issues="issues"
          :collaborator="collaboratorValue"
        />
      </q-step>
      <q-step
        :name="4"
        title="Accounting Data"
        icon="assignment"
        :done="step > 4"
        :error="
          step === 4 &&
            (issues.length === 0 ||
              accountingValue.hours === 0 ||
              !organizationData.accountingInternetPrice)
        "
      >
        <SetAccountingDataStep
          :accounting="accountingValue"
          :organizationData="organizationData"
        />
      </q-step>

      <q-step :name="5" title="Create accounting" icon="add_comment">
        <ShowResumeAccount
          :collaborator="collaboratorValue"
          :accounting="accountingValue"
          :countIssues="issues.length"
          :organization="organizationData"
          :total="total"
        />
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation class="row justify-center items-center">
          <q-btn
            unelevated
            @click="nextStep"
            color="primary"
            class="col-12 col-sm-auto"
            :label="step === 5 ? 'Finish' : 'Continue'"
            :disable="!isValidContinue()"
          />
          <q-btn
            unelevated
            v-if="step > 1"
            flat
            color="primary"
            @click="previusStep"
            label="Back"
            class="col-12 col-sm-auto"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>
<script lang="ts" src="./AccountingStepper.ts" />
