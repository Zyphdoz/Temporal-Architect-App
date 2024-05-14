function ErrorMessage({ errorMessage }: { errorMessage: string }) {
    return (
        errorMessage.length > 0 && (
            <>
                <div className="mx-auto -mt-3 h-12 w-12 translate-y-2/4 rounded-full border border-red-500 bg-inherit text-center text-5xl text-red-500 shadow-lg">
                    !
                </div>
                <div className="bg-error-pink border-error-pink mb-2 mt-2 h-fit rounded-md border p-4 text-center shadow-lg">
                    {errorMessage}
                </div>
            </>
        )
    );
}

export default ErrorMessage;
