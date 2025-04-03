type Formatter = 'names' | 'mapName' | 'map'

const formatters: Record<Formatter, (field: string) => string> = {
  names: (field) => field,
  mapName: (field) => `@${field}`,
  map: (field) => `${field} = @${field}`,
}

const getSqlFields = ({
  format,
  fields,
}: {
  format: Formatter
  fields: Record<string, unknown>
}) => {
  const fieldsArray = Object.keys(fields)

  const sqlFields = fieldsArray.reduce<string[]>((acc, current) => {
    if (!(current in fields)) return acc

    const formattedField = formatters[format](current)

    return [...acc, formattedField]
  }, [])

  const flatFields = sqlFields.join(', ')

  return flatFields
}

export default getSqlFields
