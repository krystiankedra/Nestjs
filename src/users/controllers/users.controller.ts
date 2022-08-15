import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UsersService } from '../services/users.service';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { UserDto } from '../dtos/user.dto';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(
    @Body() { email, password }: CreateUserDto,
    @Session() session: any
  ) {
    const user = await this.authService.signup(email, password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(
    @Body() { email, password }: CreateUserDto,
    @Session() session: any
  ) {
    const user = await this.authService.signin(email, password);
    session.userId = user.id;
    return user;
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get()
  @UseGuards(AuthGuard)
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(parseInt(id), payload);
  }
}
