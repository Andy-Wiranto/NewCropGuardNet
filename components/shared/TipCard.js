export default function TipCard({ title, text }) {
    return (
        <div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-green-100">{text}</p>
        </div>
    );
}
