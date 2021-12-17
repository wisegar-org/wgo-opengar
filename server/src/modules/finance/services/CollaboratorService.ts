import { Connection, Repository } from 'typeorm';
import { CollaboratorEntity } from '../database/entities/CollaboratorEntity';
import { GetConnection } from '../database';
import {
  UserEntity,
  RolEntityEnum,
  UserDataService,
  RolEntity,
  Context,
  ObjExt as ObjExtUtils,
} from '@wisegar-org/wgo-opengar-core';

export class CollaboratorService {
  private connection: Connection;
  private collaboratorConnection: Repository<CollaboratorEntity>;
  private rolesRepository: Repository<RolEntity>;
  private userDataService: UserDataService;
  private userContext: Context | undefined;
  constructor(userContext?: Context) {
    // debugger
    this.connection = GetConnection();
    this.collaboratorConnection = this.connection.getRepository(CollaboratorEntity);
    this.rolesRepository = this.connection.getRepository(RolEntity);
    this.userDataService = new UserDataService(this.connection);
    this.userContext = userContext;
  }

  async addCollaborator(
    numberId: number,
    login: string,
    node_id: string,
    type: string,
    avatar_url: string,
    url: string,
    name: string,
    location: string,
    email: string,
    bio: string,
    isCollaborator = false,
    card_number: string,
    address: string,
    cap: string,
    place: string
  ): Promise<CollaboratorEntity | undefined> {
    const result = await this.collaboratorConnection.findOne({
      where: [
        {
          id: numberId,
        },
        {
          login: login,
        },
      ],
    });

    if (isCollaborator) {
      await this.createUser(name, login, email);
    }

    if (result !== undefined) {
      return undefined;
    }

    const proj = new CollaboratorEntity(
      numberId,
      login,
      node_id,
      type,
      avatar_url,
      url,
      name,
      location,
      email,
      bio,
      card_number,
      0,
      address,
      cap,
      place
    );
    proj.login = isCollaborator ? proj.login : name;
    proj.isCollaborator = isCollaborator;
    return await this.collaboratorConnection.manager.save(proj);
  }

  async updateCollaborator(
    id: number,
    login: string,
    node_id: string,
    type: string,
    avatar_url: string,
    url: string,
    name: string,
    location: string,
    email: string,
    bio: string,
    isCollaborator = false
  ) {
    let collaborator = await this.collaboratorConnection.findOne({
      id: id,
    });

    if (collaborator !== undefined) {
      collaborator.login = login || collaborator.login;
      collaborator.node_id = node_id || collaborator.node_id;
      collaborator.type = type || collaborator.type;
      collaborator.avatar_url = avatar_url || collaborator.avatar_url;
      collaborator.url = url || collaborator.url;
      collaborator.name = collaborator.name ? collaborator.name : name;
      collaborator.location = location || collaborator.location;
      collaborator.email = collaborator.email ? collaborator.email : email;
      collaborator.bio = bio || collaborator.bio;
      collaborator.isCollaborator = isCollaborator;
      collaborator.login = isCollaborator ? collaborator.login : name;
      return await collaborator.save();
    }

    return undefined;
  }

  async updateOrInsertCollaborator(
    numberId: number,
    login: string,
    node_id: string,
    type: string,
    avatar_url: string,
    url: string,
    name: string,
    location: string,
    email: string,
    bio: string,
    isCollaborator = false
  ): Promise<CollaboratorEntity> {
    let collaborator = await this.collaboratorConnection.findOne({
      id_github: numberId,
    });
    collaborator = await this.updateCollaborator(
      collaborator ? collaborator.id : 0,
      login,
      node_id,
      type,
      avatar_url,
      url,
      name,
      location,
      email,
      bio,
      isCollaborator
    );

    if (collaborator ? collaborator.isCollaborator : isCollaborator) {
      await this.createUser(name, login, email);
    }

    if (!collaborator) {
      collaborator = new CollaboratorEntity(
        numberId,
        login,
        node_id,
        type,
        avatar_url,
        url,
        name,
        location,
        email,
        bio
      );
      collaborator.isCollaborator = isCollaborator;
      return await this.collaboratorConnection.manager.save(collaborator);
    }

    return collaborator;
  }

