import { Body, Controller, Delete, Get, HttpException, Param, Post } from '@nestjs/common';
import { ChatRoom } from 'server/entities/chat_room.entity';
import { ChatRoomsService } from 'server/providers/services/chat_rooms.service';
import * as crypto from 'crypto';
import { JwtBody } from "server/decorators/jwt_body.decorator";
import { JwtBodyDto } from 'server/dto/jwt_body.dto';

class ChatRoomBody {
  roomName: string;
  latitude: number;
  longitude: number;
  userId: number;
}

@Controller()
export class ChatRoomsController {
    constructor(private chatRoomsService: ChatRoomsService) {}

    @Get('/chat_rooms')
    async index() {
        const chatRooms = await this.chatRoomsService.findAll();
        return { chatRooms };
    }

    @Get('/chat_rooms/:id')
    public async getRoomById(@Param("id") id: string) {
        const chatRoom = await this .chatRoomsService.findRoomById(parseInt(id, 10));
        return { chatRoom } ;
    }

    @Post('/chat_rooms')
    public async create(@Body() body: ChatRoomBody){
        let chatRoom = new ChatRoom();
        chatRoom.name = body.roomName;
        chatRoom.latitude = body.latitude;
        chatRoom.longitude = body.longitude;
        chatRoom.userId = body.userId;
        chatRoom.roomkey = crypto.randomBytes(8).toString('hex');
        chatRoom = await this.chatRoomsService.create(chatRoom);
        return { chatRoom };
    }

    @Delete('/chat_rooms/:id')
    public async destroy(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto, @Body() body:ChatRoomBody){
        const chatRoom = await this.chatRoomsService.findRoomById(parseInt(id, 10));
        if(chatRoom.userId !== jwtBody.userId) {
            throw new HttpException('Unauthorized', 401);
        }
        this.chatRoomsService.removeChatRoom(chatRoom);
        return  { chatRoom };
    }
}