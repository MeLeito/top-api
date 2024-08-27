import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';
import { Post, PostSchema } from './models/post.model';

@Module({
  providers: [UsersService],
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema}, 
    { name: Post.name, schema: PostSchema}],
  )]
})
export class UsersModule {}
