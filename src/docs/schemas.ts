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

export const GeneratedPassphraseSchema: SchemaObject & Partial<ReferenceObject> = {
  type: "object",
  properties: {
    passphrase: { type: "string" },
    message: { type: "string", nullable: true }
  },
  example: {
    generated: "eVyrC=S0!£4&TyY€6/y#|]I8I21!|9nk",
    message: "Length exceeds 4096, defaulting to 32."
  }
}

export const StatisticsSchema: SchemaObject & Partial<ReferenceObject> = {
  // totalCount: number
  //   averageLength: number
  //   uniquePlatforms: string[]
  //   uniquePlatformsCount: number
  //   uniquePassphrases: number
  //   mostAccessed: ListableDatabaseEntry[]
  //   commonByPlatform: Array<ListableDatabaseEntry[]>
  //   percentageOfCommon: number
  //   mostCommon: string
  //   strengths: Record<string, number>
  //   averageStrength: number
  //   weakPassphrases: ListableDatabaseEntry[]
  //   mediumPassphrases: ListableDatabaseEntry[]
  //   strongPassphrases: ListableDatabaseEntry[]

  type: "object",
  properties: {
    totalCount: { type: "number" },
    averageLength: { type: "number" },
    uniquePlatforms: { type: "array", items: { type: "string" } },
    uniquePlatformsCount: { type: "number" },
    uniquePassphrases: { type: "number" },
    mostAccessed: ReadWritableEntryArraySchema,
    commonByPlatform: { type: "array", items: ReadWritableEntryArraySchema },
    percentageOfCommon: { type: "number" },
    mostCommon: { type: "string" },
    strengths: { type: "object", additionalProperties: { type: "number" } },
    averageStrength: { type: "number" },
    weakPassphrases: ReadWritableEntryArraySchema,
    mediumPassphrases: ReadWritableEntryArraySchema,
    strongPassphrases: ReadWritableEntryArraySchema
  },
  example: {
    totalCount: 100,
    averageLength: 24,
    uniquePlatforms: ["Odysee", "YouTube"],
    uniquePlatformsCount: 48,
    uniquePassphrases: 97,
    mostAccessed: [{
      identity: "john@doe.net",
      created: "2024-08-08 23:08:08",
      updated: "2024-08-08 23:08:08",
      totalAccesses: 5,
      platform: "Odysee",
      id: "f31347c9-1ef5-4c80-a3ef-3fc5f22e8c33",
      url: "https://odysee.com"
    }],
    commonByPlatform: [[{
      identity: "john@doe.net",
      created: "2024-08-08 23:08:08",
      updated: "2024-08-08 23:08:08",
      totalAccesses: 5,
      platform: "Odysee",
      id: "f31347c9-1ef5-4c80-a3ef-3fc5f22e8c33",
      url: "https://odysee.com"
    }]],
    percentageOfCommon: 0.5,
    mostCommon: "************",
    strengths: { 0: 10, 1: 20, 2: 30, 3: 40, 4: 50, 5: 60, 6: 70, 7: 80, 8: 90, 9: 100 },
    averageStrength: 5,
    weakPassphrases: [{
      identity: "john@doe.net",
      created: "2024-08-08 23:08:08",
      updated: "2024-08-08 23:08:08",
      totalAccesses: 5,
      platform: "Odysee",
      id: "f31347c9-1ef5-4c80-a3ef-3fc5f22e8c33",
      url: "https://odysee.com"
    }],
    mediumPassphrases: [{
      identity: "john@doe.net",
      created: "2024-08-08 23:08:08",
      updated: "2024-08-08 23:08:08",
      totalAccesses: 5,
      platform: "Odysee",
      id: "f31347c9-1ef5-4c80-a3ef-3fc5f22e8c33",
      url: "https://odysee.com"
    }],
    strongPassphrases: [{
      identity: "john@doe.net",
      created: "2024-08-08 23:08:08",
      updated: "2024-08-08 23:08:08",
      totalAccesses: 5,
      platform: "Odysee",
      id: "f31347c9-1ef5-4c80-a3ef-3fc5f22e8c33",
      url: "https://odysee.com"
    }]
  }
}

export const DetectiveReportSchema: SchemaObject & Partial<ReferenceObject> = {
  type: "object",
  properties: {
    commonPassphrases: { type: "array", items: ReadWritableEntryArraySchema },
    similarWithUsername: ReadWritableEntryArraySchema,
    weakPassphrases: ReadWritableEntryArraySchema,
    oldPassphrases: ReadWritableEntryArraySchema
  },
  example: {
    commonPassphrases: [[{
      id: "f31347c9-1ef5-4c80-a3ef-3fc5f22e8c33",
      identity: "john@doe.net",
      created: "2024-08-08 23:08:08",
      updated: "2024-08-08 23:08:08",
      totalAccesses: 5,
      platform: "Odysee",
      url: "https://odysee.com"
    }]],
    similarWithUsername: [{
      id: "f31347c9-1ef5-4c80-a3ef-3fc5f22e8c33",
      identity: "john@doe.net",
      created: "2024-08-08 23:08:08",
      updated: "2024-08-08 23:08:08",
      totalAccesses: 5,
      platform: "Odysee",
      url: "https://odysee.com"
    }],
    weakPassphrases: [{
      id: "f31347c9-1ef5-4c80-a3ef-3fc5f22e8c33",
      identity: "john@doe.net",
      created: "2024-08-08 23:08:08",
      updated: "2024-08-08 23:08:08",
      totalAccesses: 5,
      platform: "Odysee",
      url: "https://odysee.com"
    }],
    oldPassphrases: [{
      id: "f31347c9-1ef5-4c80-a3ef-3fc5f22e8c33",
      identity: "john@doe.net",
      created: "2024-08-08 23:08:08",
      updated: "2024-08-08 23:08:08",
      totalAccesses: 5,
      platform: "Odysee",
      url: "https://odysee.com"
    }]
  }
}