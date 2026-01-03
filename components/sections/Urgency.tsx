'use client';
import { useState, useEffect } from 'react';
import { Section } from '@/components/ui/Section';
import { PROJECT_INFO } from '@/lib/constants';

const CountUnit = ({ label, value }: { label: string, value: number }) => (
    <div className="flex flex-col items-center">
        <div className="w-20 h-20 md:w-32 md:h-32 bg-white/10 backdrop-blur-md border border-isabelline-50/20 rounded-2xl flex items-center justify-center mb-4 shadow-xl">
            <span className="text-3xl md:text-5xl font-mono font-bold text-isabelline-100">
                {value.toString().padStart(2, '0')}
            </span>
        </div>
        <span className="text-xs uppercase tracking-widest text-isabelline-50/70">{label}</span>
    </div>
);

export const Urgency = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        // Set target date 14 days from now if not defined
        const targetDate = new Date(PROJECT_INFO.launchDate).getTime() > Date.now()
            ? new Date(PROJECT_INFO.launchDate).getTime()
            : new Date().getTime() + 14 * 24 * 60 * 60 * 1000;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Section className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-vintage-coin-400 to-taupe-400 z-0" />

            <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-isabelline-100 mb-6">
                    VVIP Preview Launches In
                </h2>
                <p className="text-xl text-isabelline-50/90 mb-12 max-w-2xl">
                    {PROJECT_INFO.vipDiscount}
                </p>

                <div className="flex gap-4 md:gap-8 mb-12">
                    <CountUnit label="Days" value={timeLeft.days} />
                    <CountUnit label="Hours" value={timeLeft.hours} />
                    <CountUnit label="Minutes" value={timeLeft.minutes} />
                    <CountUnit label="Seconds" value={timeLeft.seconds} />
                </div>

                <div className="p-4 bg-white/10 border border-isabelline-50/20 rounded-lg">
                    <p className="text-isabelline-50 font-medium">Limited Slots Available. Direct Developer Prices.</p>
                </div>
            </div>
        </Section>
    );
};
