import { ReferenceObject, SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

const generateMessageSchema = (message: string) => ({
  type: "object",
  properties: { message: { type: "string" } },
  example: { message }
})

export default generateMessageSchema

export const LoginResponseSchema: SchemaObject & Partial<ReferenceObject> = {
  type: "object",
  properties: { accessToken: { type: "string" } },
  example: { accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkJlYXJlciJ9...' }
}

export const ReadWritableEntrySchema: SchemaObject & Partial<ReferenceObject> = {
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

export const ReadWritableEntryArraySchema: SchemaObject & Partial<ReferenceObject> = {
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
  example: [{
    identity: "john@doe.net",
    created: "2024-08-08 23:08:08",
    updated: "2024-08-08 23:08:08",
    totalAccesses: 0,
    platform: "Odysee",
    id: "f31347c9-1ef5-4c80-a3ef-3fc5f22e8c33",
    url: "https://odysee.com"
  }]
}

export const DatabaseEntrySchema: SchemaObject & Partial<ReferenceObject> = {
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
    passphraseHistory: [{
      strength: 1,
      length: 10,
      created: "2024-08-08 23:08:08"
    }],
    passphrase: "123johndoe",
    notes: "A video sharing platform",
    identity: "john@doe.net",
    created: "2024-08-08 23:08:08",
    updated: "2024-08-08 23:16:16",
    totalAccesses: 1,
    platform: "Odysee",
    id: "f31347c9-1ef5-4c80-a3ef-3fc5f22e8c33",
    url: "https://odysee.com"
  }
}

export const ProduceImportErrorResultSchema: SchemaObject & Partial<ReferenceObject> = {
  type: "object",
  properties: {
    acceptables: { type: "string" },
    notAcceptables: { type: "string" }
  },
  example: {
    acceptables: "name,url,username,password,note\n...",
    notAcceptables: "Skipped entries:\nname,url,username,password,note\nname,url,username,password,note\n...\nOther entries are acceptable.\n"
  }
}