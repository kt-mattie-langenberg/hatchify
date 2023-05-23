import { useState } from "react"
import { createOne, getMeta } from "@hatchifyjs/data-core"
import type {
  CreateData,
  Meta,
  MetaError,
  Record,
  Schema,
  Source,
} from "@hatchifyjs/data-core"

/**
 * Returns a function that creates a new record using the data-core createOne,
 * @todo metadata, and the last created record.
 */
export const useCreateOne = (
  dataSource: Source,
  schema: Schema,
): [(data: CreateData) => void, Meta, Record?] => {
  const [data, setData] = useState<Record | undefined>(undefined)
  const [error, setError] = useState<MetaError | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  function create(data: CreateData) {
    setLoading(true)
    createOne(dataSource, schema, data)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }

  const meta = getMeta(error, loading, false, undefined)
  return [create, meta, data]
}
