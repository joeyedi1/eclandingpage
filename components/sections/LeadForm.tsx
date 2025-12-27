'use client';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';

export const LeadForm = () => {
    return (
        <Section className="py-24" id="register">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 bg-navy-800 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <div className="bg-navy-900 p-12 flex flex-col justify-center text-white">
                    <h3 className="text-3xl font-serif mb-6">Register Interest</h3>
                    <p className="text-slate-300 mb-8 leading-relaxed">
                        Get VVIP access to showflat, floor plans, and early bird discounts. No commission payable.
                    </p>
                    <ul className="space-y-4 text-sm text-slate-300">
                        <li className="flex gap-3">
                            <span className="text-gold-400">✓</span> Direct Developer Sales Team
                        </li>
                        <li className="flex gap-3">
                            <span className="text-gold-400">✓</span> E-Brochure & Floor Layouts
                        </li>
                        <li className="flex gap-3">
                            <span className="text-gold-400">✓</span> Latest Price List Updates
                        </li>
                    </ul>
                </div>

                <div className="p-12">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1 ml-4">Name</label>
                            <input
                                type="text"
                                className="w-full px-6 py-3 rounded-full border border-white/10 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10 outline-none transition bg-white/5 text-white placeholder:text-slate-500"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1 ml-4">Mobile Number</label>
                            <div className="flex">
                                <span className="bg-white/10 px-4 py-3 rounded-l-full border border-r-0 border-white/10 text-slate-300 font-medium pl-6">+65</span>
                                <input
                                    type="tel"
                                    className="w-full px-6 py-3 rounded-r-full border border-white/10 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10 outline-none transition bg-white/5 text-white placeholder:text-slate-500"
                                    placeholder="8123 4567"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1 ml-4">Email</label>
                            <input
                                type="email"
                                className="w-full px-6 py-3 rounded-full border border-white/10 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10 outline-none transition bg-white/5 text-white placeholder:text-slate-500"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1 ml-4">Preferred Unit</label>
                            <div className="relative">
                                <select className="w-full px-6 py-3 rounded-full border border-white/10 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10 outline-none transition appearance-none bg-white/5 text-white">
                                    <option className="bg-navy-900">3-Bedroom</option>
                                    <option className="bg-navy-900">4-Bedroom</option>
                                    <option className="bg-navy-900">5-Bedroom</option>
                                    <option className="bg-navy-900">Penthouse (Waitlist)</option>
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    ▼
                                </div>
                            </div>
                        </div>

                        <Button className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900 shadow-lg mt-4 font-bold text-lg">
                            Register Now
                        </Button>

                        <p className="text-xs text-center text-gray-400 mt-4">
                            We respect your privacy. No spam.
                        </p>
                    </form>
                </div>
            </div>
        </Section>
    );
};
