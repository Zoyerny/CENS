import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { SignUpInput } from './dto/signup-input';
import { SignReponse } from './dto/sign-reponse';
import { SignInInput } from './dto/signin-input';
import { LogoutReponse } from './dto/logout-response';
import { Public } from './decorators/public.decorator';
import { NewTokenReponse } from './dto/newTokensReponse';
import { CurrentUserId } from './decorators/currentUserId.decorator';
import { CurrentUser } from './decorators/currentUser.decorator';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { UseGuards } from '@nestjs/common';
import { UpdateInput } from './dto/update-input';
import { UpdatePasswordInput } from './dto/update-password-input';
import { UpdatePasswordReponse } from './dto/update-password-response';
import { GetUsersResponse } from './dto/getUsers-response';
import { ChangeResponse } from './dto/change-response';
import { AdminInput } from './dto/admin-input';
import { WriteInput } from './dto/write-input';
import { GetArticlesResponse } from './dto/getArticles-response';
import { WriteUpdateInput } from './dto/writeUpdate-input';
import { Article } from 'src/articles/article.entity';
import { GetArticleResponse } from './dto/getArticle-response';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  // Mutation pour inscrire un nouvel utilisateur
  @Public()
  @Mutation(() => SignReponse)
  signup(@Args('signUpInput') signUpInput: SignUpInput) {
    // Appelle le service AuthService pour inscrire un nouvel utilisateur
    return this.authService.signup(signUpInput);
  }

  // Mutation pour connecter un utilisateur existant
  @Public()
  @Mutation(() => SignReponse)
  signin(@Args('signInInput') signInInput: SignInInput) {
    // Appelle le service AuthService pour connecter un utilisateur existant
    return this.authService.signin(signInInput);
  }

  // Query pour récupérer un utilisateur par son ID
  @Query(() => Auth, { name: 'auth' })
  findOne(@Args('id', { type: () => String }) id: string) {
    // Appelle le service AuthService pour récupérer un utilisateur par son ID
    return this.authService.findOne(id);
  }

  // Mutation pour mettre à jour les informations d'un utilisateur
  @Mutation(() => SignReponse)
  updateAuth(@CurrentUserId() userId: string, @Args('updateInput') updateInput: UpdateInput) {
    // Appelle le service AuthService pour mettre à jour les informations d'un utilisateur
    return this.authService.update(userId, updateInput);
  }

  @Mutation(() => UpdatePasswordReponse)
  updatePassword(@CurrentUserId() userId: string, @Args('updatePasswordInput') updatePasswordInput: UpdatePasswordInput) {
    // Appelle le service AuthService pour mettre à jour les informations d'un utilisateur
    return this.authService.updatePassword(userId, updatePasswordInput);
  }

  // Mutation pour déconnecter un utilisateur
  @Public()
  @Mutation(() => LogoutReponse)
  logout(@Args('id', { type: () => String }) id: string) {
    // Call the AuthService to logout a user
    return this.authService.logout(id);
  }

  // Query pour tester la connexion au serveur
  @Query(() => String)
  hello() {
    return 'Hello world !';
  }

  @Query(() => GetUsersResponse)
  getUsers() {
    return this.authService.getAllUsers();
  }

  @Mutation(() => ChangeResponse)
  updateUserPraticien(@Args('adminInput') adminInput: AdminInput) {
    // Appelle le service AuthService pour mettre à jour les informations d'un utilisateur
    return this.authService.updateUserPraticien(adminInput);
  }

  @Mutation(() => ChangeResponse)
  updateUserAdmin(@Args('adminInput') adminInput: AdminInput) {
    // Appelle le service AuthService pour mettre à jour les informations d'un utilisateur
    return this.authService.updateUserAdmin(adminInput);
  }
  @Mutation(() => ChangeResponse)
  updateUserScribe(@Args('adminInput') adminInput: AdminInput) {
    // Appelle le service AuthService pour mettre à jour les informations d'un utilisateur
    return this.authService.updateUserScribe(adminInput);
  }
  @Mutation(() => ChangeResponse)
  deleteUser(@Args('id', { type: () => String }) id: string) {
    // Appelle le service AuthService pour mettre à jour les informations d'un utilisateur
    return this.authService.deleteUser(id);
  }

  @Mutation(() => ChangeResponse)
  createArticle(@Args('writeInput') writeInput: WriteInput) {
    return this.authService.createArticle(writeInput);
  }

  @Mutation(() => ChangeResponse)
  deleteArticle(@Args('id', { type: () => String }) id: string) {
    return this.authService.deleteArticle(id);
  }

  @Mutation(() => ChangeResponse)
  updateArticle(@Args('writeUpdateInput') writeUpdateInput: WriteUpdateInput) {
    return this.authService.updateArticle(writeUpdateInput);
  }

  @Mutation(() => ChangeResponse)
  updateArticleValidate(@Args('adminInput') adminInput: AdminInput) {
    return this.authService.updateArticleValidate(adminInput);
  }

  @Public()
  @Query(() => GetArticleResponse)
  getOneArticle(@Args('id', { type: () => String }) id: string) {
    return this.authService.getOneArticle(id);
  }

  @Public()
  @Query(() => GetArticlesResponse)
  getMultipleArticle(@Args('id', { type: () => String }) id: string) {
    return this.authService.getMultipleArticle(id);
  }

  @Public()
  @Query(() => GetArticlesResponse)
  getArticles() {
    return this.authService.getAllArticles();
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Mutation(() => NewTokenReponse)
  getNewTokens(
    @CurrentUserId() userId: string,
    @CurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.getNewTokens(userId, refreshToken);
  }


}