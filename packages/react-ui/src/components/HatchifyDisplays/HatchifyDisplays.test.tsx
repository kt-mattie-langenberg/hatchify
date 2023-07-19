import { describe, it, vi } from "vitest"
import { render } from "@testing-library/react"
import {
  HatchifyExtraColumn,
  HatchifyColumn,
  HatchifyAttributeField,
  HatchifyEmptyList,
} from "./HatchifyDisplays"

describe("hatchifyjs/components/HatchifyColumns", () => {
  describe("HatchifyExtraColumn", () => {
    it("works", () => {
      render(<HatchifyExtraColumn label="Label" render={() => <div />} />)
    })
  })

  describe("HatchifyColumn", () => {
    it("works", () => {
      render(<HatchifyColumn attribute="field" />)
    })
  })

  describe("HatchifyAttributeField", () => {
    it("works", () => {
      render(<HatchifyAttributeField attribute="field" render={vi.fn()} />)
    })
  })

  describe("HatchifyEmptyList", () => {
    it("works", () => {
      render(<HatchifyEmptyList>So empty inside</HatchifyEmptyList>)
    })
  })
})
