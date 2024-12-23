/**
 * A type that represents a branded type, which is a type that has an additional
 * phantom type to distinguish it from other types with the same structure.
 * 
 * @template K - The base type to be branded. Defaults to `string`.
 * @template T - The phantom type used to brand the base type. Defaults to `unknown`.
 */
export type Branded<K = string, T = unknown> = K & { __brand: T }

/**
 * A branded type representing a user's name.
 */
export type UserName = Branded<string, 'UserName'>


export interface BaseRow<ID extends Branded<unknown>> {
    id: ID
    disable: boolean
    createdAt: Date
    createdBy: UserName | null
    updatedAt: Date
    updatedBy: UserName | null
  }
  