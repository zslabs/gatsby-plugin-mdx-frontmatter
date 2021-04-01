exports.createSchemaCustomization = ({
  actions: { createFieldExtension },
  createContentDigest,
}) => {
  createFieldExtension({
    name: 'mdx',
    extend() {
      return {
        type: 'String',
        resolve(source, args, context, info) {
          // Grab field
          const value = source[info.fieldName]
          if (typeof value === 'undefined') {
            return null;
          }
          // Isolate MDX
          const mdxType = info.schema.getType('Mdx')
          // Grab just the body contents of what MDX generates
          const { resolve } = mdxType.getFields().body

          return resolve(
            {
              rawBody: value,
              internal: {
                contentDigest: createContentDigest(value), // Used for caching
              },
            },
            args,
            context,
            info
          )
        },
      }
    },
  })
}
