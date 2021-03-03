import { Request, Response } from '../routes/router'
import { MediaEntity, Repository, Connection } from '../database/index'
import { SaveImageResponse, MediaEntityTypeEnum } from '../models/index'
import { UploadedFile } from 'express-fileupload'
import _ from 'lodash'
import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { MediaRepository } from '../database/repositories/MediaRepository'

const mimeTypes = require('mime-types')

@Service()
export class MediaController {
    constructor(@InjectRepository(MediaEntity, "development") private readonly mediaRepository: MediaRepository) {
        
    }
     imagePath = __dirname + '\\..\\..\\public\\img\\' 
     async saveImage(req: Request, res: Response){
        
        const file = req.files.file as UploadedFile
        const { md5, mimetype, name } = file
        let media = await this.mediaRepository.findOne({
            checkSum: md5
        })

        if(_.isEmpty(media)){
            const path = md5 + '.' + mimeTypes.extension(mimetype)
            await file.mv(this.imagePath + path)
            media = new MediaEntity(name, new Date(), MediaEntityTypeEnum.image, md5, 'img/' + path)
            media = await this.mediaRepository.save(media)
        }

        res.send(new SaveImageResponse(media.id, media.path)) 
    }
}