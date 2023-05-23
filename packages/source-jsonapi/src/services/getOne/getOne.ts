import type {
  Schema,
  SourceConfig,
  QueryOne,
  Resource,
} from "@hatchifyjs/data-core"
import { convertToRecords, fetchJsonApi } from "../jsonapi"

/**
 * Fetches a single resource, adds the __schema to the request response,
 * and returns it.
 */
export async function getOne(
  config: SourceConfig,
  schema: Schema,
  query: QueryOne,
): Promise<Resource[]> {
  const json = await fetchJsonApi("GET", `${config.url}/${query.id}`)
  // todo relationships: json.included

  return Promise.resolve(convertToRecords(json.data, schema.name))
}
