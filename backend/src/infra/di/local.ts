import { registerFunc } from "./container"
import { registerDBConfig } from "../../../configs/database"
import {registerGoogleAuthConfig} from "../../../configs/google_auth"
import {registerHealthCheckUseCase} from "../../usecase/healthCheck"
import {registerSSOLoginUseCase} from "../../usecase/sso_login_usecase"
import {registerUserUseCase} from "../../usecase/user_usecase"
import { registerUserRepository } from "../../repository/user_repository"
import { registerGoogleAuthClient } from "../clients/google_auth_client"
import { registerDBClientV2 } from "../clients/db_client_v2"

const getLocalWire = () :registerFunc[] => {
    return registers;
}

export default getLocalWire;

const registers : registerFunc[]= [
    // configs
    registerDBConfig,
    registerGoogleAuthConfig,
    // clients
    registerDBClientV2,
    registerGoogleAuthClient,
    // repositories
    registerUserRepository,
    // usecases
    registerHealthCheckUseCase,
    registerSSOLoginUseCase,
    registerUserUseCase,
]

