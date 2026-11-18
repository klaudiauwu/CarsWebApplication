export default function AboutPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '3rem auto', padding: '0 1rem' }}>
      <section
        style={{
          backgroundColor: '#141414',
          border: '1px solid #333',
          borderTop: '4px solid #e50914',
          padding: '2.5rem',
          borderRadius: '8px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
        }}
      >
        <h1
          style={{
            color: '#fff',
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontSize: '2.2rem',
          }}
        >
          O aplikacji
        </h1>

        <p
          style={{
            color: '#ccc',
            fontSize: '1.1rem',
            lineHeight: '1.6',
            marginBottom: '1.5rem',
          }}
        >
          Ta aplikacja to coś więcej niż tylko baza danych pojazdów – to nowoczesne, w pełni bezpieczne i niezwykle intuicyjne centrum zarządzania motoryzacją. Projekt łączy w sobie potęgę backendu .NET z lekkością i dynamiką Reacta oraz Vite.
        </p>

        <p
          style={{
            color: '#ccc',
            fontSize: '1.1rem',
            lineHeight: '1.6',
            marginBottom: '1.5rem',
          }}
        >
          Jej elegancki, ciemny design z charakterystycznymi czerwonymi akcentami nadaje jej wyjątkowy, prestiżowy charakter. Dzięki zaawansowanemu systemowi autoryzacji JWT, bezpiecznej weryfikacji kont oraz w pełni spersonalizowanym listom ulubionych samochodów, każdy użytkownik otrzymuje przestrzeń skrojoną idealnie pod swoje potrzeby.
        </p>

        <div
          style={{
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #333',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              color: '#e50914',
              fontSize: '1.05rem',
              fontWeight: 'bold',
              lineHeight: '1.5',
            }}
          >
            To połączenie sprawia, że zarządzanie pojazdami staje się czystą przyjemnością!
          </p>
        </div>
      </section>
    </div>
  );
}