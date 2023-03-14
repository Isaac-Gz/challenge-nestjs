import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type_id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  mail: string;

  @Column()
  password: string;

  @Column()
  english_level: string;

  @Column()
  tec_knowledge: string;

  @Column()
  cv: string;
}
