import AppDataSource from "../../data-source"
import Games from "../../entities/games.intities"
import Users from "../../entities/users.entities"
import usersGames from "../../entities/usersGames.entities"
import AppError from "../../errors/AppError"

const addGamesUserService =async (IdGames: string, id: string): Promise<Users> => {
    const userRepository = AppDataSource.getRepository(Users)
    const gamesRepository = AppDataSource.getRepository(Games)
    const userGame = AppDataSource.getRepository(usersGames)

    const findUser = await userRepository.findOneBy({id})
    const SearchGame = await gamesRepository.findOneBy({id: IdGames})
    
    if(!findUser){
        throw new AppError("User not found", 400)
    }
    if(!SearchGame){
        throw new AppError("Game not found", 400)        
    }

    await userGame.update(id,{
        user: findUser,
        games: SearchGame
    })
        
    const user = await userRepository.findOneBy({id})    
    return user!
}

export default addGamesUserService