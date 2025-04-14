import type { PartialJsonControlType } from "./types.js"

export function finalizeControl<TRequired extends boolean>(
  props: Omit<PartialJsonControlType<TRequired>, "allowNullInfer">,
): Required<Omit<PartialJsonControlType<TRequired>, "allowNullInfer">> {
  // @ts-expect-error @todo HATCH-417
  delete props.allowNullInfer
  return {
    ...props,
    allowNull: props.allowNull !== false && !props.primary,
    primary: !!props.primary,
    default: props.default ?? null,
    readOnly: props.readOnly ?? false,
    xssExempt: props.xssExempt ?? false,
    ui: {
      displayName: props.ui?.displayName ?? null,
      hidden: props.ui?.hidden ?? false,
    },
  }
}
