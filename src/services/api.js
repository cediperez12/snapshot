import { pexelsInstance } from "./axios";

const pexelsAPI = {
    search: (params) => pexelsInstance.get("/search", { params })
}

export { pexelsAPI };