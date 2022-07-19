import { PartialType } from '@nestjs/mapped-types';
import { CreateFriendDto } from './create-friend.dto';

export class UpdateFriendDto extends PartialType(CreateFriendDto) {}
