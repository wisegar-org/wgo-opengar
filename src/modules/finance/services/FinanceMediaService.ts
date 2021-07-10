import { MediaEntity, MediaService } from '@wisegar-org/wgo-opengar-core'
import { GetConnection } from '../database'
import { UploadedFile } from 'express-fileupload'

export class FinanceMediaService {
  private mediaService: MediaService
  constructor() {
    const conn = GetConnection()
    this.mediaService = new MediaService(conn)
  }

  async getMediaList(listId: number[]) {
    const result: MediaEntity[] = []
    await Promise.all(
      listId.map(async (id) => {
        const media = await this.mediaService.getMediaById(id)
        if (media) {
          result.push(media)
        }
      })
    )
    return result
  }

  async uploadFiles(uploaded: UploadedFile[]) {
    const medias: any[] = []
    await Promise.all(
      uploaded.map(async (file) => {
        const media = await this.mediaService.saveDocument(file, { isPublic: false })
        medias.push({
          id: media.id,
          fileName: media.fileName,
          type: media.mimeType,
          displayName: media.displayName
        })
      })
    )
    return medias
  }

  async getFile(id: number) {
    const media = await this.mediaService.getMediaById(id)
    return {
      type: media.mimeType,
      data: media.fileContent
    }
  }
}
