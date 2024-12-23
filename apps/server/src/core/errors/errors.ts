import { HttpStatus } from '@nestjs/common'

// Extend SyntaxiaErrorBase to include HTTP status and optional additional fields
export type SyntaxiaErrorBase<T extends string, Extra = object> = Error & {
   _tag: T // Tag identifying the error type
   message: string // Error message
   code: string // Error code for categorization
   status: number // HTTP status code
} & Extra // Extra fields specific to the error type

// Union type for all SyntaxiaError variants
export type SyntaxiaError =
   | SyntaxiaErrorBase<'DBError', { underlying?: Error }> // Database-related issues
   | SyntaxiaErrorBase<'ValidationError', { field?: string }> // Validation failures
   | SyntaxiaErrorBase<'AuthError', { reason?: string }> // Authentication issues
   | SyntaxiaErrorBase<'UnhandledError', { error: Error }> // Generic fallback error
   | SyntaxiaErrorBase<'RowNotFoundError', object> // Missing resource
   | SyntaxiaErrorBase<'RateLimitError', { retryAfter?: number }> // Rate limit exceeded
   | SyntaxiaErrorBase<'ConflictError', { conflictingField?: string }> // Resource conflict
   | SyntaxiaErrorBase<'ForbiddenError', { reason?: string }> // Forbidden action
   | SyntaxiaErrorBase<'ServiceUnavailableError', { serviceName?: string }> // External service issues

// Factory function to create a SyntaxiaErrorBase of a specific type
export const createError = <T extends string, Extra>(
   _tag: T,
   code: string,
   message: string,
   status: number, // HTTP status code
   extra?: Extra,
): SyntaxiaErrorBase<T, Extra> => ({
   _tag,
   code,
   message,
   name: _tag,
   status,
   ...extra,
})

// Predefined error creation functions for common error scenarios
export const Errors = {
   DBError: (message: string, underlying?: Error): SyntaxiaError =>
      createError(
         'DBError',
         'DB_ERROR',
         message,
         HttpStatus.INTERNAL_SERVER_ERROR,
         { underlying },
      ),

   ValidationError: (message: string, field?: string): SyntaxiaError =>
      createError(
         'ValidationError',
         'VALIDATION_ERROR',
         message,
         HttpStatus.BAD_REQUEST,
         { field },
      ),

   AuthError: (message: string, reason?: string): SyntaxiaError =>
      createError('AuthError', 'AUTH_ERROR', message, HttpStatus.UNAUTHORIZED, {
         reason,
      }),

   UnhandledError: (error: Error): SyntaxiaError =>
      createError(
         'UnhandledError',
         'UNHANDLED_ERROR',
         error.message,
         HttpStatus.INTERNAL_SERVER_ERROR,
         { error },
      ),

   RowNotFoundError: (message: string): SyntaxiaError =>
      createError(
         'RowNotFoundError',
         'ROW_NOT_FOUND_ERROR',
         message,
         HttpStatus.NOT_FOUND,
      ),

   RateLimitError: (message: string, retryAfter?: number): SyntaxiaError =>
      createError(
         'RateLimitError',
         'RATE_LIMIT_ERROR',
         message,
         HttpStatus.TOO_MANY_REQUESTS,
         { retryAfter },
      ),

   ConflictError: (message: string, conflictingField?: string): SyntaxiaError =>
      createError(
         'ConflictError',
         'CONFLICT_ERROR',
         message,
         HttpStatus.CONFLICT,
         { conflictingField },
      ),

   ForbiddenError: (message: string, reason?: string): SyntaxiaError =>
      createError(
         'ForbiddenError',
         'FORBIDDEN_ERROR',
         message,
         HttpStatus.FORBIDDEN,
         { reason },
      ),

   ServiceUnavailableError: (
      message: string,
      serviceName?: string,
   ): SyntaxiaError =>
      createError(
         'ServiceUnavailableError',
         'SERVICE_UNAVAILABLE_ERROR',
         message,
         HttpStatus.SERVICE_UNAVAILABLE,
         { serviceName },
      ),
}
