import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import Games from "./games.intities";
import Users from "./users.entities";

@Entity("users_games")
class UsersGames {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(() => Users)
  users: Users;

  @ManyToOne(() => Games, { eager: true })
  games: Games;
}

export default UsersGames;
