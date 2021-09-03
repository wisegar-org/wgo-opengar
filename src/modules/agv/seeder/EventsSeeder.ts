import moment from 'moment';
import { Connection } from 'typeorm';
import AGVEventEntity from '../database/entities/AGVEventEntity';
import { EventsList, IItemEvent } from './events';

export async function EventsSeeder(conn: Connection) {
  const eventRepo = conn.getRepository(AGVEventEntity);

  const countEvents = await eventRepo.count();
  const events: AGVEventEntity[] = [];
  if (countEvents === 0) {
    ((EventsList as any) as IItemEvent[]).forEach((agvEvent: IItemEvent) => {
      const eventEntity = new AGVEventEntity();
      eventEntity.class = agvEvent.class;
      eventEntity.description = agvEvent.description;
      eventEntity.endDate = moment(agvEvent.endDate, 'DD/MM/YYYY').toDate();
      eventEntity.enrollment = agvEvent.enrollment;
      eventEntity.shortDescription = agvEvent.shortDescription;
      eventEntity.startDate = moment(agvEvent.startDate, 'DD/MM/YYYY').toDate();
      eventEntity.state = agvEvent.state;
      eventEntity.title = agvEvent.title;
      eventEntity.type = agvEvent.type;
      eventEntity.visible = agvEvent.visible;
      events.push(eventEntity);
    });

    await eventRepo.manager.save(events);
  }
}
