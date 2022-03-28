import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from 'server/entities/chat_room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatRoomsService {
  constructor(
    @InjectRepository(ChatRoom)
    private readonly chatRoomRepository: Repository<ChatRoom>,
  ) {}

  findAll(): Promise<ChatRoom[]> {
    return this.chatRoomRepository.find();
  }

  findOne(id: number): Promise<ChatRoom> {
    return this.chatRoomRepository.findOne(id);
  }

  async create(chatRoom: ChatRoom): Promise<ChatRoom> {
    return this.chatRoomRepository.save(chatRoom);
  }

  findRoomById(id: number) {
    return this.chatRoomRepository.findOne(id);
  }
}