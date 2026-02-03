'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';

interface FormData {
    name: string;
    mobile: string;
    email: string;
    unit: string;
    request: string;
    consentContact: boolean;
    consentMarketing: boolean;
}

interface FormErrors {
    name?: string;
    mobile?: string;
    email?: string;
    request?: string;
    consentContact?: string;
}

export const LeadForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        mobile: '',
        email: '',
        unit: '3-Bedroom',
        request: '',
        consentContact: false,
        consentMarketing: false,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Please fill up your name';
        }

        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Please fill up your mobile number';
        } else if (!/^\d{8}$/.test(formData.mobile.replace(/\s/g, ''))) {
            newErrors.mobile = 'Please enter a valid 8-digit number';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Please fill up your email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.request) {
            newErrors.request = 'Please select a request';
        }

        if (!formData.consentContact) {
            newErrors.consentContact = 'Please agree to be contacted';
        }

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);

        try {
            const requestLabels: Record<string, string> = {
                showflat: 'Arrange Showflat Viewing',
                brochure: 'Download E-Brochure',
                pricelist: 'Units & Price Lists',
            };

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    mobile: `+65 ${formData.mobile}`,
                    email: formData.email,
                    preferredUnit: formData.unit,
                    request: requestLabels[formData.request] || formData.request,
                    consentContact: formData.consentContact,
                    consentMarketing: formData.consentMarketing,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setIsSubmitted(true);
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field: keyof FormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const inputClass = (field: keyof FormErrors) =>
        `w-full px-5 py-3 rounded-full border outline-none transition bg-southern-sand-200/20 text-vintage-coin-400 placeholder:text-taupe-400 ${
            errors[field]
                ? 'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-400/10'
                : 'border-vintage-coin-400/20 focus:border-vintage-coin-400 focus:ring-4 focus:ring-vintage-coin-400/10'
        }`;

    // Success State
    if (isSubmitted) {
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

                    <div className="p-12 bg-white flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-vintage-coin-400/10 rounded-full flex items-center justify-center mb-6">
                            <span className="text-3xl text-vintage-coin-400">✓</span>
                        </div>
                        <h4 className="text-2xl font-serif text-pine-tree-900 mb-3">Thank You!</h4>
                        <p className="text-vintage-coin-400 leading-relaxed mb-6">
                            Your registration has been received. Our sales team will contact you shortly with VVIP access details.
                        </p>
                        <button
                            onClick={() => {
                                setIsSubmitted(false);
                                setFormData({
                                    name: '',
                                    mobile: '',
                                    email: '',
                                    unit: '3-Bedroom',
                                    request: '',
                                    consentContact: false,
                                    consentMarketing: false,
                                });
                            }}
                            className="text-sm text-vintage-coin-400 underline hover:text-taupe-400 transition-colors"
                        >
                            Submit another registration
                        </button>
                    </div>
                </div>
            </Section>
        );
    }

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
                    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                        {/* Name and Mobile Number - Side by Side */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-vintage-coin-400 mb-1 ml-4">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className={inputClass('name')}
                                    placeholder="John Doe"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1 ml-4">{errors.name}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-vintage-coin-400 mb-1 ml-4">Mobile Number</label>
                                <div className="flex">
                                    <span className={`bg-southern-sand-200/40 px-4 py-3 rounded-l-full border border-r-0 text-vintage-coin-400 font-medium pl-5 ${
                                        errors.mobile ? 'border-red-400' : 'border-vintage-coin-400/20'
                                    }`}>+65</span>
                                    <input
                                        type="tel"
                                        value={formData.mobile}
                                        onChange={(e) => handleChange('mobile', e.target.value)}
                                        className={`w-full px-5 py-3 rounded-r-full border outline-none transition bg-southern-sand-200/20 text-vintage-coin-400 placeholder:text-taupe-400 ${
                                            errors.mobile
                                                ? 'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-400/10'
                                                : 'border-vintage-coin-400/20 focus:border-vintage-coin-400 focus:ring-4 focus:ring-vintage-coin-400/10'
                                        }`}
                                        placeholder="8123 4567"
                                        aria-label="Mobile Number"
                                    />
                                </div>
                                {errors.mobile && (
                                    <p className="text-red-500 text-xs mt-1 ml-4">{errors.mobile}</p>
                                )}
                            </div>
                        </div>

                        {/* Email - Full Width */}
                        <div>
                            <label className="block text-sm font-medium text-vintage-coin-400 mb-1 ml-4">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className={inputClass('email')}
                                placeholder="john@example.com"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1 ml-4">{errors.email}</p>
                            )}
                        </div>

                        {/* Preferred Unit and Request - Side by Side */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-vintage-coin-400 mb-1 ml-4">Preferred Unit</label>
                                <div className="relative">
                                    <select
                                        value={formData.unit}
                                        onChange={(e) => handleChange('unit', e.target.value)}
                                        className="w-full px-5 py-3 rounded-full border border-vintage-coin-400/20 focus:border-vintage-coin-400 focus:ring-4 focus:ring-vintage-coin-400/10 outline-none transition appearance-none bg-southern-sand-200/20 text-vintage-coin-400"
                                    >
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
                                    <select
                                        value={formData.request}
                                        onChange={(e) => handleChange('request', e.target.value)}
                                        className={`w-full px-5 py-3 rounded-full border outline-none transition appearance-none bg-southern-sand-200/20 text-vintage-coin-400 ${
                                            errors.request
                                                ? 'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-400/10'
                                                : 'border-vintage-coin-400/20 focus:border-vintage-coin-400 focus:ring-4 focus:ring-vintage-coin-400/10'
                                        }`}
                                    >
                                        <option className="bg-white" value="">Select Request</option>
                                        <option className="bg-white" value="showflat">Showflat Viewing</option>
                                        <option className="bg-white" value="brochure">E-Brochure</option>
                                        <option className="bg-white" value="pricelist">Price Lists</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-taupe-400">
                                        ▼
                                    </div>
                                </div>
                                {errors.request && (
                                    <p className="text-red-500 text-xs mt-1 ml-4">{errors.request}</p>
                                )}
                            </div>
                        </div>

                        {/* Consent Checkboxes */}
                        <div className="space-y-3 pt-2">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input 
                                    type="checkbox"
                                    checked={formData.consentContact}
                                    onChange={(e) => handleChange('consentContact', e.target.checked)}
                                    className={`mt-1 w-4 h-4 rounded text-vintage-coin-400 focus:ring-vintage-coin-400/20 ${
                                        errors.consentContact ? 'border-red-400' : 'border-vintage-coin-400/30'
                                    }`}
                                />
                                <span className={`text-xs leading-relaxed ${
                                    errors.consentContact ? 'text-red-500' : 'text-vintage-coin-400/70'
                                }`}>
                                    I agree to be contacted by River Modern sales team and associates.
                                </span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input 
                                    type="checkbox"
                                    checked={formData.consentMarketing}
                                    onChange={(e) => handleChange('consentMarketing', e.target.checked)}
                                    className="mt-1 w-4 h-4 rounded border-vintage-coin-400/30 text-vintage-coin-400 focus:ring-vintage-coin-400/20"
                                />
                                <span className="text-xs text-vintage-coin-400/70 leading-relaxed">
                                    I would like to receive updates via Call/SMS/Email/Whatsapp.
                                </span>
                            </label>
                        </div>

                        <Button 
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-vintage-coin-400 hover:bg-taupe-400 text-white shadow-lg mt-2 font-bold text-lg transition-opacity ${
                                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Register Now'}
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