
export default function Home() {


  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <main className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Produtos</h1>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="rounded-2xl p-4 w-60 h-60 bg-zinc-100 dark:bg-zinc-900"></div>
          ))}
        </div>
      </main>
    </div>
  );
}

function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <main className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Produtos</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="rounded-2xl p-4 w-60 h-60 bg-zinc-100 dark:bg-zinc-900"></div>
          ))}
        </div>
      </main>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <main className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-2xl text-foreground">Ocorreu um erro ao carregar os produtos.</p>
        </div>
      </main>
    </div>
  );
}