export type Severity =
  | 'ERROR'
  | 'DEBUG'
  | 'WARNING'
  | 'SECURITY'
  | 'INFORMATION';

export type SeverityColor = {
  [key in Severity]: string;
};

export const SeverityColors: SeverityColor = {
  ERROR: '#f87171',
  DEBUG: '#878787',
  WARNING: '#e0cf6c',
  SECURITY: '#2ec986',
  INFORMATION: '#3a78d6',
};
