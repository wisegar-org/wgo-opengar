<template>
  <div>
    <div class="row q-pa-sm">
      <div class="col-12 col-sm-6">
        <q-input
          v-model="editProps.userName"
          square
          outlined
          class="q-ma-sm"
          :autofocus="true"
          :label="translationContent.WGO_USERS_COLUMN_USERNAME_LABEL + ' *'"
          dense
          :rules="[
            val => !!val || translationContent.WGO_USERS_ERROR_FIELD_REQUIERED
          ]"
        />
      </div>
      <div class="col-12 col-sm-6">
        <q-input
          v-model="editProps.email"
          square
          outlined
          class="q-ma-sm"
          :autofocus="true"
          :label="translationContent.WGO_USERS_COLUMN_EMAIL_LABEL + ' *'"
          dense
          type="email"
          :error="emailError"
          :rules="[
            val => !!val || translationContent.WGO_USERS_ERROR_FIELD_REQUIERED,
            isValidEmail
          ]"
        />
      </div>
      <div class="col-12 col-sm-6">
        <q-input
          v-model="editProps.name"
          square
          outlined
          class="q-ma-sm"
          :autofocus="true"
          :label="translationContent.WGO_USERS_COLUMN_NAME_LABEL + ' *'"
          dense
          :rules="[
            val => !!val || translationContent.WGO_USERS_ERROR_FIELD_REQUIERED
          ]"
        />
      </div>
      <div class="col-12 col-sm-6">
        <q-input
          v-model="editProps.lastName"
          square
          outlined
          class="q-ma-sm"
          :autofocus="true"
          :label="translationContent.WGO_USERS_COLUMN_LASTNAME_LABEL + ' *'"
          :rules="[
            val => !!val || translationContent.WGO_USERS_ERROR_FIELD_REQUIERED
          ]"
          dense
        />
      </div>
      <div class="col-12 col-sm-6">
        <q-input
          v-model="editProps.password"
          square
          outlined
          class="q-ma-sm"
          :autofocus="true"
          :label="translationContent.WGO_USERS_PASSWORD_LABEL + ' *'"
          dense
          :rules="[
            val => !!val || translationContent.WGO_USERS_ERROR_FIELD_REQUIERED,
            isSecurePassword
          ]"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div class="col-12 col-sm-6">
        <q-input
          v-model="confirmPassword"
          square
          outlined
          class="q-ma-sm"
          :autofocus="true"
          :label="translationContent.WGO_USERS_CONFIRMPASSWORD_LABEL + ' *'"
          dense
          :rules="[
            val => !!val || translationContent.WGO_USERS_ERROR_CONFIRM_PASSWORD,
            val =>
              val == editProps.password ||
              translationContent.WGO_USERS_ERROR_PASSWORD_NOT_MATCH
          ]"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div class="col-12 col-sm-6 q-px-sm">
        <q-select
          v-model="editProps.roles"
          multiple
          :label="translationContent.WGO_USERS_COLUMN_ROLES_LABEL + ' *'"
          class="q-ma-sm"
          :options="rolesList"
          option-value="id"
          option-label="name"
        />
      </div>
      <div class="col-12 col-sm-6">
        <q-toggle
          v-model="editProps.isEmailConfirmed"
          :label="translationContent.WGO_USERS_COLUMN_ISEMAILCONFIRMED_LABEL"
          class="q-ma-sm col-md-6"
        />
      </div>
    </div>
    <q-card-section class="justify-around text-primary row q-py-none">
      <q-btn
        unelevated
        @click="() => close()"
        color="primary"
        class="col-12 col-sm-auto q-mt-sm"
        :label="translationContent.WGO_CLOSE_BTN"
      />
      <q-btn
        unelevated
        @click="() => submitUser()"
        color="primary"
        :disable="!isValid()"
        class="col-12 col-sm-auto q-mt-sm"
        :label="translationContent.WGO_SAVE_BTN"
      />
    </q-card-section>
  </div>
</template>

<script lang="ts" src="./UserUpdateComponent.ts" />
