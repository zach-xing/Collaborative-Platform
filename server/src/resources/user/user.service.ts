import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  // 创建一个 user，也就是注册一个 user
  // 同时，还得创建 firend、cloudfile 两个表
  async createUser(createUserDto: CreateUserDto) {
    if (
      (await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      })) !== null
    ) {
      throw new HttpException('该用户已经被创建', HttpStatus.BAD_REQUEST);
    }

    const createdUser = await this.prisma.user.create({
      data: createUserDto,
    });
    await this.prisma.friend.create({
      data: {
        userId: createdUser.id,
        friend_list: '',
      },
    });
    await this.prisma.cloudFile.create({
      data: {
        id: createdUser.id,
        content: '',
      },
    });
    return 'create success';
  }

  // 登录
  async login(loginUserDto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginUserDto.email },
    });
    if (user === null) {
      throw new HttpException('该用户邮箱不存在', HttpStatus.BAD_REQUEST);
    }

    if (user.password !== loginUserDto.password) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }

    const token = this.jwtService.sign({
      email: loginUserDto.email,
      password: loginUserDto.password,
    });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      access_token: token,
    };
  }
}
