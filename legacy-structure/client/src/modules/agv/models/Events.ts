export const EventClassOption = ['2020-2021', '2021-2022'];

export const EventTypeOptions = ['Evento', 'Corso'];

export const EventStateOptions = ['In sospeso', 'Confermato', 'Annullato'];

export const EventEnrollmentOptions = ['Abilitato', 'Non Abilitato'];

export const EventVisibleOptions = ['Visibile', 'Non Visibile'];

export interface IEventResponseFilter {
  class: string;
  type: string;
  state: string;
  title: string;
  enrollment: string;
  visible: string;
}
