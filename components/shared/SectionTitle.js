export default function SectionTitle({ emoji, title }) {
    return (
        <div className="flex items-center gap-3 mt-12 mb-6">
            <span className="text-3xl">{emoji}</span>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
    );
}
