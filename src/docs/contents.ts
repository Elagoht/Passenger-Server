import { ContentObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const ExportedCSVContent: ContentObject = {
  "text/csv": {
    schema: {
      type: "string",
      example: "name,url,username,password,note\n..."
    }
  }
}

export const ExportTypeErrorContent: ContentObject = {
  "application/json": {
    schema: { example: { message: "Export type not supported" } }
  }
}