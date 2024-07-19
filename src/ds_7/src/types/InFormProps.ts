export interface InFormProps<T extends Record<string, any> = Record<string, any>> {
  patchState: (patch: Partial<T>) => void;
}