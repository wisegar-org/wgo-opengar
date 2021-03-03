// import { EntityRepository, Repository, getRepository } from "typeorm"
// import { UserEntity } from "../database/entities/UserEntity"
// import * as util from 'util'
// import _ from 'lodash'

// @EntityRepository(UserEntity)
// export class UserRepository extends Repository<UserEntity> {
//     async createAndSave(user: UserEntity): Promise<UserEntity> {
//         let usr = new UserEntity();

//         usr.email = user.email
//         usr.lastName = user.lastName
//         usr.name = user.name
//         usr.password = user.password
//         usr.userName = user.email

//         await this.save(usr)
//         return usr
//     }

//     async allUsers(): Promise<UserEntity []> {
//         let users = await this.find()
//         return users
//     }

//     async findUserById(id: number): Promise<UserEntity> {
//         let user = await this.findOne({
//             where: {id: id}
//         })
//         return user
//     }

//     async findUserByUserName(userName: string): Promise<UserEntity> {
//         let user = await this.findOne({
//             where: {userName: userName}
//         })
//         return user;
//     }

//     async findUserByField(field: string, value: unknown): Promise<UserEntity> {
//         let user = await this.findOne({
//             where: { [field]: value}
//         })
//         return user;
//     }

//     async updateUser(user: UserEntity): Promise<UserEntity> {
//         //if user is null or undefined
//         if(_.isEmpty(user)){
//             throw new Error('User can not be empty, null, or undefined');
//         }

//         await this.update(user.id, user);
//         return user;
//     }

//     async deleteUser(user: number | UserEntity) {
//         if(_.isEmpty(user)){
//             throw new Error('User can not be empty, null, or undefined');
//         }

//         await this.delete(_.isNumber(user) ? user : user.id)
//     }
// }