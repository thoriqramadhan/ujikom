

export default function Guest({ children }) {
    return (
        <div className="w-full h-[100vh] sm:flex sm:justify-center sm:items-center">
            <div className="h-[100vh] sm:max-w-md flex flex-col justify-center px-[30px] bg-white shadow-md sm:rounded-xl sm:h-[572px] sm:w-[500px] sm:relative sm:border">
                {children}
            </div>
        </div>
    );
}
