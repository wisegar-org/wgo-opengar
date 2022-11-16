import { DataSource } from "typeorm";
import { ctx } from "../../handlers/AppContextHandler";
import { TemplateModel } from "../../wgo-base/template/models/TemplateModel";

export const agvTemplateSeeder = async (dataSource: DataSource) => {
  const templateService = new TemplateModel({ ...ctx, dataSource });

  let templateEntity = await templateService.getTemplateByType(
    "AGV_TEMPLATE_DATA_NEWSLETTER_INSOSPESO"
  );
  if (!templateEntity) {
    await templateService.saveTamplate({
      id: 0,
      title: "AGV_TEMPLATE_DATA_NEWSLETTER_INSOSPESO",
      body: '<p><span style="color:hsl(0,0%,0%);">Ciao</span></p><p><span style="color:hsl(0,0%,0%);">Se vuoi attivare gli abbonamenti al nostro </span><a href="{{url}}">sito</a><span style="color:hsl(0,0%,0%);"> per ricevere le notifiche di nuovi eventi e corsi offerti, clicca </span><a href="{{linkDiConferma}}">qui</a><span style="color:hsl(0,0%,0%);">!</span></p><p><span style="color:hsl(0,0%,0%);">Saluti</span></p>',
      documentType: "AGV_TEMPLATE_DATA_NEWSLETTER_INSOSPESO",
    });
  }

  templateEntity = await templateService.getTemplateByType(
    "AGV_TEMPLATE_DATA_NEWSLETTER_CONFERMATO"
  );
  if (!templateEntity) {
    await templateService.saveTamplate({
      id: 0,
      title: "AGV_TEMPLATE_DATA_NEWSLETTER_CONFERMATO",
      body: '<p><span style="color:hsl(0,0%,0%);">Ciao</span></p><p><span style="color:hsl(0,0%,0%);">La tua iscrizione al nostro</span> <a href="{{url}}">sito</a> <span style="color:hsl(0,0%,0%);">è stata attivata. Per modificare il tuo stato, clicca</span> <a href="{{linkDiConferma}}">qui</a><span style="color:hsl(0,0%,0%);">!</span></p><p><span style="color:hsl(0,0%,0%);">Saluti</span></p>',
      documentType: "AGV_TEMPLATE_DATA_NEWSLETTER_CONFERMATO",
    });
  }

  templateEntity = await templateService.getTemplateByType(
    "AGV_TEMPLATE_DATA_NEWSLETTER_ANNULLATO"
  );
  if (!templateEntity) {
    await templateService.saveTamplate({
      id: 0,
      title: "AGV_TEMPLATE_DATA_NEWSLETTER_ANNULLATO",
      body: '<p><span style="color:hsl(0,0%,0%);">Ciao</span></p><p><span style="color:hsl(0,0%,0%);">La tua iscrizione al nostro </span><a href="{{url}}">sito</a><span style="color:hsl(0,0%,0%);"> è stata disattivata. Per modificare il tuo stato, clicca </span><a href="{{linkDiConferma}}">qui</a><span style="color:hsl(0,0%,0%);">!</span></p><p><span style="color:hsl(0,0%,0%);">Saluti</span></p>',
      documentType: "AGV_TEMPLATE_DATA_NEWSLETTER_ANNULLATO",
    });
  }

  templateEntity = await templateService.getTemplateByType(
    "AGV_TEMPLATE_DATA_INSCRIPTION"
  );
  if (!templateEntity) {
    await templateService.saveTamplate({
      id: 0,
      title: "AGV_TEMPLATE_DATA_INSCRIPTION",
      body: '<p>Ciao</p><p>&nbsp;</p><p><span style="color:hsl(0,0%,0%);">Nome: {{utente.nome}} {{utente.cognome}}</span></p><p><span style="color:hsl(0,0%,0%);">Indirizzo email: {{utente.email}}</span></p><p><span style="color:hsl(0,0%,0%);">Telefono: {{utente.telefono}}</span></p><p><span style="color:hsl(0,0%,0%);">{{utente.messaggio}}</span></p><p>&nbsp;</p><p><span style="color:hsl(0,0%,0%);">{{evento.tipo}}: {{evento.titolo}}</span></p><p><span style="color:hsl(0,0%,0%);">{{evento.descrizione}}</span></p><p>&nbsp;</p><p><span style="color:hsl(0,0%,0%);">Saluti</span></p>',
      documentType: "AGV_TEMPLATE_DATA_INSCRIPTION",
    });
  }

  templateEntity = await templateService.getTemplateByType(
    "AGV_TEMPLATE_DATA_INSCRIPTIONREPT"
  );
  if (!templateEntity) {
    await templateService.saveTamplate({
      id: 0,
      title: "AGV_TEMPLATE_DATA_INSCRIPTIONREPT",
      body: '<p><span style="color:hsl(0, 0%, 0%);">Ciao</span></p><p><span style="color:hsl(0, 0%, 0%);">La registrazione esiste già</span></p><p>&nbsp;</p><p><span style="color:hsl(0, 0%, 0%);">Nome: {{utente.nome}} {{utente.cognome}}</span></p><p><span style="color:hsl(0, 0%, 0%);">Indirizzo email: {{utente.email}}</span></p><p><span style="color:hsl(0, 0%, 0%);">Telefono: {{utente.telefono}}</span></p><p><span style="color:hsl(0, 0%, 0%);">{{utente.messaggio}}</span></p><p>&nbsp;</p><p><span style="color:hsl(0, 0%, 0%);">{{evento.tipo}}: {{evento.titolo}}</span></p><p><span style="color:hsl(0, 0%, 0%);">{{evento.descrizione}}</span></p><p>&nbsp;</p><p><span style="color:hsl(0,0%,0%);">Saluti</span></p><p>&nbsp;</p><p>&nbsp;</p>',
      documentType: "AGV_TEMPLATE_DATA_INSCRIPTIONREPT",
    });
  }

  templateEntity = await templateService.getTemplateByType(
    "AGV_TEMPLATE_DATA_EMAILCOMITATO"
  );
  if (!templateEntity) {
    await templateService.saveTamplate({
      id: 0,
      title: "AGV_TEMPLATE_DATA_EMAILCOMITATO",
      body: '<p>Ciao</p><p>&nbsp;</p><p><span style="color:hsl(0,0%,0%);">Nome: </span>{{nome}} {{cognome}}</p><p><span style="color:hsl(0,0%,0%);">Indirizzo email: </span>{{email}}</p><p><span style="color:hsl(0,0%,0%);">Telefono: </span>{{telefono}}</p><p>{{messaggio}}</p><p>&nbsp;</p><p><span style="color:hsl(0,0%,0%);">Saluti</span></p>',
      documentType: "AGV_TEMPLATE_DATA_EMAILCOMITATO",
    });
  }

  templateEntity = await templateService.getTemplateByType(
    "AGV_TEMPLATE_DATA_EMAILCONTACT"
  );
  if (!templateEntity) {
    await templateService.saveTamplate({
      id: 0,
      title: "AGV_TEMPLATE_DATA_EMAILCONTACT",
      body: '<p>Ciao</p><p>&nbsp;</p><p><span style="color:hsl(0,0%,0%);">Indirizzo email: </span>{{email}}</p><p><span style="color:hsl(0,0%,0%);">Telefono: </span>{{telefono}}</p><p>{{messaggio}}</p><p>&nbsp;</p><p><span style="color:hsl(0,0%,0%);">Saluti</span></p>',
      documentType: "AGV_TEMPLATE_DATA_EMAILCONTACT",
    });
  }

  templateEntity = await templateService.getTemplateByType(
    "AGV_TEMPLATE_DATA_EMAILPOLL"
  );
  if (!templateEntity) {
    await templateService.saveTamplate({
      id: 0,
      title: "AGV_TEMPLATE_DATA_EMAILPOLL",
      body: '<p>Assemblea Genitori di Vezia</p><p>c/o Scuole Elementari Vezia – Casella Postale - 6943 Vezia</p><p><a href="mailto:assembleagenitorivezia@gmail.com">assembleagenitorivezia@gmail.com</a></p><p>&nbsp;</p><p>Cari genitori,<br><br>vi ringraziamo per aver compilato il formulario sottostante per l’anno 2021-2022.</p><p>&nbsp;</p><p>Informazioni bambino:</p><p>Nome e Cognome dell’allievo: {{bambino.nome}}</p><p>Classe frequentata: {{bambino.classe}}</p><p>Fotografie *: {{bambino.fotografie}}</p><p>* verranno scattate delle fotografie di gruppo durante le manifestazioni da pubblicare, senza nominativi, nel nostro sito internet (vedi San Nicolao, Carnevale, …)</p><p>&nbsp;</p><p>Allergie: {{bambino.allergie}}</p><p>A quale alimento: {{bambino.allergieAlimento}}</p><p>Intolleranze alimentari: {{bambino.intolleranze}}</p><p>A quale alimento: {{bambino.intolleranzeAlimento}}</p><p>&nbsp;</p><p>Informazioni genitore:</p><p>Nome e Cognome dei genitori: {{genitore.nome}}</p><p>Indirizzo e-mail: {{genitore.email}}</p><p>No. di cellulare: {{genitore.cellulare}}</p><p>Sono a disposizione per aiutare durante le manifestazioni: {{genitore.disposizione}}</p><p>Sono interessato a far parte del Comitato: {{genitore.interessato}}<br><br>&nbsp;</p><p>Un caro saluto,<br><br>Il Comitato Genitori Vezia</p>',
      documentType: "AGV_TEMPLATE_DATA_EMAILPOLL",
    });
  }
};