"use client";

import { useState, useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { MessageCircle, Calculator } from "lucide-react";
import { motion } from "framer-motion";

export const LoanCalculator = () => {
    const [loanAmount, setLoanAmount] = useState(1500000);
    const [tenure, setTenure] = useState(30);
    const [interestRate, setInterestRate] = useState(3.5);
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    useEffect(() => {
        // M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
        const principal = loanAmount;
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = tenure * 12;

        if (monthlyRate === 0) {
            setMonthlyPayment(principal / numberOfPayments);
        } else {
            const payment =
                (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
            setMonthlyPayment(payment);
        }
    }, [loanAmount, tenure, interestRate]);

    return (
        <Section className="py-24 bg-southern-sand-200 relative overflow-hidden" id="calculator">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-taupe-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Calculator Interface */}
                    <div className="w-full lg:w-1/2">
                        <div className="bg-white/60 border border-vintage-coin-400/20 p-8 rounded-2xl shadow-xl backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-vintage-coin-400/10 rounded-lg text-vintage-coin-400">
                                    <Calculator className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl text-vintage-coin-400 font-serif">Mortgage Estimate</h3>
                            </div>

                            <div className="space-y-6">
                                {/* Loan Amount */}
                                <div>
                                    <label className="flex justify-between text-sm text-vintage-coin-400 font-medium mb-2">
                                        <span>Loan Amount ($)</span>
                                        <input
                                            type="number"
                                            value={loanAmount}
                                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                                            className="bg-transparent text-right text-vintage-coin-400 font-mono font-bold focus:outline-none border-b border-vintage-coin-400/20 focus:border-vintage-coin-400 w-32"
                                        />
                                    </label>
                                    <input
                                        type="range"
                                        min="500000"
                                        max="3000000"
                                        step="10000"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                                        className="w-full h-2 bg-taupe-400/30 rounded-lg appearance-none cursor-pointer accent-vintage-coin-400"
                                    />
                                    <div className="flex justify-between text-xs text-taupe-400 mt-1">
                                        <span>$500k</span>
                                        <span>$3M</span>
                                    </div>
                                </div>

                                {/* Tenure */}
                                <div>
                                    <label className="flex justify-between text-sm text-vintage-coin-400 font-medium mb-2">
                                        <span>Tenure (Years)</span>
                                        <input
                                            type="number"
                                            value={tenure}
                                            onChange={(e) => setTenure(Number(e.target.value))}
                                            className="bg-transparent text-right text-vintage-coin-400 font-mono font-bold focus:outline-none border-b border-vintage-coin-400/20 focus:border-vintage-coin-400 w-20"
                                        />
                                    </label>
                                    <input
                                        type="range"
                                        min="5"
                                        max="35"
                                        step="1"
                                        value={tenure}
                                        onChange={(e) => setTenure(Number(e.target.value))}
                                        className="w-full h-2 bg-taupe-400/30 rounded-lg appearance-none cursor-pointer accent-vintage-coin-400"
                                    />
                                    <div className="flex justify-between text-xs text-taupe-400 mt-1">
                                        <span>5y</span>
                                        <span>35y</span>
                                    </div>
                                </div>

                                {/* Interest Rate */}
                                <div>
                                    <label className="flex justify-between text-sm text-vintage-coin-400 font-medium mb-2">
                                        <span>Interest Rate (%)</span>
                                        <input
                                            type="number"
                                            value={interestRate}
                                            onChange={(e) => setInterestRate(Number(e.target.value))}
                                            step="0.1"
                                            className="bg-transparent text-right text-vintage-coin-400 font-mono font-bold focus:outline-none border-b border-vintage-coin-400/20 focus:border-vintage-coin-400 w-20"
                                        />
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="8"
                                        step="0.1"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(Number(e.target.value))}
                                        className="w-full h-2 bg-taupe-400/30 rounded-lg appearance-none cursor-pointer accent-vintage-coin-400"
                                    />
                                    <div className="flex justify-between text-xs text-taupe-400 mt-1">
                                        <span>1%</span>
                                        <span>8%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Result */}
                            <div className="mt-8 pt-6 border-t border-vintage-coin-400/10">
                                <p className="text-vintage-coin-400 font-medium text-sm mb-1">Estimated Monthly Payment</p>
                                <div className="text-4xl font-bold text-vintage-coin-400 font-serif">
                                    ${Math.round(monthlyPayment).toLocaleString()}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-4xl md:text-5xl font-serif text-vintage-coin-400 leading-tight">
                                Smart Financing for Your <span className="italic text-taupe-400">Dream Home</span>
                            </h2>
                            <p className="text-lg text-vintage-coin-400/80 max-w-xl">
                                Plan your future with confidence. Our team of financial experts is ready to help you navigate the best rates and packages available.
                            </p>

                            <div className="bg-white/40 border border-vintage-coin-400/20 p-6 rounded-xl inline-block w-full max-w-lg">
                                <p className="text-xl md:text-2xl text-vintage-coin-400 font-medium mb-6">
                                    "Find out how to save <span className="font-bold border-b-2 border-taupe-400">$89,800</span> with us today!"
                                </p>

                                <a
                                    href="https://wa.me/+6592786923"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-vintage-coin-400 hover:bg-taupe-400 text-white font-bold py-4 px-8 rounded-full transition-all hover:scale-105 shadow-xl shadow-vintage-coin-400/20"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    WhatsApp Us Now
                                </a>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </Section>
    );
};
