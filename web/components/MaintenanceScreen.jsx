export default function MaintenanceScreen({ message }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6 text-center">
      <div className="max-w-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Micro Art LTD" className="h-14 w-auto mx-auto mb-8" />
        <div className="text-gold text-4xl mb-5">✦</div>
        <h1 className="font-cormorant text-4xl lg:text-5xl mb-4">We&apos;ll be back soon</h1>
        <p className="text-[#6a5844] leading-8">
          {message || "We are currently performing scheduled maintenance. Please check back soon."}
        </p>
      </div>
    </div>
  );
}
