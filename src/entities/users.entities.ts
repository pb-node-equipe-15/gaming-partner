import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import Conections from "./conections.entities";
import UsersGames from "./usersGames.entities";

@Entity("users")
class Users {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  @Exclude()
  password: string;

  @Column({ default: false })
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  availability: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToMany(() => UsersGames, (usersGames) => usersGames.users, {
    eager: true,
  })
  games: UsersGames[];

  @OneToMany(() => Conections, (conections) => conections.user, { eager: true })
  conections: Conections[];
}

export default Users;
