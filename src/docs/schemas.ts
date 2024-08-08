export const ReadWritableEntrySchema = {
  type: "object",
  properties: {
    identity: { type: "string" },
    created: { type: "string" },
    updated: { type: "string" },
    totalAccesses: { type: "number" },
    platform: { type: "string" },
    id: { type: "string" },
    url: { type: "string" }
  },
  example: {
    identity: "john@doe.net",
    created: "2024-08-08 23:08:08",
    updated: "2024-08-08 23:08:08",
    totalAccesses: 0,
    platform: "Odysee",
    id: "f31347c9-1ef5-4c80-a3ef-3fc5f22e8c33",
    url: "https://odysee.com"
  }
}

export const ReadWritableEntryArraySchema = {
  type: "array",
  properties: {
    identity: { type: "string" },
    created: { type: "string" },
    updated: { type: "string" },
    totalAccesses: { type: "number" },
    platform: { type: "string" },
    id: { type: "string" },
    url: { type: "string" }
  },
  example: [
    {
      identity: "john@doe.net",
      created: "2024-08-08 23:08:08",
      updated: "2024-08-08 23:08:08",
      totalAccesses: 0,
      platform: "Odysee",
      id: "f31347c9-1ef5-4c80-a3ef-3fc5f22e8c33",
      url: "https://odysee.com"
    }
  ]
}

export const DatabaseEntrySchema = {
  type: "object",
  properties: {
    passphraseHistory: {
      type: "array",
      items: {
        type: "object",
        properties: {
          strength: { type: "number" },
          length: { type: "number" },
          created: { type: "string" }
        }
      }
    },
    passphrase: { type: "string" },
    notes: { type: "string" },
    identity: { type: "string" },
    created: { type: "string" },
    updated: { type: "string" },
    totalAccesses: { type: "number" },
    platform: { type: "string" },
    id: { type: "string" },
    url: { type: "string" }
  },
  example: {
    passphraseHistory: [
      {
        strength: 1,
        length: 10,
        created: "2024-08-08 23:07:17"
      }
    ],
    passphrase: "123johndoe",
    notes: "A video sharing platform",
    identity: "john@doe.net",
    created: "2024-08-08 23:07:17",
    updated: "2024-08-08 23:16:13",
    totalAccesses: 1,
    platform: "Odysee",
    id: "f31347c9-1ef5-4c80-a3ef-3fc5f22e8c33",
    url: "https://odysee.com"
  }
}