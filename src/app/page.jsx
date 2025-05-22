import Form from 'next/form'
import { tShirts } from './data';



async function Home({ searchParams }) {

  const { size, color, brand } = await searchParams

  const filtered = tShirts.filter((t) => {
    return (
      (!size || t.size === size) &&
      (!color || t.color === color) &&
      (!brand || t.brand === brand)
    );
  });


  return (

    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Filtrar camisetas</h1>

      <Form action="" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select name="size" defaultValue={size || ''} className="p-2 border rounded">
          <option value="">Todas las tallas</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>

        <select name="color" defaultValue={color || ''} className="p-2 border rounded">
          <option value="">Todos los colores</option>
          {[...new Set(tShirts.map(t => t.color))].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select name="brand" defaultValue={brand || ''} className="p-2 border rounded">
          <option value="">Todas las marcas</option>
          {[...new Set(tShirts.map(t => t.brand))].map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <button type="submit" className="col-span-1 md:col-span-3 p-2 bg-blue-600 text-white rounded">
          Filtrar
        </button>
      </Form>

      <ul className="space-y-2">
        {filtered.length > 0 ? (
          filtered.map(t => (
            <li key={t.id} className="p-4 border rounded shadow-sm">
              <strong>{t.brand}</strong> - {t.color}, {t.size} - ${t.price.toFixed(2)}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No hay resultados para estos filtros.</p>
        )}
      </ul>
    </div>
  );
}

export default Home;