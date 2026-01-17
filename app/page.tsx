// app/page.tsx
import AuthForm from '../components/AuthForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center p-4">
      
      <AuthForm />

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Built by Anthony</p>
        <a 
          href="https://wa.me/2349157637697" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline font-medium"
        >
          Contact Developer for Pilot Access
        </a>
      </div>

    </main>
  );
}