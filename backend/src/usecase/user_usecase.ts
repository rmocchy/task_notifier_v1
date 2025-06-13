import { injectable, inject, Container } from "inversify"
import { UserRepositoryToken, IUserRepository } from "../infra/user_repository";

export const UserUseCaseToken = Symbol("UserUseCaseToken");

export type IUserUseCase = {
  countUsersByCreatedAt(createdAt: Date): Promise<number>;
}

export const registerUserUseCase = (container: Container) => {
  container.bind<IUserUseCase>(UserUseCaseToken).to(UserUseCase).inSingletonScope();
}

@injectable()
export class UserUseCase {
  constructor(
    @inject(UserRepositoryToken) private userRepository: IUserRepository
  ) {}

  async countUsersByCreatedAt(createdAt: Date): Promise<number> {
    return await this.userRepository.CountUsersByCreatedAt(createdAt);
  }
}