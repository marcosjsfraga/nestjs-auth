import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const data: Prisma.UserCreateInput = {
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10),
        };

        const createdUser = await this.prisma.user.create({ data });

        return {
            ...createdUser,
            password: undefined,
        };
    }

    findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    findAll() {
        return this.prisma.user.findMany();
    }

    findOne(id: number) {
        return this.prisma.user.findFirst({ where: { id } });
    }

    // update(id: number, updateUserDto: UpdateUserDto) {
    //   return `This action updates a #${id} user`;
    // }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
