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

export type UserId = Branded<string, 'UserId'>

export type SessionId = Branded<string, 'SessionId'>
export type AccountId = Branded<string, 'AccountId'>
export type VerificationTokenId = Branded<string, 'VerificationTokenId'>
export type UserName = Branded<string, 'UserName'>
export type Name = Branded<string, 'Name'>
export type Email = Branded<string, 'Email'>
export type Description = Branded<string, 'Description'>
export type NodeId = Branded<string, 'NodeId'>
export type EdgeId = Branded<string, 'EdgeId'>

export interface AuditInfo {
   disable: boolean
   createdAt: Date
   createdBy: UserName | null
   updatedAt: Date
   updatedBy: UserName | null
}

export interface BaseRow<ID extends Branded<unknown>> extends AuditInfo {
   id: ID
}

export type UserProfile = BaseRow<UserId> & {
   userName: UserName
   name: Name
   email: Email
   password: string
}

export const createBasicInfo = (userName: UserName): AuditInfo => {
   const auditInfo: AuditInfo = {
      disable: false,
      createdAt: new Date(),
      createdBy: userName,
      updatedAt: new Date(),
      updatedBy: userName,
   }
   return auditInfo
}
export const updateAuditInfo = (
   auditInfo: AuditInfo,
   userName: UserName,
): AuditInfo => ({
   ...auditInfo,
   updatedAt: new Date(),
   updatedBy: userName,
})
