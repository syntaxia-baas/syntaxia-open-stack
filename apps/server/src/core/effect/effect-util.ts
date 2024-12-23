import { pipe } from 'effect'
import { Effect, tryPromise, catchAll, fail } from 'effect/Effect'
import * as E from 'effect/Either'
import * as T from 'effect/Effect'
import { Errors, SyntaxiaError } from '../errors/errors'

// Converts a plain Promise into an Effect, wrapping potential errors in a custom SyntaxiaError
export const fromPromiseToEffect = <A>(
   promise: Promise<A>,
): Effect<A, SyntaxiaError, never> => {
   return pipe(
      tryPromise(() => promise), // Attempts to run the Promise
      catchAll(error => fail(Errors.UnhandledError(error))), // Catches any error and wraps it in SyntaxiaError
   )
}

// Converts a Promise factory into an Effect, allowing custom error handling
export const fromPromise = <A>(
   promise: () => Promise<A>,
   onError: (e: Error) => SyntaxiaError, // Function to map an error to SyntaxiaError
): Effect<A, SyntaxiaError, never> => {
   return pipe(
      tryPromise(() => promise()), // Executes the Promise
      catchAll(error => fail(onError(error))), // Handles errors using the provided onError function
   )
}

// Safely executes a synchronous function, returning an Either to represent success or failure
export const tryCatch = <A>(
   f: () => A, // Synchronous function to execute
   onError: (e: Error) => SyntaxiaError, // Function to map an error to SyntaxiaError
): E.Either<A, SyntaxiaError> => {
   try {
      return E.right(f()) // Right represents successful execution
   } catch (e) {
      return E.left(onError(e as Error)) // Left represents an error wrapped as SyntaxiaError
   }
}

// Converts an Effect into an Either, handling success and failure explicitly
// Unfortnatly, as you can see in the return type, Right is left and Left is right here. Thats how effect choose to implement it. :)
export const toEither = <A, E>(effect: Effect<A, E>): E.Either<A, E> => {
   return T.runSync(
      T.match(effect, {
         onFailure: (error: E) => E.left(error), // Maps failure to an Either.Left
         onSuccess: (value: A) => E.right(value), // Maps success to an Either.Right
      }),
   )
}
