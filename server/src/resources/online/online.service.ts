import { Injectable } from '@nestjs/common';
import { CreateOnlineDto } from './dto/create-online.dto';

@Injectable()
export class OnlineService {
  create(createOnlineDto: CreateOnlineDto) {
    return 'This action adds a new online';
  }
}
