import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";

import Categories from "./categories.entities";
import UsersGames from "./usersGames.entities";

@Entity("Games")
class Games {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UsersGames, (usersGames) => usersGames.games)
  usersGames: UsersGames[];

  @ManyToOne(() => Categories)
  categories: Categories;
}

export default Games;
