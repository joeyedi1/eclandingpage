export const Footer = () => {
    return (
        <footer className="bg-vintage-coin-400 text-southern-sand-200 py-12 border-t border-southern-sand-200/10">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <p className="font-serif font-bold text-lg mb-2 text-white">RIVER MODERN</p>
                    <p className="text-sm text-southern-sand-200/80 max-w-xs">
                        The information contained in this website is for reference only and does not constitute a legal contract.
                    </p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2 text-xs text-southern-sand-200/60">
                    <p>&copy; {new Date().getFullYear()} RIVER MODERN Official.</p>
                    <p className="text-southern-sand-200/80">Prices and availability subject to change without notice.</p>
                </div>
            </div>
        </footer>
    );
};
