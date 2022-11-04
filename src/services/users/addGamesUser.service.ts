import AppDataSource from "../../data-source"
import Games from "../../entities/games.intities"
import Users from "../../entities/users.entities"
import UsersGames from "../../entities/usersGames.entities"
import AppError from "../../errors/AppError"

const addGamesUserService =async (IdGames: string, idUser: string): Promise<void> => {
    const userRepository = AppDataSource.getRepository(Users)
    const gamesRepository = AppDataSource.getRepository(Games)
    const userGameRepository = AppDataSource.getRepository(UsersGames)

    const users = await userRepository.findOneBy({id: idUser})
    const games = await gamesRepository.findOneBy({id: IdGames})   
    
    if(!games || !users){
        throw new AppError("Game not found", 400)        
    }

    await userGameRepository.save({
        users,
        games
    })        
    /* const user = await userRepository.findOneBy({id})    
    return user! */    
}

export default addGamesUserService