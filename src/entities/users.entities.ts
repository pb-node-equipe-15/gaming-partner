import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Conections from "./conections.entities";
import usersGames from "./usersGames.entities";


@Entity('users')
class Users{
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({ length:255 })
    name: string

    @Column({ length:255 })
    email: string

    @Column({ length:255 })
    @Exclude()
    password: string

    @Column({ default: false})
    isAdm: boolean

    @Column({ default: true})
    isActive: boolean

    @Column({ default: false})
    availability: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updateAt: Date

    @OneToMany(() => usersGames, usersGames => usersGames.games)
    games: usersGames[]

    @OneToMany(() => Conections, conections => conections.user)
    user: Conections[]
}

export default Users