import { none, Option, some } from 'effect/Option'

// Implementation of optionToUndefined
export const optionToUndefined = <T>(option: Option<T>): T | undefined => {
   return option._tag === 'Some' ? option.value : undefined
}

// Implementation of undefinedToOption
export const undefinedToOption = <T>(
   value: T | undefined | null,
): Option<T> => {
   return value !== undefined && value !== null ? some(value) : none()
}
