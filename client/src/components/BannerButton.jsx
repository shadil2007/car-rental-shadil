export default function BannerButton() {
    return (
        <div className="relative group overflow-hidden hidden md:block bg-white/20 p-0.5 h-9 w-fit rounded-md active:scale-100 hover:scale-105 transition-all duration-300">
            <button className="text-white text-sm bg-linear-to-t px-7 from-black/50 to-black h-full w-full rounded">
                List your car
            </button>
            <div className="absolute -bottom-12 group-hover:-bottom-10 transition-all duration-200 left-1/2 -z-10 -translate-x-1/2 blur size-14 rounded-full bg-white"></div>
        </div>
    );
};