  async findCollaboratorById(numberId: number): Promise<CollaboratorEntity | undefined> {
    return await this.collaboratorConnection.findOne({
      id: numberId,
    });
  }

  async findCollaboratorByOptions(options: any): Promise<CollaboratorEntity | undefined> {
    return await this.collaboratorConnection.findOne(options);
  }

  async getAllCollaborators(): Promise<CollaboratorEntity[]> {
    const filter = await this.getFilterByCollaborator('id');
    return await this.collaboratorConnection.find({
      where: {
        ...filter,
      },
      order: {
        name: 'ASC',
      },
    });
  }

  async updateAccountingInfo(
    numberId: number,
    name: string,
    card_number: string,
    pay_by_hours: number,
    email: string,
    address: string,
    cap: string,
    place: string,
    bio: string,
    type: string
  ): Promise<CollaboratorEntity | null> {
    const filter = await this.getFilterByCollaborator('id');
    let collaborator = await this.collaboratorConnection.findOne({
      id: numberId,
      ...filter,
    });
    if (collaborator !== undefined) {
      collaborator.name = name;
      collaborator.login = !collaborator.isCollaborator ? name : collaborator.login;
      collaborator.card_number = card_number;
      collaborator.pay_by_hours = pay_by_hours;
      collaborator.email = email;
      collaborator.address = address;
      collaborator.cap = cap;
      collaborator.place = place;
      collaborator.bio = !collaborator.isCollaborator ? bio : collaborator.bio;
      collaborator.type = !!type ? type : collaborator.type;

      const user = await this.userDataService.one({
        userName: collaborator.login,
      });
      if (user.isSuccess && user.result) {
        user.result.name = !user.result.name ? name : user.result.name;
        user.result.email = email ? email : user.result.email;

        await this.userDataService.update(user.result);
      }
      return await collaborator.save();
    }
    return null;
  }

  private async createUser(name: string, userName: string, email: string) {
    let userResponse = await this.userDataService.one({ userName: userName });

    if (!userResponse.isSuccess) {
      const splitName = name.split(' ');
      const user_name = splitName.splice(0, 1)[0];
      const user_lastName = splitName.length > 0 ? splitName.join(' ') : '';
      const user_email = email !== '' && email.indexOf('@') !== -1 ? email : '';
      const userResult = new UserEntity(
        ObjExtUtils.IsStringEmpty(user_name) ? userName : user_name,
        ObjExtUtils.IsStringEmpty(user_lastName) ? '' : user_lastName,
        userName,
        user_email,
        userName,
        [],
        true
      );
      const rolEntity = await this.rolesRepository.findOne({ name: RolEntityEnum.customer });
      const result = await this.userDataService.create(userResult, rolEntity ? [rolEntity.id] : []);

      if (result.isSuccess) {
        console.log('Create user by collaborator: ', userResult.userName);
      }
    } else if (!ObjExtUtils.IsStringEmpty(email) && userResponse.result) {
      const splitName = name.split(' ');
      const user_name = splitName.splice(0, 1)[0];
      const user_lastName = splitName.join(' ');

      const user = userResponse.result;

      if (ObjExtUtils.IsStringEmpty(user.email)) {
        user.email = email;
      }

      if (ObjExtUtils.IsStringEmpty(user.name)) {
        user.name = user_name;
      }

      if (ObjExtUtils.IsStringEmpty(user.lastName)) {
        user.lastName = user_lastName;
      }

      await this.userDataService.update(user);
    }
  }

  getUserDataService(): UserDataService {
    return this.userDataService;
  }

  async getFilterByCollaborator(property: string) {
    let filter = {};
    if (!this.userContext || !this.userContext.user) {
      filter = { [property]: null };
    } else if (
      this.userContext.user &&
      this.userContext.user.roles.filter((rol) => rol === RolEntityEnum.superAdmin).length === 0
    ) {
      const user = await this.userDataService.oneById(parseInt(this.userContext.user.userId));
      const coll =
        user.isSuccess && user.result && user.result.userName
          ? await this.findCollaboratorByOptions({
              login: user.result.userName,
            })
          : null;
      filter = { [property]: coll ? coll.id : null };
    }
    return filter;
  }
}
