<template>
  <div
    v-if="!!accounting && !!organization"
    class="row"
    style="width: 100% !important"
    id="print-pdf-accounting"
  >
    <div
      class="col"
      style="
        width: 100% !important;
        page-break-inside: auto;
        page-break-after: always;
        margin: 25mm 25mm 25mm 25mm;
      "
    >
      <h4 style="margin-top: unset; margin-bottom: 0.3rem; text-align: center">
        Resumen de pago
      </h4>
      <h3 style="margin-top: unset; margin-bottom: 0.3rem">
        {{ organization.name }}
      </h3>
      <h4 style="margin-top: unset; margin-bottom: 0.3rem">
        {{ organization.description }}
      </h4>
      <p style="margin-top: unset; margin-bottom: 0.3rem">
        {{ organization.address }}
      </p>
      <p style="margin-top: unset; margin-bottom: 0.3rem">
        Tel. {{ organization.phone }}
      </p>
      <p style="margin-top: unset; margin-bottom: 0.3rem">
        E-mail: {{ organization.email }}
      </p>
      <br /><br />
      <div class="row" style="width: 100%">
        <div class="col" style="width: 100%">
          <p>Pago</p>
          <p style="margin-top: unset; margin-bottom: 0.3rem">
            No. {{ accounting.payment_code }}
          </p>
          <p style="margin-top: unset; margin-bottom: 0.3rem">
            Data: {{ getFormatDate(accounting.date.toString()) }}
          </p>
          <p style="margin-top: unset; margin-bottom: 0.3rem">
            Pagamento: {{ accounting.payment_comment }}
          </p>
        </div>
        <div class="col" style="width: 100%">
          <p>A</p>
          <p style="margin-top: unset; margin-bottom: 0.3rem">
            {{ accounting.contributor.name }}
          </p>
          <p style="margin-top: unset; margin-bottom: 0.3rem">
            Address: {{ accounting.contributor.address }}
          </p>
          <p style="margin-top: unset; margin-bottom: 0.3rem">
            E-mail: {{ accounting.contributor.email }}
          </p>
        </div>
      </div>
      <br /><br />

      <div style="width: 100%">
        <table
          style="
            width: 100%;
            text-align: center;
            border-top: 2px solid black;
            border-bottom: 2px solid black;
            page-break-inside: auto;
          "
        >
          <colgroup>
            <col width="auto" />
            <col width="auto" />
            <col width="auto" />
            <col width="auto" />
            <col width="45%" />
            <col width="auto" />
          </colgroup>
          <thead class="" style="border-bottom: 2px solid black; width: 100%">
            <tr style="border-bottom: 2px solid black">
              <th>Fecha</th>
              <th>Unidad</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Información</th>
              <th>Sub Total</th>
            </tr>
          </thead>

          <tbody style="width: 100%">
            <tr
              v-for="(iss, index) in issues"
              :key="index"
              style="page-break-inside: avoid; page-break-after: auto"
            >
              <td class="">{{ getFormatDate(accounting.date.toString()) }}</td>
              <td class="">{{ organization.accountingUnit }}</td>
              <td class="">{{ iss.hours }}</td>
              <td class="">
                {{ accounting.pay_by_hours }} {{ organization.accountingCoin }}
              </td>
              <td class="">{{ iss.number }} - {{ iss.title }}</td>
              <td class="">
                {{ (iss.hours || 0) * accounting.pay_by_hours }}
                {{ organization.accountingCoin }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="row" style="width: 100%, justify-content: space-betwen">
          <div class="col">
            <p style="margin-top: unset; margin-bottom: 0.5rem">
              Información del banco
            </p>
            <p style="margin-top: unset; margin-bottom: 0.5rem">
              IBAN: {{ accounting.contributor.card_number }}
            </p>
            <p style="margin-top: unset; margin-bottom: 0.5rem">
              A FAVOR DE:
              {{ (accounting.contributor.name || '').toUpperCase() }}
            </p>
            <p style="margin-top: unset; margin-bottom: 0.5rem">
              DIRECCION: {{ accounting.contributor.address }}
            </p>
          </div>
          <div class="col">
            <p style="margin-top: unset; margin-bottom: 0.5rem">No. Horas</p>
            <p style="margin-top: unset; margin-bottom: 0.5rem">
              {{ accounting.total_hours }} {{ organization.accountingUnit }}
            </p>
            <p style="margin-top: unset; margin-bottom: 0.5rem">Internet</p>
            <p style="margin-top: unset; margin-bottom: 0.5rem">
              {{ ((accounting.total_hours || 0) * 60) / 1024 }}
            </p>
          </div>
          <div class="col">
            <p style="margin-top: unset; margin-bottom: 0.5rem">
              Sub Total: {{ total_issues }}
              {{ organization.accountingCoin }}
            </p>
            <p style="margin-top: unset; margin-bottom: 0.5rem">
              Internet: {{ total_internet }}
              {{ organization.accountingCoin }}
            </p>
            <p style="margin-top: unset; margin-bottom: 0.5rem">
              Impuestos: {{ taxes }} {{ organization.accountingCoin }}
            </p>
            <p style="margin-top: unset; margin-bottom: 0.5rem">
              A pagar: {{ total - taxes }} {{ organization.accountingCoin }}
            </p>
          </div>
        </div>
        <div
          style="width: 100%; border-top: 2px solid black; position: relative"
        >
          <p style="margin-top: unset; margin-bottom: 0.5rem">Observaciones:</p>
          <div v-html="accounting.details" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  AccountRecord,
  IssuesRecord,
  OptionFilter,
  OrganizationDataRecord,
} from '@wisegar-org/wgo-base-models/build/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import moment from 'moment';
import { Action, Getter } from 'vuex-class';
import { githubActions, githubGetters, githubNamespace } from '../../../store';
import SimpleViewIssues from '../../Issues/SimpleViewIssues/SimpleViewIssues.vue';
import VisorEditor from '../../VisorEditor.vue';

