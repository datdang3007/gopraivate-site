
export interface StaticContentRequest {
  slug: string;
  language: string;
  project_id: string;
  ip: string;
}

export interface StaticContentResponse {
  success: boolean;
  message: string;
  variables: {
    slug: string;
    version: string;
    title: string;
    body_md: string;
    language: string;
  };
  agents: Record<string, any>;
  misc: string;
  statuscode: number;
  JSONraw: string;
  JSONraw2: string;
  JSONrawagents: string;
  imageBytes: any;
  HTML: any;
}
