import { categories } from '../products';

export default function FilterForm({
	saleOnly,
	setSaleOnly,
	selectedCategory,
	setSelectedCategory,
	keyword,
	setKeyword,
}) {
	return (
		/* e.preventDefault() verhindert das Absenden des Formulars mit
   	 damit verbundenem Neuladen, wenn User in einem Formular-Element
   	 die Eingabetaste drücken oder einen button ohne type="button" klicken. */
		<form className="filter" onSubmit={(e) => e.preventDefault()}>
			<div>
				<label>
					Sonderangebote{' '}
					<input
						type="checkbox"
						checked={saleOnly}
						onChange={(e) => setSaleOnly(e.target.checked)}
					/>
				</label>
			</div>

			{/* 1. Verknüpft das select-Menü mit einem Label "Kategorie"
    	2. Importiert die Kategorien aus products.js
    	3. Nutzt die Map-Methode, um nach der ersten option die
    	weiteren option-Elemente zu erzeugen.
    	4. Erstellt in Finder.jsx den state selectedCategory und
    	gebt ihn samt set-Funktion in FilterForm. Startwert ist 0.
    	5. Verknüpft den state und die set-Funktion mit dem
    	select-Element, ähnlich wie bei einem text-Input.
    	6. Ergänzt in Finder.js die getFilteredProducts-Funktion
    	um den selectedCategory-Filter. Beachtet, dass der ausgelesene
    	value des select-Elements immer ein String ist, und nutzt
    	parseInt, um ihn in einen Integer umzuwandeln.
 	*/}
			<div className="filter__category">
				<label htmlFor="category">Kategorie</label>
				<select
					id="category"
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
				>
					<option value="0">Alle Kategorien</option>
					{categories.map(({ categoryId, name }) => (
						<option key={categoryId} value={categoryId}>
							{name}
						</option>
					))}
				</select>
			</div>
			<div className="filter__search">
				<label htmlFor="keyword">Suchbegriff</label>
				<input
					type="search"
					id="keyword"
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
				/>
			</div>
		</form>
	);
}
