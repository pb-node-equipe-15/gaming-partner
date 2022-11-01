import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Games from "./games.intities";

@Entity('categories')
class Categories {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({ length: 255, unique: true })
    name: string

    @OneToMany(() => Games, games => games.categories)
    games: Games[]
}

export default Categories