import WebSocket, { WebSocketServer } from 'ws'

function onError(ws, err: Error) {
    console.error(`onError: ${err.message}`)
}
class Message {
    public id: string
    public replyto: string
    public command: string
    public data: string
    public jwt: string
    public priority
    constructor(data) {
        this.replyto = data.id
        this.command = data.command

    }
}

function onMessage(ws: WebSocket.WebSocket, data) {
    const result = JSON.parse(data)
    if (result.command == "ping") {
        ws.send(JSON.stringify(new Message(result)))
    }
    if (result.command == "signin") {
        ws.send(data)
    }
    console.log(`onMessage: ${data}`)
}

function onConnection(ws, req) {
    ws.on('message', data => onMessage(ws, data));
    ws.on('error', error => onError(ws, error));
    console.log(`onConnection`);
}

export const wsServer = (server) => {
    const wss = new WebSocket.Server({
        server
    })

    wss.on('connection', onConnection)

    console.log(`App Web Socket Server is running!`)

    return wss;
} 
