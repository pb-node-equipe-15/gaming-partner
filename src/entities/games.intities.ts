import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne
} from 'typeorm';
import Categories from './categories.entities';
import usersGames from './usersGames.entities';

@Entity('Games')
class Games {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => usersGames, usersGames => usersGames.user)
  users_games: usersGames[];

  @ManyToOne(() => Categories)
  categories: Categories
}

export default Games ;
