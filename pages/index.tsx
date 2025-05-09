import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    year: 2025,
    persons: 85,
    digital_option: '',
    content: [] as string[],
    storage: '',
    size: '',
    cover: '',
  });
  const [price, setPrice] = useState<number | null>(null);

  const next = () => {
    if (step === 2 && form.digital_option === 'Nein') setStep(4);
    else if (step === 2 && form.digital_option === 'Nur digital') setStep(3);
    else if (step === 4 && form.digital_option === 'Nur digital') setStep(7);
    else if (step === 6) setStep(7);
    else setStep((s) => s + 1);
  };

  const back = () => {
    if (step === 4 && form.digital_option === 'Nein') setStep(2);
    else if (step === 3 && form.digital_option === 'Nur digital') setStep(2);
    else if (step === 7 && form.digital_option === 'Nur digital') setStep(4);
    else if (step === 7 && form.digital_option === 'Nein') setStep(4);
    else if (step === 7 && form.digital_option === 'Ja') setStep(6);
    else setStep((s) => Math.max(0, s - 1));
  };

  const handleSubmit = async () => {
    const res = await axios.post('http://127.0.0.1:8000/calculate', form);
    setPrice(res.data.price);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-orange-100">
      <div className="w-full max-w-3xl bg-white p-12 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-10">Digitabi</h1>

        {/* ... alle deine bestehenden Steps (0 bis 7) ... */}

        {price !== null && (
          <div className="mt-8 text-orange-600 font-bold text-2xl text-center">
            📘 Dein Abibuch kostet: {price} €
          </div>
        )}
      </div>
    </div>
  );
}
