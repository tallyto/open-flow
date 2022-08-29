import app from "./app";
import { wsServer } from "./app-ws";

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listen on http://localhost:3000`)
})

wsServer(server)