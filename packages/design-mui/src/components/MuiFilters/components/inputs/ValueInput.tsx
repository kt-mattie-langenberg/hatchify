import { InputLabel } from "@mui/material"
import DateInput from "./DateInput"
import EnumInput from "./EnumInput"
import StringInput from "./StringInput"

const ValueInput: React.FC<{
  labelId: string
  fieldType: string
  value: any
  operator: string
  onChange: (value: string | string[]) => void
  options?: string[]
}> = ({ labelId, fieldType, value, operator, onChange, options = [] }) => {
  if (operator === "empty" || operator === "nempty") {
    return null
  }

  return (
    <>
      <InputLabel id={labelId}>Value</InputLabel>
      {fieldType === "string" && (
        <StringInput
          labelId={labelId}
          operator={operator}
          value={value}
          onChange={onChange}
        />
      )}
      {fieldType === "enum" && (
        <EnumInput
          labelId={labelId}
          operator={operator}
          value={value}
          onChange={onChange}
          options={options}
        />
      )}
      {fieldType === "date" && (
        <DateInput labelId={labelId} value={value} onChange={onChange} />
      )}
    </>
  )
}

export default ValueInput