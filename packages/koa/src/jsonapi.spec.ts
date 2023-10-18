import { string } from "@hatchifyjs/core"
import type { PartialSchema } from "@hatchifyjs/node"
import { Serializer } from "jsonapi-serializer"
import Koa from "koa"

import { Hatchify } from "./koa"
import { GET, POST, createServer } from "./testing/utils"

describe("JSON:API Tests", () => {
  const Model: PartialSchema = {
    name: "Model",
    attributes: {
      firstName: string({ required: true }),
      lastName: string({ required: true }),
    },
  }

  function serialize(data: any) {
    const serializer = new Serializer("Model", {
      keyForAttribute: "camelCase",
      attributes: Object.keys(data),
      pluralizeType: false,
    })
    const serial = serializer.serialize(data)
    return serial
  }

  it("should handle JSON:API create body", async () => {
    const app = new Koa()
    const hatchify = new Hatchify({ Model }, { prefix: "/api" })
    app.use(hatchify.middleware.allModels.all)

    const server = createServer(app)
    await hatchify.createDatabase()

    await POST(
      server,
      "/api/models",
      serialize({
        firstName: "firstName",
        lastName: "lastName",
      }),
      "application/vnd.api+json",
    )

    const create = await POST(
      server,
      "/api/models",
      serialize({
        firstName: "firstName2",
        lastName: "lastName2",
      }),
      "application/vnd.api+json",
    )

    await POST(
      server,
      "/api/models",
      serialize({
        firstName: "firstName3",
        lastName: "lastName3",
      }),
      "application/vnd.api+json",
    )

    expect(create).toBeTruthy()
    expect(create.status).toBe(200)
    expect(create.deserialized).toHaveProperty("id")
    expect(create.deserialized.id).toBeTruthy()

    const find = await GET(server, "/api/models/" + create.deserialized.id)

    expect(find).toBeTruthy()
    expect(find.status).toBe(200)
    expect(find.deserialized).toBeTruthy()
    expect(find.deserialized.id).toBe(create.deserialized.id)

    await hatchify.orm.close()
  })
})
