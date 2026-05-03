import { AlertTriangle } from "lucide-react";

export default function DiseaseCard({ title, description, symptoms, treatment }) {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="text-orange-500" size={20} />
                <h3 className="text-xl font-semibold">{title}</h3>
            </div>

            <p className="text-gray-700 mb-6">{description}</p>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">Symptoms:</h4>
                    <ul className="list-disc pl-5 text-gray-700">
                        {symptoms.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">Treatment:</h4>
                    <ul className="list-disc pl-5 text-gray-700">
                        {treatment.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
