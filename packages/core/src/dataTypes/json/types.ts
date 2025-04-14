import type {
  PartialControlType,
  PartialDataTypeProps,
  PartialSequelizeDataType,
} from "../../types/index.js"

export type JsonControlType<TRequired extends boolean> = {
  type: "json"
  allowNull: TRequired extends true ? false : boolean
  allowNullInfer: TRequired extends true ? false : boolean
  primary: boolean
  default: Record<string, any> | null
  readOnly: boolean
  xssExempt: boolean
  ui: {
    displayName: string | null
    hidden: boolean
  }
}

export type PartialJsonProps<TRequired extends boolean> = PartialDataTypeProps<
  Record<string, any>,
  TRequired
>

export interface PartialJsonControlType<TRequired extends boolean>
  extends PartialControlType<Record<string, any>, TRequired> {
  type: "json"
}

export interface PartialJsonORM {
  sequelize: PartialSequelizeDataType<undefined, Record<string, any>>
}

export interface FinalJsonORM {
  sequelize: Required<PartialSequelizeDataType<undefined, Record<string, any>>>
}
