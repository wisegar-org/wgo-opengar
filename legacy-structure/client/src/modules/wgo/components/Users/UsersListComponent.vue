<template>
  <div style="width: 100%">
    <q-card v-if="!loading" flat bordered class="bg-grey-1">
      <q-card-section>
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis">
              {{ translationContent.WGO_USERS_TITLE }}
            </div>
          </div>
          <div class="flex q-pb-sm justify-end col-12 col-sm-auto row">
            <q-btn
              unelevated
              color="primary"
              icon="person"
              :label="translationContent.WGO_USERS_CREATE_USER_LABEL"
              @click="() => updateUser(null)"
              class="col-12 col-sm-auto q-ml-sm q-mb-sm"
              no-caps
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div v-if="!!usersListFinal">
          <q-card-section v-if="usersListFinal.length > 0" class="q-pa-none">
            <div class="q-pa-none" style="width: 100%">
              <q-list v-if="usersListFinal.length">
                <template v-for="(prop, index) in usersListFinal">
                  <UserExpanded
                    :key="`${prop.userName}${index}`"
                    :userModel="prop"
                  >
                    <template>
                      <q-btn
                        flat
                        dense
                        unelevated
                        class="q-ml-sm"
                        color="primary"
                        icon="edit"
                        @click="() => updateUser(prop)"
                      />
                      <q-btn
                        dense
                        flat
                        unelevated
                        class="q-ml-sm"
                        color="negative"
                        icon="delete"
                        @click="() => confirmDeleteUser(prop)"
                      />
                      <br />
                    </template>
                  </UserExpanded>
                </template>
              </q-list>
              <div class="q-pa-lg flex flex-center">
                <q-pagination
                  v-if="usersListFinal.length"
                  v-model="currentPage"
                  :max="maxPage"
                  input
                  icon-first="skip_previous"
                  icon-last="skip_next"
                  icon-prev="fast_rewind"
                  icon-next="fast_forward"
                />
              </div>
            </div>
          </q-card-section>

          <UserUpdateDialog
            :showModal="showUpdateModal"
            :close="() => (showUpdateModal = false)"
            :userModel="userSelected"
          />

          <Loader :loading="innerLoading" />

          <ConfirmDialog
            icon="delete"
            :showModal="confirm"
            :cancelButton="translationContent.WGO_CLOSE_BTN"
            :okButton="translationContent.WGO_DELETE_BTN"
            :text="translationContent.WGO_USERS_DELETE_USER_MESSAGE"
            :onConfirm="() => deleteUser()"
            :onClose="() => (confirm = false)"
          />
        </div>
      </q-card-section>
    </q-card>

    <Loader :loading="loading" />
  </div>
</template>

<script lang="ts" src="./UserListComponent.ts" />
