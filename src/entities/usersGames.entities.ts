import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Games from "./games.intities";
import Users from "./users.entities";


@Entity('users_games')
class usersGames{
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @ManyToOne(() => Users)
    user: Users

    @ManyToOne(() => Games)
    games: Games
}

export default usersGames