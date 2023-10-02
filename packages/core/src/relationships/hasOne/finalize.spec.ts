import { finalize } from "./finalize"
import { integer, string, uuid } from "../../dataTypes"
import { HatchifyInvalidSchemaError } from "../../types"
import type { SemiFinalSchema } from "../../types"
import { uuidv4 } from "../../util/uuidv4"

describe("finalize", () => {
  const schemas: Record<string, SemiFinalSchema> = {
    Todo: {
      name: "Todo",
      id: uuid({ required: true, default: uuidv4 }).finalize(),
      attributes: {
        importance: integer({ min: 0 }).finalize(),
      },
    },
    User: {
      name: "User",
      id: uuid({ required: true, default: uuidv4 }).finalize(),
      attributes: {
        name: string().finalize(),
      },
    },
  }

  it("populates targetSchema and targetAttribute", () => {
    const { User } = finalize(
      "User",
      {
        type: "hasOne",
        targetSchema: null,
        targetAttribute: null,
        sourceAttribute: null,
      },
      "todo",
      schemas,
    )

    expect(User.relationships?.todo).toEqual({
      type: "hasOne",
      targetSchema: "Todo",
      targetAttribute: "userId",
      sourceAttribute: "id",
    })
  })

  it("keeps provided targetSchema and targetAttribute", () => {
    const { Todo, User } = finalize(
      "User",
      {
        type: "hasOne",
        targetSchema: "Todo",
        targetAttribute: "assigneeId",
        sourceAttribute: null,
      },
      "todo",
      schemas,
    )

    expect(Todo.attributes.assigneeId).toBeDefined()

    expect(User.relationships?.todo).toEqual({
      type: "hasOne",
      targetSchema: "Todo",
      targetAttribute: "assigneeId",
      sourceAttribute: "id",
    })
  })

  it("handles circular relationships", () => {
    const { User } = finalize(
      "User",
      {
        type: "hasOne",
        targetSchema: "User",
        targetAttribute: "managerId",
        sourceAttribute: null,
      },
      "manager",
      schemas,
    )

    expect(User.attributes.managerId).toBeDefined()

    expect(User.relationships?.manager).toEqual({
      type: "hasOne",
      targetSchema: "User",
      targetAttribute: "managerId",
      sourceAttribute: "id",
    })
  })

  it("handles non-existing targetSchema", () => {
    expect(() =>
      finalize(
        "User",
        {
          type: "hasOne",
          targetSchema: "Invalid",
          targetAttribute: null,
          sourceAttribute: null,
        },
        "todo",
        schemas,
      ),
    ).toThrow(new HatchifyInvalidSchemaError("Schema 'Invalid' is undefined"))
  })
})