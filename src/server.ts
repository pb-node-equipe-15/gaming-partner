import app from "./app";
import AppDataSource from "./data-source";

(async () => {
    const PORT = process.env.PORT

    await AppDataSource.initialize().then(() =>{
        console.log('Database connected')
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
    
    app.listen(PORT, () => {
        console.log(`Serve running on port ${PORT}`)
    })    
})()