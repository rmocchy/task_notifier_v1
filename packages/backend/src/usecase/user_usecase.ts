import { injectable, inject } from "tsyringe";
import { UserRepository } from "../infra/user_repository";

@injectable()
export class UserUseCase {
  constructor(
    @inject(UserRepository) private userRepository: UserRepository
  ) {}

  async countUsersByCreatedAt(createdAt: Date): Promise<number> {
    return await this.userRepository.CountUsersByCreatedAt(createdAt);
  }
}