@Component({
  components: {
    SimpleViewIssues,
    VisorEditor,
  },
})
export default class AccountingPrint extends Vue {
  @Prop() accounting!: AccountRecord;
  @Action(githubActions.getIssuessByAccount, { namespace: githubNamespace })
  loadIssues!: (id: number) => Promise<IssuesRecord[]>;
  issues: IssuesRecord[] = [];
  @Getter(githubGetters.getOrganizationData, { namespace: githubNamespace })
  organization!: OrganizationDataRecord;

  total_hours = this.accounting?.total_hours || 0;
  total_issues = this.total_hours * (this.accounting?.pay_by_hours || 0);
  total_internet = this.accounting
    ? this.total_hours *
      // (this.accounting.pay_to_internet || 0) *
      (this.accounting.internet_cost || 0)
    : 0;
  taxes = this.accounting?.taxes || 0;
  total = this.total_issues + this.total_internet;

  getReposAccounting() {
    return this.accounting.repos
      ? this.accounting.repos
          .map((record: OptionFilter) => record.title)
          .join(', ')
      : '';
  }

  getFormatDate(date: string) {
    return moment(date).format('YYYY-MM-DD');
  }

  async mounted() {
    if (this.accounting && this.accounting.id)
      this.issues = await this.loadIssues(this.accounting.id);
  }
}
</script>
<style scoped>
/* Inhaltsbreite setzen, Floats und Margins aufheben */
/* Achtung: Die Klassen und IDs variieren von Theme zu Theme. Hier also eigene Klassen setzen */
#content,
#page {
  width: 100%;
  margin: 0;
  float: none;
}

/** Seitenränder einstellen */
@page {
  margin: 2cm;
}

