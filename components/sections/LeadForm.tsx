'use client';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';

export const LeadForm = () => {
    return (
        <Section className="py-24 bg-southern-sand-200" id="register">
            <div className="max-w-5xl mx-auto grid md:grid-cols-[2fr_3fr] gap-0 bg-white rounded-3xl overflow-hidden shadow-2xl border border-vintage-coin-400/10">
                <div className="bg-vintage-coin-400 p-12 flex flex-col justify-center text-white">
                    <h3 className="text-3xl font-serif mb-6">Register Interest</h3>
                    <p className="text-southern-sand-200 mb-8 leading-relaxed">
                        Get VVIP access to showflat, floor plans, and early bird discounts. No commission payable.
                    </p>
                    <ul className="space-y-4 text-sm text-southern-sand-200">
                        <li className="flex gap-3">
                            <span className="text-white">✓</span> Direct Developer Sales Team
                        </li>
                        <li className="flex gap-3">
                            <span className="text-white">✓</span> E-Brochure & Floor Layouts
                        </li>
                        <li className="flex gap-3">
                            <span className="text-white">✓</span> Latest Price List Updates
                        </li>
                    </ul>
                </div>

                <div className="p-12 bg-white">
                    <form className="space-y-5">
                        {/* Name and Email - Side by Side */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-vintage-coin-400 mb-1 ml-4">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-5 py-3 rounded-full border border-vintage-coin-400/20 focus:border-vintage-coin-400 focus:ring-4 focus:ring-vintage-coin-400/10 outline-none transition bg-southern-sand-200/20 text-vintage-coin-400 placeholder:text-taupe-400"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-vintage-coin-400 mb-1 ml-4">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-5 py-3 rounded-full border border-vintage-coin-400/20 focus:border-vintage-coin-400 focus:ring-4 focus:ring-vintage-coin-400/10 outline-none transition bg-southern-sand-200/20 text-vintage-coin-400 placeholder:text-taupe-400"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        {/* Mobile Number */}
                        <div>
                            <label className="block text-sm font-medium text-vintage-coin-400 mb-1 ml-4">Mobile Number</label>
                            <div className="flex">
                                <span className="bg-southern-sand-200/40 px-4 py-3 rounded-l-full border border-r-0 border-vintage-coin-400/20 text-vintage-coin-400 font-medium pl-5">+65</span>
                                <input
                                    type="tel"
                                    className="w-full px-5 py-3 rounded-r-full border border-vintage-coin-400/20 focus:border-vintage-coin-400 focus:ring-4 focus:ring-vintage-coin-400/10 outline-none transition bg-southern-sand-200/20 text-vintage-coin-400 placeholder:text-taupe-400"
                                    placeholder="8123 4567"
                                    aria-label="Mobile Number"
                                />
                            </div>
                        </div>

                        {/* Preferred Unit and Request - Side by Side */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-vintage-coin-400 mb-1 ml-4">Preferred Unit</label>
                                <div className="relative">
                                    <select className="w-full px-5 py-3 rounded-full border border-vintage-coin-400/20 focus:border-vintage-coin-400 focus:ring-4 focus:ring-vintage-coin-400/10 outline-none transition appearance-none bg-southern-sand-200/20 text-vintage-coin-400">
                                        <option className="bg-white">3-Bedroom</option>
                                        <option className="bg-white">4-Bedroom</option>
                                        <option className="bg-white">5-Bedroom</option>
                                        <option className="bg-white">Penthouse</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-taupe-400">
                                        ▼
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-vintage-coin-400 mb-1 ml-4">Would Like To Request</label>
                                <div className="relative">
                                    <select className="w-full px-5 py-3 rounded-full border border-vintage-coin-400/20 focus:border-vintage-coin-400 focus:ring-4 focus:ring-vintage-coin-400/10 outline-none transition appearance-none bg-southern-sand-200/20 text-vintage-coin-400">
                                        <option className="bg-white" value="">Select Request</option>
                                        <option className="bg-white" value="showflat">Showflat Viewing</option>
                                        <option className="bg-white" value="brochure">E-Brochure</option>
                                        <option className="bg-white" value="pricelist">Price Lists</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-taupe-400">
                                        ▼
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Consent Checkboxes */}
                        <div className="space-y-3 pt-2">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="mt-1 w-4 h-4 rounded border-vintage-coin-400/30 text-vintage-coin-400 focus:ring-vintage-coin-400/20"
                                />
                                <span className="text-xs text-vintage-coin-400/70 leading-relaxed">
                                    I agree to be contacted by River Modern sales team and associates.
                                </span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="mt-1 w-4 h-4 rounded border-vintage-coin-400/30 text-vintage-coin-400 focus:ring-vintage-coin-400/20"
                                />
                                <span className="text-xs text-vintage-coin-400/70 leading-relaxed">
                                    I would like to receive updates via Call/SMS/Email/Whatsapp.
                                </span>
                            </label>
                        </div>

                        <Button className="w-full bg-vintage-coin-400 hover:bg-taupe-400 text-white shadow-lg mt-2 font-bold text-lg">
                            Register Now
                        </Button>

                        <p className="text-xs text-center text-taupe-400">
                            We respect your privacy. No spam.
                        </p>
                    </form>
                </div>
            </div>

        </Section>
    );
};