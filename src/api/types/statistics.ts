export interface StatisticsRequest {
  user_id: string;
  project_id: string;
  ip: string;
}

export interface StatisticsResponse {
  success: boolean;
  message: string;
  variables?: Record<string, any>;
  statuscode: number;
  [key: string]: any;
}
