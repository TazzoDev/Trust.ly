import { getPostbyId, getRequestsByClientId } from "./firebase";

export async function getUserByPostId(postId){
    const post = await getPostbyId(postId)
    return post.userId
}

export async function hasRequested(userId, workerId){
    let res = false
    const requests = await getRequestsByClientId(userId)
    requests.map(req => {
        if(workerId === req.workerId && req.status === 'pending') res = true
    })
    return res
}

export function filterRequestsByStatus(status, reqArr){
    const res = []
    reqArr.forEach(req => {
        if(req.status === status) res.push(req)
    });
    return res
}