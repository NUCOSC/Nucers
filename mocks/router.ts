import { Router } from "https://deno.land/x/oak/mod.ts"
import { getIndexDatas } from "./controllers/indexs.ts"
import {
    getUsers,
    getUserProfile,
    getUserPosts,
    getUserIdeas,
} from "./controllers/users.ts"
import {
    getGroups,
    getGroupProfile,
    getGroupOAProfile,
} from "./controllers/groups.ts"
import { postPicture, postRePicture, postNewPost } from "./controllers/posts.ts"

const router = new Router()

router
    .get("/", getIndexDatas)
    .get("/u", getUsers)
    .get("/u/:uid", getUserProfile)
    .get("/u/:uid/posts", getUserPosts)
    .get("/u/:uid/ideas", getUserIdeas)
    .get("/g", getGroups)
    .get("/g/:gid", getGroupProfile)
    .get("/g/oa/:gid", getGroupOAProfile)
    .post("/p/new", postNewPost)
    .post("/p/new/picture", postPicture)
    .post("/p/new/repicture", postRePicture)

export default router
