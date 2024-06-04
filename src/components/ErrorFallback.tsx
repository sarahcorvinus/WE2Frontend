import { ErrorFromValidation, ErrorWithHTML } from "../backend/fetchWithErrorHandling";

export function ErrorFallback({ error }:
    { error: Error }) {
    if (error instanceof ErrorFromValidation) {
        // Handle Validation Error
        return (
            <div>
                <h2>Validation Error</h2>
                {/* Display validation error details */}
                <pre>{JSON.stringify(error.validationErrors, null, 2)}</pre>
            </div>
        );
    } else if (error instanceof ErrorWithHTML) {
        // Handle HTML Error
        return (
            <div>
                <h2>HTML Error</h2>
                {/* Display HTML error details */}
                {error.div}
            </div>
        );
    } else {
        // Default error handling
        return (
            <div>
                <h2>Error</h2>
                {/* Display other errors */}
                <p>{error.message}</p>
            </div>
        );
    }
};
