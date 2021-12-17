<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    :title="getTitle()"
    :close="() => onClose()"
    icon="contacts"
    styleDialog="width: 400px; max-width: 80vw"
  >
    <template slot="content">
      <!-- <q-input
        v-if="!!collaborator && collaborator.isCollaborator"
        square
        outlined
        class="q-mx-md q-my-lg"
        v-model="editProps.login"
        :autofocus="true"
        label="User name"
        dense
        readonly
      /> -->
      <q-input
        square
        outlined
        class="q-mx-md q-my-lg"
        v-model="editProps.name"
        :autofocus="true"
        :label="translationContent.WGO_FINANCE_COLLABORATOR_COLUMN_NAME"
        dense
      />
      <q-input
        v-if="!collaborator || isCollaborator()"
        square
        outlined
        class="q-mx-md q-my-lg"
        v-model="editProps.description"
        autogrow
        :autofocus="true"
        :label="translationContent.WGO_FINANCE_COLLABORATOR_COLUMN_DESCRIPTION"
        dense
      />
      <q-input
        square
        outlined
        class="q-mx-md q-my-lg"
        v-model="editProps.email"
        :label="translationContent.WGO_FINANCE_COLLABORATOR_COLUMN_EMAIL"
        dense
      />
      <q-input
        square
        outlined
        class="q-mx-md q-my-lg"
        v-model="editProps.address"
        :label="translationContent.WGO_FINANCE_COLLABORATOR_COLUMN_ADDRESS"
        dense
      />
      <q-input
        square
        outlined
        class="q-mx-md q-my-lg"
        type="number"
        v-model="editProps.cap"
        :label="translationContent.WGO_FINANCE_COLLABORATOR_COLUMN_CAP"
        dense
      />
      <q-input
        square
        outlined
        class="q-mx-md q-my-lg"
        v-model="editProps.place"
        :label="translationContent.WGO_FINANCE_COLLABORATOR_COLUMN_PLACE"
        dense
      />
      <q-select
        square
        outlined
        dense
        v-model="selectedRoles"
        multiple
        :label="translationContent.WGO_FINANCE_COLLABORATOR_COLUMN_ROLE"
        class="q-mx-md q-my-lg"
        :options="optionsRoles"
        option-value="value"
        option-label="label"
        clearable
      />
      <q-input
        square
        outlined
        class="q-mx-md q-my-lg"
        v-model="editProps.card_number"
        mask="#### - #### - #### - ####"
        dense
        :label="translationContent.WGO_FINANCE_COLLABORATOR_COLUMN_CARD_NUMBER"
        :readonly="!loggedUser || !loggedUser.isSuperAdmin"
      />
      <q-input
        v-if="isCollaborator()"
        square
        outlined
        class="q-mx-md q-my-lg"
        type="number"
        v-model="editProps.pay_by_hours"
        dense
        :label="translationContent.WGO_FINANCE_COLLABORATOR_COLUMN_PAY_BY_HOURS"
        :readonly="!loggedUser || !loggedUser.isSuperAdmin"
      />
    </template>
    <template slot="buttons">
      <q-btn
        unelevated
        @click="() => updateProps()"
        color="primary"
        align="center"
        :disable="!isValid()"
        class="col-12 col-sm-auto"
        :label="translationContent.WGO_APPLY_BTN"
      />
    </template>
  </Dialog>
</template>

<script lang="ts" src="./EditAccountingCollaboratorDialog.ts" />
