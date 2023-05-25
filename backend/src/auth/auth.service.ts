import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpInput } from './dto/signup-input';
import * as argon from 'argon2';
import { SignInInput } from './dto/signin-input';
import { UpdateInput } from './dto/update-input';
import { UpdatePasswordInput } from './dto/update-password-input';
import { AdminInput } from './dto/admin-input';
import { Role } from '@prisma/client';
import { WriteInput } from './dto/write-input';
import { WriteUpdateInput } from './dto/writeUpdate-input';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  // Méthode pour inscrire un nouvel utilisateur
  async signup(signUpInput: SignUpInput) {
    const hashedPassword = await argon.hash(signUpInput.password);
    const user = await this.prisma.user.create({
      data: {
        username: signUpInput.username,
        lastName: signUpInput.lastName,
        email: signUpInput.email,
        phone: signUpInput.phone,
        hashedPassword,
        newsLetter: signUpInput.newsLetter,
      },
    });

    const { accessToken, refreshToken } = await this.createTokens(
      user.id.toString(),
      user.email,
    );

    await this.updateRefreshToken(user.id.toString(), refreshToken);

    return { accessToken, refreshToken, user };
  }

  async signin(signInInput: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: signInInput.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('User doesent exixt');
    }

    const doPasswordMatch = await argon.verify(
      user.hashedPassword,
      signInInput.password,
    );

    if (!doPasswordMatch) {
      throw new ForbiddenException('Password do not match');
    }

    const { accessToken, refreshToken } = await this.createTokens(
      user.id.toString(),
      user.email,
    );

    await this.updateRefreshToken(user.id.toString(), refreshToken);
    return { accessToken, refreshToken, user };
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(userId: string, updateInput: UpdateInput) {
    let user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ForbiddenException('User doesent exixt');
    }
    await this.prisma.user.updateMany({
      where: {
        id: userId,
      },
      data: {
        username: updateInput.username,
        lastName: updateInput.lastName,
        email: updateInput.email,
        phone: updateInput.phone,
        newsLetter: updateInput.newsLetter,
      },
    });

    user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const { accessToken, refreshToken } = await this.createTokens(
      user.id.toString(),
      user.email,
    );

    await this.updateRefreshToken(user.id.toString(), refreshToken);
    return { accessToken, refreshToken, user };
  }

  async updatePassword(userId: string, updatePasswordInput: UpdatePasswordInput) {
    const hashedPassword = await argon.hash(updatePasswordInput.password);

    await this.prisma.user.updateMany({
      where: {
        id: userId,
      },
      data: {
        hashedPassword: hashedPassword,
      },
    });

    return { changed: true };
  }

  async createTokens(userId: string, email: string) {
    const accessToken = this.jwtService.sign(
      {
        userId,
        email,
      },
      {
        expiresIn: '1h',
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        userId,
        email,
        accessToken,
      },
      {
        expiresIn: '7d',
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      },
    );

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await argon.hash(refreshToken);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken,
      },
    });
  }

  // Méthode pour déconnecter un utilisateur
  async logout(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRefreshToken: { not: null },
      },
      data: { hashedRefreshToken: null },
    });

    return { loggedOut: true };
  }

  async getRefreshTokens(userId: string) {

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ForbiddenException('User doesent exixt');
    }

    const { accessToken, refreshToken } = await this.createTokens(
      user.id.toString(),
      user.email,
    );
    await this.updateRefreshToken(user.id.toString(), refreshToken);
    return { accessToken, refreshToken, user };

  }


  async getNewTokens(userId: string, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const doRefreshTokensMatch = await argon.verify(
      user.hashedRefreshToken,
      rt,
    );
    if (!doRefreshTokensMatch) {
      throw new ForbiddenException('access Denied');
    }

    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.email,
    );

    await this.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken, user };
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        role: true,
        username: true,
        lastName: true,
        email: true,
        phone: true,
        newsLetter: true,
        scribe: true,
      },
    });
    return { users };
  }


  async updateUserPraticien(adminInput: AdminInput) {
    await this.prisma.user.updateMany({
      where: {
        id: adminInput.id,
      },
      data: { role: adminInput.bool ? Role.PRATICIEN : Role.USER },
    });

    return { changed: true }
  }

  async updateUserAdmin(adminInput: AdminInput) {
    await this.prisma.user.updateMany({
      where: {
        id: adminInput.id,
      },
      data: { role: adminInput.bool ? Role.ADMIN : Role.USER },
    });

    return { changed: true }
  }

  async updateUserScribe(adminInput: AdminInput) {
    await this.prisma.user.updateMany({
      where: {
        id: adminInput.id,
      },
      data: { scribe: adminInput.bool },
    });

    return { changed: true }
  }

  async deleteUser(userId: string) {
    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    })

    return { changed: true }
  }

  async createArticle(writeInput: WriteInput) {

    await this.prisma.articles.create({
      data: {
        name: writeInput.articleName,
        image: writeInput.image,
        description: writeInput.description,
        content: writeInput.content,
        tag: writeInput.tags,
        userId: writeInput.userId,
      },
    });

    return { changed: true };
  }

  async deleteArticle(articleId: string) {
    await this.prisma.articles.delete({
      where: {
        id: articleId,
      },
    })

    return { changed: true }
  }


  async updateArticle(writeUpdateInput: WriteUpdateInput) {
    const date = new Date()
    await this.prisma.articles.updateMany({
      where: {
        id: writeUpdateInput.articleId,
      },
      data: {
        name: writeUpdateInput.articleName,
        description: writeUpdateInput.description,
        content: writeUpdateInput.content,
        tag: writeUpdateInput.tag,
        image: writeUpdateInput.image,
        updatedAt: date.toISOString(),
      },
    });

    return { changed: true }
  }

  async updateArticleValidate(adminInput: AdminInput) {
    await this.prisma.articles.updateMany({
      where: {
        id: adminInput.id,
      },
      data: {
        validate: adminInput.bool,
      },
    });

    return { changed: true }
  }

  async getAllArticles() {
    const articles = await this.prisma.articles.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        description: true,
        content: true,
        tag: true,
        like: true,
        dislike: true,
        validate: true,
        user: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return { articles };
  }

  async getOneArticle(id: string) {
    const article = await this.prisma.articles.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        image: true,
        description: true,
        content: true,
        tag: true,
        like: true,
        dislike: true,
        validate: true,
        user: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    console.log(article)
    return { article }
  }
  async getMultipleArticle(id: string) {
    const articles = await this.prisma.articles.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        name: true,
        image: true,
        description: true,
        content: true,
        tag: true,
        like: true,
        dislike: true,
        validate: true,
        user: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return { articles };
  }

}
