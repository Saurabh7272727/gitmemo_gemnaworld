// src/components/SimpleSignup.jsx
import React from 'react';
import { FaGithub } from 'react-icons/fa';

const SimpleSignup = () => {
    const check = () => {
        window.location.href = 'http://localhost:3000/auth/oauth/login&signup'
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="text-2xl mb-2">Gemna GitMemo</div>
                    <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
                    <p className="text-gray-500 text-sm mt-1">Join GitMemo today</p>
                </div>

                <button
                    onClick={() => check()}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    <FaGithub className="text-xl" />
                    <span>Sign up with GitHub</span>
                </button>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 font-medium hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SimpleSignup;