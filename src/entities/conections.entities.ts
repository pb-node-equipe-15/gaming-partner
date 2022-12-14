import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import Users from "./users.entities";

@Entity("conections")
class Conections {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(() => Users, (users) => users.id)
  user: Users;

  @ManyToOne(() => Users, (users) => users.conections)
  userConections: Users;
}

export default Conections;
