// components/AuthForm.tsx
'use client';

import { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle, Building2 } from 'lucide-react';

// 1. Define the shape of the data we expect from the API
interface AuthResult {
  code: string;
  patientName: string;
  hmo: string;
  plan: string;
  treatment: string;
  timestamp: string;
}

export default function AuthForm() {
  const [loading, setLoading] = useState(false);
  // 2. Use the interface here instead of 'any'
  const [result, setResult] = useState<AuthResult | null>(null);
  const [error, setError] = useState('');

  // Form States
  const [patientId, setPatientId] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [treatment, setTreatment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/generate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId,
          hospitalName,
          treatmentType: treatment,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setResult(data.data);
    } catch (err: unknown) {
      // 3. Safe error handling (Satisfies the linter)
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full">
      
      {/* SUCCESS STATE */}
      {result ? (
        <div className="text-center animate-in fade-in zoom-in duration-300">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Approved!</h2>
          <div className="bg-indigo-50 border-2 border-indigo-200 p-4 rounded-xl mb-6">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Authorization Code</p>
            <p className="text-3xl font-mono font-bold text-indigo-600 tracking-wider">
              {result.code}
            </p>
          </div>
          
          <div className="text-left bg-gray-50 p-4 rounded-lg text-sm space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-500">Patient:</span>
              <span className="font-semibold text-gray-900">{result.patientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Plan:</span>
              <span className="font-semibold text-gray-900">{result.plan}</span>
            </div>
             <div className="flex justify-between">
              <span className="text-gray-500">HMO:</span>
              <span className="font-semibold text-gray-900">{result.hmo}</span>
            </div>
          </div>

          <button
            onClick={() => { setResult(null); setPatientId(''); }}
            className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
          >
            Process Another
          </button>
        </div>
      ) : (
        /* INPUT FORM STATE */
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-8">
            <Building2 className="w-10 h-10 text-indigo-600 mx-auto mb-2" />
            <h1 className="text-2xl font-bold text-gray-900">Hospital Portal</h1>
            <p className="text-gray-500 text-sm">Instant Authorization System</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Hospital Name</label>
            <input
              required
              type="text"
              placeholder="e.g. General Hospital, HealthPlus Pharmacy, or Clinic Name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-gray-900 bg-white placeholder-gray-500"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Patient ID</label>
            <input
              required
              type="text"
              placeholder="e.g. 12345"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition font-mono text-gray-900 bg-white placeholder-gray-500"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-900 mb-1">Treatment</label>
             <select 
               required
               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 bg-white"
               value={treatment}
               onChange={(e) => setTreatment(e.target.value)}
             >
               <option value="" className="text-gray-500">Select Treatment...</option>
               <option value="General Consultation">General Consultation</option>
               <option value="Malaria Treatment">Malaria Treatment</option>
               <option value="X-Ray">X-Ray / Scan</option>
               <option value="Surgery">Surgery (Minor)</option>
             </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Verifying...
              </>
            ) : (
              'Generate Authorization Code'
            )}
          </button>
        </form>
      )}
    </div>
  );
}