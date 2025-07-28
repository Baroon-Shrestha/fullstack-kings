// src/Pages/Unauthorized.jsx
export default function Unauthorized() {
  return (
    <div className="text-center min-h-[50vh] mt-20 flex items-center justify-center flex-col gap-3">
      <h1 className="text-4xl font-bold text-red-600">403 - Unauthorized</h1>
      <p className="text-lg">You do not have permission to access this page.</p>
    </div>
  );
}
