import { useId, useRef, type FormEventHandler } from "react"

const FLAG = import.meta.env.VITE_CTF_2_FLAG

function App() {
  const passwordId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const value = inputRef.current?.value;

    if (value === FLAG) {
      alert(`✅ Výborně!`)
    }
    else {
      alert(`❌ Zkoušej to dál...`)
    }
  }

  return (
    <>
      <header>
        <h1>CTF-2</h1>
      </header>
      <main>
        <section>
          <form onSubmit={handleSubmit}>
            <p id={passwordId}>Zadej 🚩 pro tento challenge, aby si jí ověřil*a.</p>
            <input ref={inputRef} aria-describedby={passwordId} id={passwordId} />
            <button type="submit">Ověřit</button>
          </form>
        </section>
      </main >
    </>
  )
}

export default App
