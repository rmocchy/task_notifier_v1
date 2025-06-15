import { injectable, inject, Container } from "inversify";
import {
  UserRepositoryToken,
  IUserRepository,
} from "../repository/user_repository";
import {
  UserCountRequest,
  UserCountResponse,
} from "@backend/gateway/user/schemas";

export const UserUseCaseToken = Symbol("UserUseCaseToken");

export interface IUserUseCase {
  countUsersByCreatedAt(req: UserCountRequest): Promise<UserCountResponse>;
}

export const registerUserUseCase = (container: Container) => {
  container
    .bind<IUserUseCase>(UserUseCaseToken)
    .to(UserUseCase)
    .inSingletonScope();
};

@injectable()
export class UserUseCase {
  constructor(
    @inject(UserRepositoryToken) private userRepository: IUserRepository
  ) {}

  async countUsersByCreatedAt(_: UserCountRequest): Promise<UserCountResponse> {
    const now = new Date();
    const res = await this.userRepository.CountUsersByCreatedAt(now);
    return { count: res };
  }
}
