

export default function Guest({ children }) {
    return (
        <div className="w-full h-[100vh] sm:bg-sky-500 sm:flex">
            <div className="w-[200px] h-[200px] bg-red-100 hidden sm:block">

            </div>
            <div className="h-[100vh] sm:max-w-md flex flex-col justify-center px-[30px] bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
