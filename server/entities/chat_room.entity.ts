import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.entity';
import { User } from './user.entity';

@Entity()
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  roomkey: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  userId: number;

  

  @OneToMany(() => Message, (message) => message.chatRoom)
  messages: Message[];

  @ManyToOne(() => User, (user) => user.chatRooms)
  user: User;

}
