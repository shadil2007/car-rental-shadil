export default function Button() {
    return (
        <>
            <style>{`
                .button-wrapper::before {
                    animation: spin-gradient 4s linear infinite;
                }
            
                @keyframes spin-gradient {
                    from {
                        transform: rotate(0deg);
                    }
            
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
            <div className="relative inline-block p-0.5 rounded-full overflow-hidden hover:scale-105 transition duration-300 active:scale-100 before:content-[''] before:absolute before:inset-0 before:bg-[conic-gradient(from_0deg,#00F5FF,#00F5FF30,#00F5FF)] button-wrapper">
                <button className="relative z-10 cursor-pointer bg-gray-800 text-white rounded-full px-8 py-5 font-medium text-sm">Search </button>
            </div>
        </>
    );
};