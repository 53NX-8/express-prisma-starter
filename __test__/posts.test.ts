import { describe } from "node:test"
import supertest from "supertest"
import createServer from "../src/utils/server"

const app = createServer()

describe('post', () => {
    describe("get post", () => {
        describe('given product dont exist', () => {
            it('should return 404 when trying to get a non-existent product', async () => {
                const postID = '65cfee00bdf743731ce9d971'
                const { body, statusCode } = await supertest(app).get(`/api/v1/posts/${postID}`)
                expect(statusCode).toBe(404)
            })
        })
    })
})