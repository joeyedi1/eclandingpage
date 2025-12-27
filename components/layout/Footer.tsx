export const Footer = () => {
    return (
        <footer className="bg-black text-white py-12 border-t border-white/10">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <p className="font-serif font-bold text-lg mb-2">AURA EC</p>
                    <p className="text-sm text-slate-400 max-w-xs">
                        The information contained in this website is for reference only and does not constitute a legal contract.
                    </p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2 text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Aura EC Official.</p>
                    <p>CEA License: L3008020J | Agent: R0123456Z</p>
                    <p className="text-slate-400">Prices and availability subject to change without notice.</p>
                </div>
            </div>
        </footer>
    );
};
