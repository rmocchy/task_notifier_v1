import { registerFunc } from "./main"
import { registerDBConfig } from "../configs/database"
import {registerGoogleAuthConfig} from "../configs/google_auth"
import {registerHealthCheckUseCase} from "../src/usecase/healthCheck"
import {registerSSOLoginUseCase} from "../src/usecase/sso_login_usecase"
import {registerUserUseCase} from "../src/usecase/user_usecase"
import { registerUserRepository } from "backend/src/infra/user_repository"
import { registerDBClient } from "backend/src/infra/clients/db_client"
import { registerGoogleAuthClient } from "backend/src/infra/clients/google_auth_client"

const getLocalWire = () :registerFunc[] => {
    return regisers;
}

export default getLocalWire;

const regisers : Array<registerFunc>= [
    // configs
    registerDBConfig,
    registerGoogleAuthConfig,
    // clients
    registerDBClient,
    registerGoogleAuthClient,
    // repositories
    registerUserRepository,
    // usecases
    registerHealthCheckUseCase,
    registerSSOLoginUseCase,
    registerUserUseCase,
]

