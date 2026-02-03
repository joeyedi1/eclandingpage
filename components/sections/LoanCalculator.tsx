"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";

export const LoanCalculator = () => {
    const [loanAmount, setLoanAmount] = useState(1500000);
    const [tenure, setTenure] = useState(30);
    const [interestRate, setInterestRate] = useState(3.5);
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    useEffect(() => {
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
        <section className="py-16 md:py-24 bg-southern-sand-200 relative overflow-hidden" id="prices">
            <div className="absolute top-0 right-0 w-96 h-96 bg-taupe-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-xl mx-auto px-4 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-taupe-400 font-medium mb-3">
                        Plan Your Future
                    </p>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-vintage-coin-400">
                        Mortgage Calculator
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="bg-white/60 border border-vintage-coin-400/20 p-6 md:p-8 rounded-2xl shadow-xl backdrop-blur-sm"
                >
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
                                type="range" min="500000" max="3000000" step="10000"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(Number(e.target.value))}
                                className="w-full h-2 bg-taupe-400/30 rounded-lg appearance-none cursor-pointer accent-vintage-coin-400"
                            />
                            <div className="flex justify-between text-xs text-taupe-400 mt-1">
                                <span>$500k</span><span>$3M</span>
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
                                type="range" min="5" max="35" step="1"
                                value={tenure}
                                onChange={(e) => setTenure(Number(e.target.value))}
                                className="w-full h-2 bg-taupe-400/30 rounded-lg appearance-none cursor-pointer accent-vintage-coin-400"
                            />
                            <div className="flex justify-between text-xs text-taupe-400 mt-1">
                                <span>5y</span><span>35y</span>
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
                                type="range" min="1" max="8" step="0.1"
                                value={interestRate}
                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                className="w-full h-2 bg-taupe-400/30 rounded-lg appearance-none cursor-pointer accent-vintage-coin-400"
                            />
                            <div className="flex justify-between text-xs text-taupe-400 mt-1">
                                <span>1%</span><span>8%</span>
                            </div>
                        </div>
                    </div>

                    {/* Result */}
                    <div className="mt-8 pt-6 border-t border-vintage-coin-400/10 text-center">
                        <p className="text-vintage-coin-400 font-medium text-sm mb-1">Estimated Monthly Payment</p>
                        <div className="text-4xl font-bold text-vintage-coin-400 font-serif">
                            ${Math.round(monthlyPayment).toLocaleString()}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};