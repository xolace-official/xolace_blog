import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: {
      name: 'Xolace Blog',
    },
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        subtitle: fields.text({
          label: 'Subtitle',
          description: 'A short one-line description beneath the title',
        }),
        publishedAt: fields.date({
          label: 'Published date',
          description: 'The date this post was published',
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Vocabulary', value: 'vocabulary' },
            { label: 'Founders', value: 'founders' },
            { label: 'Mirror Voice', value: 'mirror-voice' },
            { label: 'Territory', value: 'territory' },
            { label: 'People', value: 'people' },
          ],
          defaultValue: 'vocabulary',
        }),
        isPublished: fields.checkbox({
          label: 'Published',
          description: 'Uncheck to save as draft',
          defaultValue: false,
        }),
        readTimeMinutes: fields.integer({
          label: 'Read time (minutes)',
          validation: { isRequired: true, min: 1 },
          defaultValue: 5,
        }),
        isGuest: fields.checkbox({
          label: 'Guest post',
          description: 'Check if this is a guest or externally curated post',
          defaultValue: false,
        }),
        sourceUrl: fields.url({
          label: 'Source URL',
          description: 'Link to the original article if curated from an external source',
        }),
        authors: fields.array(
          fields.object({
            name: fields.text({
              label: 'Author name',
              validation: { isRequired: true },
            }),
            imageUrl: fields.url({
              label: 'Author image URL',
              description: 'URL of the author avatar image',
            }),
          }),
          {
            label: 'Authors',
            itemLabel: (props) => props.fields.name.value || 'New author',
          }
        ),
        imageUrl: fields.url({
          label: 'Cover image URL',
          description: 'URL for the hero/thumbnail image',
        }),
        content: fields.markdoc({
          label: 'Content',
        }),
      },
    }),
  },
});
