export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="text-center mb-10">
      <h2 className="font-cormorant text-4xl">{title}</h2>
      {subtitle && <p className="text-[#6a5844] mt-3">{subtitle}</p>}
    </div>
  );
}
