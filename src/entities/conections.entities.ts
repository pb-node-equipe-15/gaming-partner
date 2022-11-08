import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import Users from "./users.entities";

@Entity("conections")
class Conections {
  @PrimaryGeneratedColumn("uuid")
  readonly id: String;

  @ManyToOne(() => Users)
  user: Users;
}

export default Conections;
