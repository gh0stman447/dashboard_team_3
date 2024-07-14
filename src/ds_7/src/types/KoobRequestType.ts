import { IKoobDataRequest3 } from 'bi-internal/services/koob';

export interface KoobRequestType {
  cube: string;
  dimensions: string[];
  measures: string[];
  filters?: Record<string, [string, string | number]>;
  options?: IKoobDataRequest3;
  requestId: string;
}
