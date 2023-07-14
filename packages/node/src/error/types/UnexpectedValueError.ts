import { HatchifyError } from "./HatchifyError"
import { codes, statusCodes } from "../constants"

export class UnexpectedValueError extends HatchifyError {
  constructor({
    title,
    detail,
    parameter,
    pointer,
  }: {
    title?: string
    detail?: string
    parameter?: string
    pointer?: string
  }) {
    super({
      status: statusCodes.UNPROCESSABLE_ENTITY,
      code: codes.ERR_UNEXPECTED_VALUE,
      title: title || "Unexpected value.",
      detail,
      parameter,
      pointer,
    })
  }
}