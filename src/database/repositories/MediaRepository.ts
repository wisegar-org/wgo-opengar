import { EntityRepository, Repository } from 'typeorm';
import MediaEntity from '../entities/MediaEntity';

@EntityRepository(MediaEntity)
export class MediaRepository extends Repository<MediaEntity>{

}