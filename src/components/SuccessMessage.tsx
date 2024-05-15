function SuccessMessage({ successMessage }: { successMessage: string }) {
    return (
        successMessage.length > 0 && (
            <div className="animate-fadeOut bg-inherit">
                <div className="mx-auto -mt-3 h-12 w-12 translate-y-2/4 rounded-full border border-green-500 bg-inherit pt-1 text-center text-4xl text-green-500 shadow-lg">
                    ✓
                </div>
                <div className="mb-2 mt-2 h-fit rounded-md border border-success-green bg-success-green p-4 text-center shadow-lg">
                    {successMessage}
                </div>
            </div>
        )
    );
}

export default SuccessMessage;
