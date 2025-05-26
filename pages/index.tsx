import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<'config' | 'steckbrief'>('config');
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
       <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6">Digitabi</h1>

<div className="flex justify-center gap-4 mb-10">
  <button
    onClick={() => setMode('config')}
    className={`px-6 py-2 rounded font-semibold transition ${
      mode === 'config' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
    }`}
  >
    Abibuch-Konfigurator
  </button>
  <button
    onClick={() => setMode('steckbrief')}
    className={`px-6 py-2 rounded font-semibold transition ${
      mode === 'steckbrief' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
    }`}
  >
    Steckbrief-Editor
  </button>
</div>


        {mode === 'config' && (
  <>
   
        {step === 0 && (
          <div>
            <p className="mb-4 text-xl font-semibold text-gray-800">Für welches Jahr?</p>
            <div className="flex gap-4 mb-6">
              {[2024, 2025, 2026].map((y) => (
                <button
                  key={y}
                  onClick={() => setForm({ ...form, year: y })}
                  className={`px-6 py-3 rounded border font-medium text-lg transition ${form.year === y ? 'bg-orange-500 text-white' : 'bg-white text-black'}`}
                >
                  {y}
                </button>
              ))}
            </div>
            <button
              className="bg-orange-500 text-white px-8 py-3 text-lg rounded hover:bg-orange-600 disabled:bg-gray-300"
              onClick={next}
              disabled={!form.year}
            >
              Weiter
            </button>
          </div>
        )}

        {step === 1 && (
          <div>
            <p className="mb-4 text-xl font-semibold text-gray-800">Wie viele Personen sollen ein Abibuch bekommen?</p>
            <input
              type="range"
              min={1}
              max={170}
              value={form.persons}
              onChange={(e) => setForm({ ...form, persons: Number(e.target.value) })}
              className="w-full"
            />
            <p className="mt-2 text-center text-xl font-semibold text-gray-900">{form.persons} Personen</p>
            <div className="mt-6 flex justify-between">
              <button onClick={back} className="bg-blue-500 text-white px-8 py-3 text-lg rounded hover:bg-blue-600">Zurück</button>
              <button onClick={next} className="bg-orange-500 text-white px-8 py-3 text-lg rounded hover:bg-orange-600">Weiter</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="mb-4 text-xl font-semibold text-gray-800">Möchtest du eine digitale Version deines Abibuchs?</p>
            <div className="flex gap-4 mb-6">
              {['Ja', 'Nein', 'Nur digital'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setForm({ ...form, digital_option: opt })}
                  className={`px-6 py-3 rounded border font-medium text-lg transition ${form.digital_option === opt ? 'bg-orange-500 text-white' : 'bg-white text-black'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <button onClick={back} className="bg-blue-500 text-white px-8 py-3 text-lg rounded hover:bg-blue-600">Zurück</button>
              <button
                onClick={next}
                disabled={!form.digital_option}
                className="bg-orange-500 text-white px-8 py-3 text-lg rounded hover:bg-orange-600 disabled:bg-gray-300"
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {step === 3 && (form.digital_option === 'Ja' || form.digital_option === 'Nur digital') && (
          <div>
            <p className="mb-4 text-xl font-semibold text-gray-800">Wie viel Speicherplatz benötigst du für deine digitale Version?</p>
            <div className="flex flex-col gap-2 mb-6">
              {['32GB', '64GB', '128GB'].map((option) => (
                <label key={option} className="flex items-center gap-2 text-lg text-gray-900">
                  <input
                    type="radio"
                    name="storage"
                    value={option}
                    checked={form.storage === option}
                    onChange={() => setForm({ ...form, storage: option })}
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="flex justify-between">
              <button onClick={back} className="bg-blue-500 text-white px-8 py-3 text-lg rounded hover:bg-blue-600">Zurück</button>
              <button onClick={next} disabled={!form.storage} className="bg-orange-500 text-white px-8 py-3 text-lg rounded hover:bg-orange-600 disabled:bg-gray-300">Weiter</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <p className="mb-4 text-xl font-semibold text-gray-800">Welche Inhalte möchtest du in deinem Abibuch?</p>
            <div className="flex flex-col gap-2 mb-6">
              {(form.digital_option === 'Nein'
                ? ['Lehrer-Steckbriefe', 'Schüler-Steckbriefe', 'Fotos', 'Schüler-Rankings', 'Lehrer-Rankings']
                : ['Lehrer-Steckbriefe', 'Schüler-Steckbriefe', 'Videos', 'Sprachmemos', 'Fotos', 'Schüler-Rankings', 'Lehrer-Rankings']
              ).map((item) => (
                <label
                  key={item}
                  className={`flex items-center gap-2 p-3 border rounded cursor-pointer text-lg text-gray-900 ${form.content.includes(item) ? 'bg-blue-100 border-blue-600' : 'bg-white'}`}
                >
                  <input
                    type="checkbox"
                    checked={form.content.includes(item)}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        content: e.target.checked
                          ? [...form.content, item]
                          : form.content.filter((c) => c !== item),
                      })
                    }
                  />
                  {item}
                </label>
              ))}
            </div>
            <div className="flex justify-between">
              <button onClick={back} className="bg-blue-500 text-white px-8 py-3 text-lg rounded hover:bg-blue-600">Zurück</button>
              <button
                onClick={next}
                disabled={form.content.length === 0}
                className="bg-orange-500 text-white px-8 py-3 text-lg rounded hover:bg-orange-600 disabled:bg-gray-300"
              >
                Weiter
              </button>
            </div>
          </div>
        )}

{step === 5 && form.digital_option !== 'Nur digital' && (
          <div>
            <p className="mb-4 text-xl font-semibold text-gray-800">Welche Maße soll dein Abibuch haben?</p>
            <div className="flex flex-col gap-2 mb-6">
              {['DIN A4 (210x297 mm)', 'Buchformat (170x210 mm)'].map((option) => (
                <label key={option} className="flex items-center gap-2 text-lg text-gray-900">
                  <input
                    type="radio"
                    name="size"
                    value={option}
                    checked={form.size === option}
                    onChange={() => setForm({ ...form, size: option })}
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="flex justify-between">
              <button onClick={back} className="bg-blue-500 text-white px-8 py-3 text-lg rounded hover:bg-blue-600">Zurück</button>
              <button onClick={next} disabled={!form.size} className="bg-orange-500 text-white px-8 py-3 text-lg rounded hover:bg-orange-600 disabled:bg-gray-300">Weiter</button>
            </div>
          </div>
        )}

        {step === 6 && form.digital_option !== 'Nur digital' && (
          <div>
            <p className="mb-4 text-xl font-semibold text-gray-800">Welche Art von Cover soll dein Abibuch haben?</p>
            <div className="flex flex-col gap-2 mb-6">
              {['Hard-Cover', 'Soft-Cover'].map((option) => (
                <label key={option} className="flex items-center gap-2 text-lg text-gray-900">
                  <input
                    type="radio"
                    name="cover"
                    value={option}
                    checked={form.cover === option}
                    onChange={() => setForm({ ...form, cover: option })}
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="flex justify-between">
              <button onClick={back} className="bg-blue-500 text-white px-8 py-3 text-lg rounded hover:bg-blue-600">Zurück</button>
              <button onClick={next} disabled={!form.cover} className="bg-orange-500 text-white px-8 py-3 text-lg rounded hover:bg-orange-600 disabled:bg-gray-300">Weiter</button>
            </div>
          </div>
        )}

        {step === 7 && (
          <div>
            <p className="mb-4 font-semibold text-xl text-gray-800">Zusammenfassung deiner Auswahl:</p>
            <ul className="bg-gray-100 p-6 rounded text-lg leading-relaxed text-gray-900">
              <li><strong>Jahr:</strong> {form.year}</li>
              <li><strong>Personen:</strong> {form.persons}</li>
              <li><strong>Digital:</strong> {form.digital_option}</li>
              <li><strong>Inhalte:</strong> {form.content.join(', ') || 'Keine'}</li>
              {(form.digital_option === 'Ja' || form.digital_option === 'Nur digital') && (
                <li><strong>Speicherplatz:</strong> {form.storage}</li>
              )}
              {form.digital_option !== 'Nur digital' && (
                <>
                  <li><strong>Buchgröße:</strong> {form.size}</li>
                  <li><strong>Cover:</strong> {form.cover}</li>
                </>
              )}
            </ul>
            <div className="mt-6 flex justify-between">
              <button onClick={back} className="bg-blue-500 text-white px-8 py-3 text-lg rounded hover:bg-blue-600">Zurück</button>
              <button onClick={handleSubmit} className="bg-green-600 text-white px-8 py-3 text-lg rounded hover:bg-green-700">
                Preis berechnen
              </button>
            </div>
          </div>
        )}
        </>
    )}

   {mode === 'steckbrief' && (
  <div className="space-y-4">
    {[
      'Leistungskurs',
      'Lieblingsfach',
      'Hassfach',
      'Lieblingslehrer',
      'Hasslehrer',
      'Lieblingsbeschäftigung im Unterricht',
      'Bestes Schulerlebnis',
      'Plan nach dem Abi',
      'Mein Vorbild',
      '3 Dinge ohne die ich die Schulzeit nicht überstanden hätte',
      'Motivationslevel in der Schule',
      'Schule in 3 Worten',
      'LK in 3 Worten',
      '3 Dinge die ich auf eine einsame Insel mitnehmen würde',
      'Als Lehrer würde ich...',
      'Das werde ich am meisten vermissen',
      'Das werde ich gar nicht vermissen',
      'Da sehe ich mich in 10 Jahren',
      'Das erste Wort an das ich denke wenn ich die folgenden Wörter höre: Schule/Freunde/Alkohol',
      'Wenn ich im Lotto gewinnen würde...',
      'Titel meiner Autobiografie'
    ].map((label) => (
      <div key={label}>
        <label className="block text-lg font-medium text-gray-700">{label}</label>
        <input
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          placeholder="Antwort eingeben..."
        />
      </div>
    ))}
  </div>
)}
      </div>
    </div>   
  );
}

