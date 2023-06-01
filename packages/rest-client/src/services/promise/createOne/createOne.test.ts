import { describe, it, expect, vi } from "vitest"
import {
  keyResourcesById,
  createStore,
  convertResourceToRecord,
} from "../../store"
import type { Schema, Source } from "../../types"
import { createOne } from "./createOne"

const fakeDataSource: Source = {
  version: 0,
  findAll: () => Promise.resolve([]),
  findOne: () => Promise.resolve([]),
  createOne: () =>
    Promise.resolve([
      {
        id: "3",
        __schema: "Article",
        attributes: { title: "baz", body: "baz-body" },
      },
    ]),
  updateOne: () => Promise.resolve([]),
  deleteOne: () => Promise.resolve(),
}

const ArticleSchema = {
  name: "Article",
  displayAttribute: "title",
  attributes: { title: "string", body: "string" },
} as Schema
const schemas = { Article: ArticleSchema }

describe("rest-client/services/promise/createOne", () => {
  const data = {
    attributes: { title: "baz", body: "baz-body" },
  }
  const expected = {
    id: "3",
    __schema: "Article",
    attributes: { title: "baz", body: "baz-body" },
  }

  it("should return the new record", async () => {
    createStore(["Article"])
    const result = await createOne(fakeDataSource, schemas, "Article", data)
    expect(result).toEqual(convertResourceToRecord(expected))
  })

  it("should insert the record into the store", async () => {
    const store = createStore(["Article"])
    await createOne(fakeDataSource, schemas, "Article", data)
    expect(store.Article.data).toEqual(keyResourcesById([expected]))
  })

  it("should notify subscribers", async () => {
    const store = createStore(["Article"])
    const subscriber = vi.fn()
    store.Article.subscribers.push(subscriber)
    await createOne(fakeDataSource, schemas, "Article", data)
    expect(subscriber).toHaveBeenCalledTimes(1)
  })

  it("should throw an error if the request fails", async () => {
    const errorDataSource = {
      ...fakeDataSource,
      createOne: () => Promise.reject(new Error("network error")),
    }
    await expect(
      createOne(errorDataSource, schemas, "Article", data),
    ).rejects.toThrowError("network error")
  })
})
