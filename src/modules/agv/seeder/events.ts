export interface IItemEvent {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  class: string;
  type: string;
  startDate: string;
  endDate: string;
  visible: boolean;
  enrollment: boolean;
  state: string;
}

export const EventsList = [
  {
    id: 1,
    imgTitle: 'images/card-road.jpg',
    title: 'Regolamento Doposcuola - Corsi',
    shortDescription:
      'Anche per i doposcuola organizzati dal Comitato Genitori restano  in vigore le regole del nostro Istituto Scolastico...',
    description:
      'Anche per i doposcuola organizzati dal Comitato Genitori restano in vigore le regole del nostro Istituto Scolastico. <br/>Vi raccomandiamo di prestare la massima attenzione all’attuale situazione COVID-19 e, anche in questi appuntamenti, vi rimandiamo alle norme di comportamento emanate dall’Istituto Scolastico. Grazie per la collaborazione. <br/>Doposcuola in aula: I bambini verranno accolti da un membro di comitato, a partire dalle 16.15, nell’atrio principale della Scuola Elementare. Il rientro a casa, al termine del corso, deve essere organizzato dalle famiglie stesse/è a carico delle famiglie. <br/>Doposcuola in palestra: I bambini verranno accolti da un membro di comitato, a partire dalle 16.15, nell’atrio di fianco alla palestra (dove si trova la Bibliocabina). Il rientro a casa, al termine del corso, deve essere organizzato dalle famiglie stesse/è a carico delle famiglie.',
    class: '2020-2021',
    type: 'Corso',
    startDate: '1/1/2020',
    visible: true,
    state: 'In sospeso',
    enrollment: true,
    endDate: '31/12/2021',
    imgList: [
      {
        id: 1,
        url: 'images/carrousel-road.jpg',
      },
      {
        id: 2,
        url: 'images/carrousel-mom.jpg',
      },
      {
        id: 3,
        url: 'images/carrousel1.jpeg',
      },
    ],
  },
  {
    id: 2,
    imgTitle: 'images/papa6.jpeg',
    title: 'Festa del papà 2020-2021',
    shortDescription:
      'Sorprendiamo i papà preparando un bel grembiule personalizzandolo come meglio volete: con stampini, pennarelli...',
    description:
      'Sorprendiamo i papà preparando un bel grembiule personalizzandolo come meglio volete: con stampini, pennarelli, pittura,… Ogni opera sarà unica! <br/><h5>Orario – Date</h5> Orario: dalle 16.15 alle 18.00 – Ritrovo nell’atrio principale della Scuola Elementare. <br/>Date: <br/>Classe 1. – <br/>Classe 2. – <br/>Classe 3. – <br/>Classe 4. – <br/>Classe 5. –',
    class: '2020-2021',
    type: 'Corso',
    startDate: '1/1/2021',
    visible: true,
    state: 'In sospeso',
    enrollment: true,
    endDate: '31/12/2021',
    imgList: [
      {
        id: 1,
        url: 'images/papa1.jpeg',
      },
      {
        id: 2,
        url: 'images/papa2.jpeg',
      },
      {
        id: 3,
        url: 'images/papa3.jpeg',
      },
      {
        id: 4,
        url: 'images/papa4.jpeg',
      },
      {
        id: 5,
        url: 'images/papa5.jpeg',
      },
      {
        id: 6,
        url: 'images/papa7.jpeg',
      },
      {
        id: 7,
        url: 'images/papa8.jpeg',
      },
    ],
  },
  {
    id: 3,
    imgTitle: 'images/mama4.jpeg',
    title: 'Festa della mamma 2020-2021',
    shortDescription:
      'Un regalo utile per questo giorno speciale. Date libero sfogo alla fantasia per decorare questa piccola sorpresa!',
    description:
      'Per la festa della mamma abbiamo realizzato una pochette, decorata con diverse tecniche di pittura per la stoffa, quali pennarelli e pitture utilizzate liberamente dai bambini. Il tutto decorato con un pon pon creato sempre dai bambini.',
    class: '2020-2021',
    type: 'Corso',
    startDate: '09/05/2021',
    visible: true,
    state: 'Confermato',
    enrollment: false,
    endDate: '09/05/2021',
    imgList: [
      {
        id: 1,
        url: 'images/mama0.jpeg',
      },
      {
        id: 2,
        url: 'images/mama1.jpeg',
      },
      {
        id: 3,
        url: 'images/mama2.jpeg',
      },
      {
        id: 4,
        url: 'images/mama3.jpeg',
      },
      {
        id: 5,
        url: 'images/mama5.jpeg',
      },
    ],
  },
  {
    id: 4,
    imgTitle: 'images/san-nicolao-2021-2022.jpg',
    title: 'San Nicolao 2020-2021',
    shortDescription:
      'Per la gioia di tutti i bimbi della Scuola dell’Infanzia  e della Scuola Elementare è venuto a trovarci...',
    description:
      'Per la gioia di tutti i bimbi della Scuola dell’Infanzia e della Scuola Elementare è venuto a trovarci San Nicolao con il suo aiutante e due teneri accompagnatori, davvero una belle e magica sorpresa per tutti. <br/>Grazie San Nicolao!',
    class: '2020-2021',
    type: 'Evento',
    startDate: '06/12/2020',
    visible: true,
    state: 'In sospeso',
    enrollment: false,
    endDate: '06/12/2020',
    imgList: [
      {
        id: 1,
        url: 'images/carrousel-Ndr2020.png',
      },
      {
        id: 2,
        url: 'images/carrousel1.jpeg',
      },
      {
        id: 3,
        url: 'images/carrousel2.png',
      },
    ],
  },
  {
    id: 5,
    imgTitle: 'images/card-Ndr2020.png',
    title: 'Notte del Racconto 2020-2021',
    shortDescription:
      'Durante questo periodo così delicato, per noi è stata  una sfida completamente nuova organizzare un appuntamento...',
    description:
      'Durante questo periodo così delicato, per noi è stata una sfida completamente nuova organizzare un appuntamento tanto importante per grandi e bambini. <br/>Dopo vari cambi di programma, la “Notte del Racconto” di questo particolare venerdì si è trasformata nel “Pomeriggio del Racconto” per la felicità dei bambini della Scuola dell’Infanzia e della Scuola Elementare. <br/>Il Comitato desidera ringraziare tutti per l’impegno, il supporto e l’affetto ricevuti. <br/> All’anno prossimo!',
    class: '2020-2021',
    type: 'Evento',
    startDate: '13/11/2020',
    visible: true,
    state: 'In sospeso',
    enrollment: false,
    endDate: '14/11/2020',
    imgList: [],
  },
  {
    id: 6,
    imgTitle: 'images/san-nicolao-2021-2022.jpg',
    title: 'San Nicolao 2021-2022',
    shortDescription: 'San Nicolao',
    description: 'San Nicolao',
    class: '2021-2022',
    type: 'Evento',
    startDate: '13/11/2021',
    visible: true,
    state: 'In sospeso',
    enrollment: true,
    endDate: '14/11/2022',
    imgList: [],
  },
  {
    id: 7,
    imgTitle: 'images/notte_racconto_copertina2.jpg',
    title: 'Notte del racconto 2021-2022',
    shortDescription:
      'Notte del racconto 2021<br/>Il nostro pianeta - la nostra casa / Notre planète-notre maison / Unser Planet-unser Zuhause / Noss planet-noss dachasa',
    description:
      'Notte del racconto 2021<br/>Il nostro pianeta - la nostra casa / Notre planète-notre maison / Unser Planet-unser Zuhause / Noss planet-noss dachasa',
    class: '2021-2022',
    type: 'Evento',
    startDate: '12/11/2021',
    visible: true,
    state: 'In sospeso',
    enrollment: true,
    endDate: '12/11/2021',
    imgList: [],
  },
  {
    id: 8,
    imgTitle: 'images/festa-nonni-2022.jpg',
    title: 'Festa dei nonni 2021-2022',
    shortDescription:
      'Spesso ci dimentichiamo che anche i nonni come mamma e papà hanno una loro festa, perchè non creare un piccolo pensiero anche a loro?<br/>Quando: 2 ottobre 2021<br/>Orario: 16:20-17:30ca<br/>',
    description:
      'Spesso ci dimentichiamo che anche i nonni come mamma e papà hanno una loro festa, perchè non creare un piccolo pensiero anche a loro?<br/>Quando: 2 ottobre 2021 <br/>Orario: 16.20 - 17.30ca <br/>Costo: 2 CHF',
    class: '2021-2022',
    type: 'Corso',
    startDate: '02/10/2021',
    visible: true,
    state: 'In sospeso',
    enrollment: false,
    endDate: '02/10/2021',
    imgList: [],
  },
  {
    id: 9,
    imgTitle: 'images/pasqua_copertina.jpg',
    title: 'Pasqua 2021-2022',
    shortDescription: 'Lavoretto per pasqua<br/>Inizio: Le date verranno aggiornate in seguito<br/>',
    description:
      'Lavoretto per pasqua<br/>Inizio: Le date verranno aggiornate in seguito<br/>Fine: Le date verranno aggiornate in seguito<br/>Orario: -<br/>Costo: -',
    class: '2021-2022',
    type: 'Corso',
    startDate: '01/03/2022',
    visible: true,
    state: 'In sospeso',
    enrollment: false,
    endDate: '01/03/2022',
    imgList: [],
  },
  {
    id: 10,
    imgTitle: 'images/natale-2021-22.jpg',
    title: 'Lavoretto di Natale 2021-2022',
    shortDescription: 'Lavoretto per Natale<br/>Inizio: Le date verranno aggiornate in seguito<br/>',
    description:
      'Lavoretto per Natale<br/>Inizio: Le date verranno aggiornate in seguito<br/>Fine: Le date verranno aggiornate in seguito<br/>Orario: -<br/>Costo: -',
    class: '2021-2022',
    type: 'Corso',
    startDate: '01/12/2021',
    visible: true,
    state: 'In sospeso',
    enrollment: true,
    endDate: '01/12/2021',
    imgList: [],
  },
  {
    id: 11,
    imgTitle: 'images/papa1.jpeg',
    title: 'Festa del papà 2021-2022',
    shortDescription: 'Lavoretto per la festa del papà<br/>Inizio: Le date verranno aggiornate in seguito<br/>',
    description:
      'Lavoretto per la festa del papà<br/>Inizio: Le date verranno aggiornate in seguito<br/>Fine: Le date verranno aggiornate in seguito<br/>Orario: -<br/>Costo: -',
    class: '2021-2022',
    type: 'Corso',
    startDate: '01/03/2022',
    visible: true,
    state: 'In sospeso',
    enrollment: true,
    endDate: '01/03/2022',
    imgList: [],
  },
  {
    id: 12,
    imgTitle: 'images/festa-mamma-2021-22.jpg',
    title: 'Festa della mamma 2021-2022',
    shortDescription: 'Lavoretto per la festa del mamma<br/>Inizio: Le date verranno aggiornate in seguito<br/>',
    description:
      'Lavoretto per la festa del mamma<br/>Inizio: Le date verranno aggiornate in seguito<br/>Fine: Le date verranno aggiornate in seguito<br/>Orario: -<br/>Costo: -',
    class: '2021-2022',
    type: 'Corso',
    startDate: '09/05/2022',
    visible: true,
    state: 'In sospeso',
    enrollment: true,
    endDate: '09/05/2022',
    imgList: [
      {
        id: 1,
        url: 'images/mama0.jpeg',
      },
      {
        id: 2,
        url: 'images/mama1.jpeg',
      },
      {
        id: 3,
        url: 'images/mama2.jpeg',
      },
      {
        id: 4,
        url: 'images/mama3.jpeg',
      },
      {
        id: 5,
        url: 'images/mama5.jpeg',
      },
    ],
  },
  {
    id: 13,
    imgTitle: 'images/fotografia_copertina 2.jpg',
    title: 'Corso di fotografia 2021-2022',
    shortDescription: 'Fotografia<br/>Numero lezioni: 5<br/>Inizio: Aprile data da convenire<br/>',
    description: 'Fotografia<br/>Numero lezioni: 5<br/>Inizio: Aprile data da convenire<br/>Classi: dalla II alla V',
    class: '2021-2022',
    type: 'Corso',
    startDate: '01/04/2022',
    visible: true,
    state: 'In sospeso',
    enrollment: true,
    endDate: '01/04/2022',
    imgList: [],
  },
  {
    id: 14,
    imgTitle: 'images/scacchi-2021-22.jpg',
    title: 'Corso di scacchi avanzati 2021-2022',
    shortDescription: 'Scacchi avanzati',
    description:
      'Scacchi avanzati<br/>Secondo semestre<br/>Numero lezioni: 6<br/>Ogni martedì<br/>Orario: 16:20 - 17:30<br/>Costo: 30 CHF<br/>Classe: dalla 2da alla 5ta',
    class: '2021-2022',
    type: 'Corso',
    startDate: '01/01/2022',
    visible: true,
    state: 'In sospeso',
    enrollment: true,
    endDate: '01/03/2022',
    imgList: [],
  },
  {
    id: 15,
    imgTitle: 'images/scacchi-2021-22.jpg',
    title: 'Corso di scacchi principianti 2021-2022',
    shortDescription:
      'Scacchi principianti : primo semestre Numero lezioni: 6 Tutti i martedì Orario: 16:20 - 17:30 Costo: 30 CHF Classe: dalla 2da alla 5ta',
    description:
      'Scacchi principianti: <br/>primo semestre <br/>Numero lezioni: 6 <br/>Tutti i martedì <br/>Orario: 16:20 - 17:30 <br/>Costo: 30 CHF <br/>Classe: dalla 2da alla 5ta',
    class: '2021-2022',
    type: 'Corso',
    startDate: '01/09/2021',
    visible: true,
    state: 'In sospeso',
    enrollment: true,
    endDate: '01/11/2021',
    imgList: [],
  },
  {
    id: 16,
    imgTitle: 'images/chitarra_copertina 2.jpg',
    title: 'Corso di chitarra 2021-2022',
    shortDescription: 'Chitarra<br/>Inizio anno<br/>Ogni mercoledì',
    description:
      "Chitarra<br/>Inizio anno<br/>Ogni mercoledì<br/>Numero lezioni: 30<br/>Durata: 15 minuti<br/>Maestro: Aldo Steiger<br/>Possibilità di effettuare lezione di prova<br/>Necessario possedere una chitarra ( il maestro può aiutare a trovare delle occasione per l'acquisto)<br/>Classi: dalla 2da alla 5ta",
    class: '2021-2022',
    type: 'Corso',
    startDate: '01/09/2021',
    visible: true,
    state: 'In sospeso',
    enrollment: true,
    endDate: '01/06/2022',
    imgList: [],
  },
  {
    id: 17,
    imgTitle: 'images/cucina-2021-22.jpg',
    title: 'Corso di cucina Cuoca con il mappamondo (SE) 2021-2022',
    shortDescription: 'Corso di cucina Cuoca con il mappamondo per la scuola elementare (SE)',
    description:
      'Corso di cucina Cuoca con il mappamondo<br/>Inizio: 11.01.2022<br/>Fine 08.02.2022<br/>Giorno della settimana: martedì<br/>Orario: 16:15 - 17:30<br/>Numero lezioni: 5<br/>Classi: I-V<br/><br/>Massimo partecipanti: 10<br/>Costo: 20 CHF',
    class: '2021-2022',
    type: 'Corso',
    startDate: '11/01/2022',
    visible: true,
    state: 'In sospeso',
    enrollment: true,
    endDate: '08/02/2022',
    imgList: [],
  },
  {
    id: 18,
    imgTitle: 'images/pittura_copertina2.jpg',
    title: 'Corso di pittura 2021-2022',
    shortDescription: "Varie tecniche di pittura, sperimentazione dell'arte<br/>Ogni martedì",
    description:
      "Varie tecniche di pittura, sperimentazione dell'arte<br/>Ogni martedì<br/>Numero lezioni: 8<br/>Inizio 21.09.2021 fino al 16.10.2021<br/>Classe: dalla 1ma alla 5ta<br/>Orario: 16:15 - 17:45<br/>Massimo partecipanti: 10<br/>Costo: 20 CHF",
    class: '2021-2022',
    type: 'Corso',
    startDate: '21/09/2021',
    visible: true,
    state: 'In sospeso',
    enrollment: true,
    endDate: '16/10/2021',
    imgList: [],
  },
  {
    id: 19,
    imgTitle: 'images/cucina-2021-22.jpg',
    title: 'Corso di cucina Cuoca con il mappamondo (SI) 2021-2022',
    shortDescription: "Corso di cucina Cuoca con il mappamondo per la scuola dell'Infanzia",
    description:
      "Corso di cucina Cuoca con il mappamondo <br/>Scuola dell'Infanzia<br/>Inizio: 28/09/2021<br/>Fine 26/10/2021<br/>Giorno della settimana: martedì<br/>Orario: 15:45 - 16:30<br/>Massimo partecipanti: 10<br/>Costo: 20 CHF",
    class: '2021-2022',
    type: 'Corso',
    startDate: '28/09/2021',
    visible: true,
    state: 'In sospeso',
    enrollment: true,
    endDate: '26/10/2021',
    imgList: [],
  },
  {
    id: 20,
    imgTitle: 'images/capoeira-2021-22.jpg',
    title: 'Corsi di capoeira 2021-2022',
    shortDescription: 'Corso Capoeira<br/>Numero lezioni: 10<br/>',
    description:
      'Corso Capoeira<br/>Numero lezioni: 10<br/>Ogni lunedì dalle 16:15-17:30 presso la nostra palestra<br/>Classi: dalla 1ma alla 5ta',
    class: '2021-2022',
    type: 'Corso',
    startDate: '01/09/2021',
    visible: true,
    state: 'In sospeso',
    enrollment: true,
    endDate: '01/12/2021',
    imgList: [
      {
        id: 1,
        url: 'images/capoeira-2021-22.jpg',
      },
    ],
  },
  {
    id: 21,
    imgTitle: 'images/locandina_tom_Jerry.jpg',
    title: 'Film Tom & Jerry, Migliori nemici, Peggiori amici',
    shortDescription:
      'Il municipio di Vezia ha il piacere di offrire la visione di: <br/> Tom & Jerry, Migliori nemici, Peggiori amici, film di animazione<br/> Quando: venerdi 3 settembre 2021 <br/> Ore: 20:30 <br/> Dove: Piazzale delle scuole di Vezia',
    description:
      'Il municipio di Vezia ha il piacere di offrire la visione di: <br/> Tom & Jerry, Migliori nemici, Peggiori amici<br/> Quando: venerdi 3 settembre 2021 <br/> Ore: 20:30 <br/> Dove: Piazzale delle scuole di Vezia',
    class: '2021-2022',
    type: 'Evento',
    startDate: '03/09/2021',
    visible: true,
    state: 'Confermato',
    enrollment: true,
    endDate: '03/09/2021',
    imgList: [
      {
        id: 1,
        url: 'images/locandina_tom_Jerry.jpg',
      },
    ],
  },
];
