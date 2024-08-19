export class ResponseType {
  status: boolean;
  data: any;
  message: string | null;

  constructor(status?: boolean, data?: any, message?: string) {
    this.status = status ?? true;
    this.data = data ?? null;
    this.message = message ?? null;
  }
}
