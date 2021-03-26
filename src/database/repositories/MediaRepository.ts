import { EntityRepository, Repository } from "typeorm";
import { MediaEntity } from "@wisegar-org/wgo-opengar-core";

@EntityRepository(MediaEntity)
export class MediaRepository extends Repository<MediaEntity> {}
