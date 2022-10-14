export function yupRules(r) {
  return (v) => {
    try {
      r.validateSync(v)
      return true
    } catch (err) {
      return err.errors[0]
    }
  }
}
