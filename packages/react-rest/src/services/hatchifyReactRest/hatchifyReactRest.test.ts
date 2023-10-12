import { describe, it, expect } from "vitest"
import type { Source, Schema } from "@hatchifyjs/rest-client"
import { hatchifyReactRest } from "./hatchifyReactRest"
import type { Schema as LegacySchema } from "@hatchifyjs/core"

const fakeDataSource: Source = {
  version: 0,
  findAll: () => Promise.resolve([[], {}]),
  findOne: () => Promise.resolve([]),
  createOne: () => Promise.resolve([]),
  updateOne: () => Promise.resolve([]),
  deleteOne: () => Promise.resolve(),
}

describe("react-rest/services/hatchifyReactRest", () => {
  it("should return functions for each schema", () => {
    const Article: LegacySchema = {
      name: "Article",
      attributes: {
        title: "string",
        body: "string",
      },
    }
    const Person: LegacySchema = {
      name: "Person",
      attributes: {
        name: "string",
        age: "integer",
      },
    }

    const api = hatchifyReactRest({ Article, Person }, fakeDataSource)

    expect(api).toEqual({
      Article: {
        createOne: expect.any(Function),
        deleteOne: expect.any(Function),
        findAll: expect.any(Function),
        findOne: expect.any(Function),
        updateOne: expect.any(Function),
        useCreateOne: expect.any(Function),
        useDeleteOne: expect.any(Function),
        useAll: expect.any(Function),
        useOne: expect.any(Function),
        useUpdateOne: expect.any(Function),
      },
      Person: {
        createOne: expect.any(Function),
        deleteOne: expect.any(Function),
        findAll: expect.any(Function),
        findOne: expect.any(Function),
        updateOne: expect.any(Function),
        useCreateOne: expect.any(Function),
        useDeleteOne: expect.any(Function),
        useAll: expect.any(Function),
        useOne: expect.any(Function),
        useUpdateOne: expect.any(Function),
      },
    })
  })

  it("should accept both legacy and new schema", () => {
    const Article: LegacySchema = {
      name: "Article",
      attributes: {
        title: "string",
        body: "string",
      },
    }

    const Person: Schema = {
      name: "Person",
      displayAttribute: "name",
      attributes: {
        name: "string",
        age: "integer",
      },
      relationships: {
        Article: {
          type: "many",
          schema: "yes",
        },
      },
    }

    const api = hatchifyReactRest({ Article, Person }, fakeDataSource)

    expect(api).toEqual({
      Article: {
        createOne: expect.any(Function),
        deleteOne: expect.any(Function),
        findAll: expect.any(Function),
        findOne: expect.any(Function),
        updateOne: expect.any(Function),
        useCreateOne: expect.any(Function),
        useDeleteOne: expect.any(Function),
        useAll: expect.any(Function),
        useOne: expect.any(Function),
        useUpdateOne: expect.any(Function),
      },
      Person: {
        createOne: expect.any(Function),
        deleteOne: expect.any(Function),
        findAll: expect.any(Function),
        findOne: expect.any(Function),
        updateOne: expect.any(Function),
        useCreateOne: expect.any(Function),
        useDeleteOne: expect.any(Function),
        useAll: expect.any(Function),
        useOne: expect.any(Function),
        useUpdateOne: expect.any(Function),
      },
    })
  })

  it("should accept schemas with namespaces", () => {
    const Feature_Article: LegacySchema = {
      name: "Article",
      namespace: "Feature",
      attributes: {
        title: "string",
        body: "string",
      },
    }

    const api = hatchifyReactRest({ Feature_Article }, fakeDataSource)

    expect(api).toEqual({
      Feature_Article: {
        createOne: expect.any(Function),
        deleteOne: expect.any(Function),
        findAll: expect.any(Function),
        findOne: expect.any(Function),
        updateOne: expect.any(Function),
        useCreateOne: expect.any(Function),
        useDeleteOne: expect.any(Function),
        useAll: expect.any(Function),
        useOne: expect.any(Function),
        useUpdateOne: expect.any(Function),
      },
    })
  })
})
