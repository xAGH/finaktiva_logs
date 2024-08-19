export interface DeleteEventByIdPort {
  invoke(id: string): Promise<void>;
}
