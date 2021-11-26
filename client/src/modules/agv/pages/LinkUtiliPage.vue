<template>
  <q-page class="row justify-evenly">
    <div class="col-12 col-md-10 q-pa-md">
      <div class="block-text-card-up block-text-card-down">
        <h4>Indirizzi utili</h4>
        <div class="row">
          <div
            v-for="(addr, key) in address"
            :key="key"
            class="col-md-4 col-sm-6 col-12 q-pa-lg"
          >
            <AddressCard :item="addr" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { IAddressItem } from '../models/Item';
import { Component, Vue } from 'vue-property-decorator';
import AddressCard from '../components/AddressCard/AddressCard.vue';

@Component({
  components: {
    AddressCard
  }
})
export default class LinkUtiliPage extends Vue {
  address: IAddressItem[] = [
    {
      name: 'Municipio di Vezia',
      url: 'http://www.vezia.ch',
      img: 'images/logos/vezia.ch.ico'
    },
    {
      name: 'Conferenza Cantonale Genitori',
      url: 'https://genitorinforma.ch/it/',
      img: 'images/logos/Logo_CCG.png'
    },
    {
      name: 'Pedibus',
      url: 'http://www.pedibus.ch',
      img: 'images/logos/pedibus.png'
    },
    { name: 'ASPI', url: 'http://www.aspi.ch', img: 'images/logos/aspi.png' },
    {
      name: 'Federazione Ticinese Famiglie diurne',
      url: 'http://www.famigliediurne.ch',
      img: 'images/logos/cropped-logo_mammediurne.png'
    },
    {
      name: 'ZURICH precorsovita',
      url: 'https://www.zurichvitaparcours.ch/it',
      img: 'images/logos/zurich_precorso_logo_it.png'
    },
    {
      name: 'Svizzera Mobile',
      url: 'https://www.schweizmobil.ch/it/veloland/veloland.html',
      img: 'images/logos/svizzera_logo_vl.svg'
    },
    {
      name: 'Internet - INFOGIOVANI',
      url:
        'https://www4.ti.ch/generale/infogiovani/salute-e-benessere/nonsolodroghe/internet/',
      img: 'images/logos/ti-ch.png'
    },
    {
      name: 'Infofamiglie',
      url: 'https://www3.ti.ch/DSS/infofamiglie/',
      img: 'images/logos/logo_infofamiglie.gif'
    },
    {
      name: 'Salute Psi',
      url:
        'https://www.santepsy.ch/it/pages/risorse-a-disposizione-dei-futuri-genitori-e-di-genitori-di-bambini-piccoli-1011',
      img: 'images/logos/logo-santepsy_it.png'
    },
    {
      name: 'Forum Genitorialità',
      url: 'https://www.xn--genitorialit-99a.ch/it/',
      img: 'images/logos/logo_fg.jpg'
    },
    {
      name: 'Veloland',
      url: 'https://www.schweizmobil.ch/it/veloland/veloland.html',
      img: 'images/logos/logo-desktop_it2.png'
    },
    {
      name: 'Escursioni in Ticino',
      url: 'https://www.ticino.ch/it/explore/excursions.html',
      img: 'images/logos/ticinoturismo.svg'
    }
  ];
}
</script>

<style scoped>
p,
h5 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

h4 {
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 32;
}

.block-text-card-up {
  padding-top: 3rem;
}

.block-text-card-down {
  padding-bottom: 1rem;
}
</style>
