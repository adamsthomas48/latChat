
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'server/entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
  ) {}

  findAllForRoom(id: number): Promise<Message[]> {
    return this.messagesRepository.find({
      where: {
        chatRoomId: id,
      },
    });
  }

  async create(chatRoom: Message): Promise<Message> {
    return this.messagesRepository.save(chatRoom);
  }
}