/* Font auf 16px/13pt setzen, Background auf Weiß und Schrift auf Schwarz setzen.*/
/* Das spart Tinte */
body {
  font: 13pt Georgia, 'Times New Roman', Times, serif;
  line-height: 1.3;
  background: #fff !important;
  color: #000;
}

h1 {
  font-size: 24pt;
}

h2,
h3,
h4 {
  font-size: 14pt;
  margin-top: 25px;
}

/* Alle Seitenumbrüche definieren */
a {
  page-break-inside: avoid;
}
blockquote {
  page-break-inside: avoid;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  page-break-after: avoid;
  page-break-inside: avoid;
}
img {
  page-break-inside: avoid;
  page-break-after: avoid;
}
table,
pre {
  page-break-inside: avoid;
}
ul,
ol,
dl {
  page-break-before: avoid;
}

/* Linkfarbe und Linkverhalten darstellen */
a:link,
a:visited,
a {
  background: transparent;
  color: #520;
  font-weight: bold;
  text-decoration: underline;
  text-align: left;
}

a {
  page-break-inside: avoid;
}

a[href^='http']:after {
  content: ' <' attr(href) '> ';
}

a:after > img {
  content: '';
}

article a[href^='#']:after {
  content: '';
}

a:not(:local-link):after {
  content: ' <' attr(href) '> ';
}

/**
 * Eingebundene Videos verschwinden lassen und den Whitespace der iframes auf null reduzieren.
 */
.entry iframe,
ins {
  display: none;
  width: 0 !important;
  height: 0 !important;
  overflow: hidden !important;
  line-height: 0pt !important;
  white-space: nowrap;
}
.embed-youtube,
.embed-responsive {
  position: absolute;
  height: 0;
  overflow: hidden;
}

/* Unnötige Elemente ausblenden für den Druck */

#header-widgets,
nav,
aside.mashsb-container,
.sidebar,
.mashshare-top,
.mashshare-bottom,
.content-ads,
.make-comment,
.author-bio,
.heading,
.related-posts,
#decomments-form-add-comment,
#breadcrumbs,
#footer,
.post-byline,
.meta-single,
.site-title img,
.post-tags,
.readability {
  display: none;
}

/* Benutzerdefinierte Nachrichten vor und nach dem Inhalt einfügen */
.entry:after {
  content: '\ Alle Rechte vorbehalten. (c) 2014 - 2016 TechBrain - techbrain.de';
  color: #999 !important;
  font-size: 1em;
  padding-top: 30px;
}
#header:before {
  content: '\ Vielen herzlichen Dank für das Ausdrucken unseres Artikels. Wir hoffen, dass auch andere Artikel von uns Ihr Interesse wecken können.';
  color: #777 !important;
  font-size: 1em;
  padding-top: 30px;
  text-align: center !important;
}

/* Wichtige Elemente definieren */
p,
address,
li,
dt,
dd,
blockquote {
  font-size: 100%;
}

/* Zeichensatz fuer Code Beispiele */
code,
pre {
  font-family: 'Courier New', Courier, mono;
}

ul,
ol {
  list-style: square;
  margin-left: 18pt;
  margin-bottom: 20pt;
}

li {
  line-height: 1.6em;
}

.printModal {
  font-family: sans-serif;
  display: flex;
  text-align: center;
  font-weight: 300;
  font-size: 30px;
  left: 0;
  top: 0;
  position: absolute;
  color: 'primary';
  width: 100%;
  height: 100%;
  background-color: 'bg-color';
}

/*
|--------------------------------------------------------------------------
| Close Button
|--------------------------------------------------------------------------
*/
.printClose {
  position: absolute;
  right: 10px;
  top: 10px;
}

.printClose:before {
  content: '\00D7';
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 100;
  line-height: 1px;
  padding-top: 0.3em;
  display: block;
  font-size: 2em;
  text-indent: 1px;
  overflow: hidden;
  height: 1.25em;
  width: 1.25em;
  text-align: center;
  cursor: pointer;
}
</style>
