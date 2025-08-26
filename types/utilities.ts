// Common TypeScript utilities for the Discipler app

// Component prop utilities
export type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

// Form utilities
export type FormField<T> = {
  value: T;
  error?: string;
  touched: boolean;
};

export type FormState<T> = {
  [K in keyof T]: FormField<T[K]>;
};

// Navigation utilities
export type NavigationParams<T> = T extends { [key: string]: any } ? T : never;

// API utilities
export type ApiResponse<T> = {
  data?: T;
  error?: string;
  loading: boolean;
};

export type ApiError = {
  message: string;
  code?: string;
  details?: any;
};

// Validation utilities
export type ValidationRule<T> = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: T) => string | undefined;
};

export type ValidationSchema<T> = {
  [K in keyof T]?: ValidationRule<T[K]>;
};

// State management utilities
export type Action<T> = {
  type: string;
  payload?: T;
};

export type Reducer<S, A> = (state: S, action: A) => S;

// Event utilities
export type EventHandler<T = any> = (event: T) => void;

export type AsyncEventHandler<T = any> = (event: T) => Promise<void>;

// Style utilities
export type StyleOverride<T> = Partial<T> | ((props: T) => Partial<T>);

// Conditional types
export type If<T extends boolean, A, B> = T extends true ? A : B;

export type NonNullable<T> = T extends null | undefined ? never : T;

// Array utilities
export type ArrayElement<T> = T extends Array<infer U> ? U : never;

// Object utilities
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

// String utilities
export type StringLiteral<T> = T extends string ? T : never;

export type Capitalize<S extends string> = S extends `${infer F}${infer R}`
  ? `${Uppercase<F>}${R}`
  : S;

// Number utilities
export type NumberRange<F extends number, T extends number> = Exclude<
  number,
  Exclude<number, F> | Exclude<number, T>
>;

// Union utilities
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

// Tuple utilities
export type TupleToUnion<T extends readonly any[]> = T[number];

// Promise utilities
export type PromiseType<T> = T extends Promise<infer U> ? U : T;

export type AsyncReturnType<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : T extends (...args: any[]) => infer R
  ? R
  : any;

// Component utilities
export type ComponentType<P = {}> = React.ComponentType<P>;

export type FC<P = {}> = React.FC<P>;

export type ReactNode = React.ReactNode;

export type ReactElement = React.ReactElement;

// Hook utilities
export type HookReturn<T> = T extends (...args: any[]) => infer R ? R : never;

// Store utilities
export type StoreState<T> = T extends { getState: () => infer S } ? S : never;

export type StoreAction<T> = T extends { dispatch: (action: infer A) => any } ? A : never;
