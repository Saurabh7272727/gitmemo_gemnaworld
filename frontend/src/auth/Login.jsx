import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SimpleLogin = () => {
    const navi = useNavigate();
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="text-2xl mb-2">Gemna GitMemo</div>
                    <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
                    <p className="text-gray-500 text-sm mt-1">Login to your account</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="text-right">
                        <a href="#" className="text-sm text-blue-600 hover:underline">
                            Forgot password? (coming soon..)
                        </a>
                    </div>

                    <button

                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Login
                    </button>
                </div>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">OR</span>
                    </div>
                </div>

                <button
                    onClick={() => {
                        window.location.href = 'http://localhost:3000/auth/oauth/login&signup'
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    <FaGithub className="text-xl" />
                    <span>Continue with GitHub</span>
                </button>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-blue-600 font-medium hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SimpleLogin;