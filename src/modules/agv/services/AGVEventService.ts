import { Connection, Repository } from 'typeorm';
import { MediaResponseGQL } from '../../../graphql/types/responses/MediaResponseGQL';
import { MediaModel } from '../../../models/MediaModel';
import AGVEventEntity from '../database/entities/AGVEventEntity';
import { AGVInscriptionEntity } from '../database/entities/AGVInscriptionEntity';
import { AGVEventInput } from '../modules/agvEvent/AGVEventInputs';
import { AGVEventResponse } from '../modules/agvEvent/AGVEventResponses';

export class AGVEventService {
  private eventRepository: Repository<AGVEventEntity>;
  private inscriptionRepository: Repository<AGVInscriptionEntity>;
  private mediaModel: MediaModel;

  /**
   *
   */
  constructor(conn: Connection) {
    this.eventRepository = conn.getRepository(AGVEventEntity);
    this.inscriptionRepository = conn.getRepository(AGVInscriptionEntity);
    this.mediaModel = new MediaModel();
  }

  public async all(urlApi: string): Promise<AGVEventResponse[]> {
    const events = await this.eventRepository.find({
      relations: ['imgTitle', 'imgList'],
      order: { id: 'DESC' },
    });

    const eventResponses: AGVEventResponse[] = [];

    for (const evnt of events) {
      let imgTitle = undefined;
      const imgList: MediaResponseGQL[] = [];
      const inscriptionCount = await this.inscriptionRepository.count({
        where: {
          eventId: evnt.id,
        },
      });

      if (!!evnt.imgTitle) {
        imgTitle = MediaModel.getMediaResponse(evnt.imgTitle, urlApi);
        MediaModel.saveMediaFile(evnt.imgTitle);
      }

      if (!!evnt.imgList) {
        evnt.imgList.forEach((img) => {
          imgList.push(MediaModel.getMediaResponse(img, urlApi));
          MediaModel.saveMediaFile(img);
        });
      }
      eventResponses.push({
        ...new AGVEventResponse(),
        ...evnt,
        imgTitle: imgTitle,
        imgList: imgList,
        inscriptions: inscriptionCount,
      });
    }

    return eventResponses;
  }

  public async create(agvEvent: AGVEventInput): Promise<Boolean> {
    let evnt = new AGVEventEntity();
    evnt = await this.setEventProperties(evnt, agvEvent);
    return !!evnt;
  }

  public async modify(agvEvent: AGVEventInput): Promise<Boolean> {
    let evnt = await this.eventRepository.findOne(agvEvent.id);
    if (evnt) evnt = await this.setEventProperties(evnt, agvEvent);
    return !!evnt;
  }

  private async setEventProperties(evnt: AGVEventEntity, agvEvent: AGVEventInput) {
    evnt.class = agvEvent.class;
    evnt.description = agvEvent.description;
    evnt.endDate = agvEvent.endDate;
    evnt.enrollment = agvEvent.enrollment;
    evnt.shortDescription = agvEvent.shortDescription;
    evnt.startDate = agvEvent.startDate;
    evnt.state = agvEvent.state;
    evnt.title = agvEvent.title;
    evnt.type = agvEvent.type;
    evnt.visible = agvEvent.visible;

    const mediaTitle = agvEvent.imgTitle ? await this.mediaModel.getMediaList([agvEvent.imgTitle]) : null;
    if (mediaTitle && mediaTitle.length > 0) {
      evnt.imgTitle = mediaTitle[0];
    }

    const mediaList = agvEvent.imgList ? await this.mediaModel.getMediaList(agvEvent.imgList) : null;
    if (mediaList) {
      evnt.imgList = mediaList;
    }

    return await this.eventRepository.manager.save(evnt);
  }

  public async getEvent(eventId: number) {
    return await this.eventRepository.findOne(eventId);
  }
}
