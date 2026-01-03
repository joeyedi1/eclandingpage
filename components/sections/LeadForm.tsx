'use client';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';

export const LeadForm = () => {
    return (
        <Section className="py-24 bg-southern-sand-200" id="register">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 bg-white rounded-3xl overflow-hidden shadow-2xl border border-vintage-coin-400/10">
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
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-vintage-coin-400 mb-1 ml-4">Name</label>
                            <input
                                type="text"
                                className="w-full px-6 py-3 rounded-full border border-vintage-coin-400/20 focus:border-vintage-coin-400 focus:ring-4 focus:ring-vintage-coin-400/10 outline-none transition bg-southern-sand-200/20 text-vintage-coin-400 placeholder:text-taupe-400"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-vintage-coin-400 mb-1 ml-4">Mobile Number</label>
                            <div className="flex">
                                <span className="bg-southern-sand-200/40 px-4 py-3 rounded-l-full border border-r-0 border-vintage-coin-400/20 text-vintage-coin-400 font-medium pl-6">+65</span>
                                <input
                                    type="tel"
                                    className="w-full px-6 py-3 rounded-r-full border border-vintage-coin-400/20 focus:border-vintage-coin-400 focus:ring-4 focus:ring-vintage-coin-400/10 outline-none transition bg-southern-sand-200/20 text-vintage-coin-400 placeholder:text-taupe-400"
                                    placeholder="8123 4567"
                                    aria-label="Mobile Number"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-vintage-coin-400 mb-1 ml-4">Email</label>
                            <input
                                type="email"
                                className="w-full px-6 py-3 rounded-full border border-vintage-coin-400/20 focus:border-vintage-coin-400 focus:ring-4 focus:ring-vintage-coin-400/10 outline-none transition bg-southern-sand-200/20 text-vintage-coin-400 placeholder:text-taupe-400"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-vintage-coin-400 mb-1 ml-4">Preferred Unit</label>
                            <div className="relative">
                                <select className="w-full px-6 py-3 rounded-full border border-vintage-coin-400/20 focus:border-vintage-coin-400 focus:ring-4 focus:ring-vintage-coin-400/10 outline-none transition appearance-none bg-southern-sand-200/20 text-vintage-coin-400">
                                    <option className="bg-white">3-Bedroom</option>
                                    <option className="bg-white">4-Bedroom</option>
                                    <option className="bg-white">5-Bedroom</option>
                                    <option className="bg-white">Penthouse (Waitlist)</option>
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-taupe-400">
                                    ▼
                                </div>
                            </div>
                        </div>

                        <Button className="w-full bg-vintage-coin-400 hover:bg-taupe-400 text-white shadow-lg mt-4 font-bold text-lg">
                            Register Now
                        </Button>

                        <p className="text-xs text-center text-taupe-400 mt-4">
                            We respect your privacy. No spam.
                        </p>
                    </form>
                </div>
            </div>

        </Section>
    );
};
