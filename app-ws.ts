import WebSocket, { WebSocketServer } from 'ws'
import jwtDecode from 'jwt-decode'
import { v4 } from 'uuid'
import { getUser } from './controller/user'
import { createProject } from './controller/project'
import { createWorkflow } from './controller/workflow'
function onError(ws, err: Error) {
    console.error(`onError: ${err.message}`)
}


async function onMessage(ws: WebSocket.WebSocket, data) {
    const result = JSON.parse(data)
    if (result.command == "ping") {
        const message = { ...result }
        message.id = v4()
        message.replyto = result.id
        message.command = "pong"
        ws.send(JSON.stringify(message))
    }
    if (result.command == "signin") {
        const message = { ...result }
        message.id = v4()
        message.replyto = result.id
        message.command = "signin"
        const data = JSON.parse(result.data)
        const decode: any = jwtDecode(data.jwt)
        data.user = await getUser(decode.username)
        data.websocket_package_size = 1048576
        data.openflow_uniqueid = v4()
        data.enable_analytics = false
        data.username = decode.user
        message.data = JSON.stringify(data)
        ws.send(JSON.stringify(message))
    }
    if (result.command == "query") {
        const message = { ...result }
        message.id = v4()
        message.replyto = result.id
        message.command = "query"
        const data = JSON.parse(message.data)
        data.result = []
        message.data = JSON.stringify(data)
        ws.send(JSON.stringify(message))
    } if (result.command == "registerqueue") {
        const message = { ...result }
        message.id = v4()
        message.replyto = result.id
        message.command = "registerqueue"
        ws.send(JSON.stringify(message))
    } if (result.command == "insertone") {
        const message = { ...result }
        const data = JSON.parse(message.data)
        message.id = v4()
        message.replyto = result.id
        message.command = "insertone"
        if (data.item._type == "project") {
            const result = await createProject(data.item)
            console.log("project", result)
            data.item = ""
            data.result = result
            message.data = JSON.stringify(data)
            ws.send(JSON.stringify(message))
        }
        if (data.item._type == "workflow") {
            const result = await createWorkflow(data.item)
            console.log("workflow", result)
            data.item = ""
            data.result = result
            message.data = JSON.stringify(data)
            ws.send(JSON.stringify(message))
        }
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
