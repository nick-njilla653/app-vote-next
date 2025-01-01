// src/features/LoginPage/components/LoginPage.tsx
'use client';

import React from 'react';
import { EyeIcon, EyeSlashIcon, LockOpenIcon } from '@heroicons/react/24/outline';
import { useLogin } from '../hooks/useLogin';

const LoginPage: React.FC = () => {
  const {
    credentials,
    setCredentials,
    showPassword,
    setShowPassword,
    isLoading,
    errorState,
    setErrorState,
    handleLogin
  } = useLogin();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          ELECAM - Système de Gestion des Élections
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* User Role Selection */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Type d'utilisateur
              </label>
              <select
                id="role"
                name="role"
                value={credentials.role}
                onChange={(e) => setCredentials({
                  ...credentials,
                  role: e.target.value as 'admin' | 'scrutateur' | 'observateur' | 'electeur'
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="electeur">Électeur</option>
                <option value="scrutateur">Scrutateur</option>
                <option value="observateur">Observateur</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>

            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Identifiant
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={(e) => setCredentials({
                  ...credentials,
                  username: e.target.value
                })}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({
                    ...credentials,
                    password: e.target.value
                  })}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                <LockOpenIcon className="h-5 w-5 mr-2" />
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </button>
            </div>
          </form>

          {/* Loading Bar */}
          {isLoading && (
            <div className="w-full bg-gray-200 h-1 mt-4">
              <div className="bg-indigo-600 h-1 animate-pulse"></div>
            </div>
          )}

          {/* Error Alert */}
          {errorState.showAlert && (
            <div className="mt-4 p-4 bg-red-50 border border-red-400 text-red-700 rounded">
              <p>{errorState.errorMessage}</p>
              <button
                onClick={() => setErrorState(prev => ({ ...prev, showAlert: false }))}
                className="mt-2 text-sm underline"
              >
                Fermer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;