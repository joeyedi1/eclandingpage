'use client';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';

export const LeadForm = () => {
    return (
        <Section className="py-24" id="register">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 bg-white rounded-3xl overflow-hidden shadow-2xl">
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none transition"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                            <div className="flex">
                                <span className="bg-gray-100 px-3 py-3 rounded-l-lg border border-r-0 border-gray-200 text-gray-500 font-medium">+65</span>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-3 rounded-r-lg border border-gray-200 focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none transition"
                                    placeholder="8123 4567"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none transition"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Unit</label>
                            <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none transition appearance-none bg-white">
                                <option>3-Bedroom</option>
                                <option>4-Bedroom</option>
                                <option>5-Bedroom</option>
                                <option>Penthouse (Waitlist)</option>
                            </select>
                        </div>

                        <Button className="w-full bg-navy-900 hover:bg-navy-800 text-white shadow-lg mt-4">
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
