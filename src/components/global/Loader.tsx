const Loader = () => (
    <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
            <div className="h-8 w-8 animate-spin text-black dark:text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
    </div>
);

export default Loader;
