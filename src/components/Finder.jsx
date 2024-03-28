import { useEffect, useState } from 'react';
import products from '../products';
import FilterForm from './FilterForm';
import ProductsList from './ProductsList';
import FilterStatus from './FilterStatus';

export default function Finder() {
	const [saleOnly, setSaleOnly] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(0);
	const [keyword, setKeyword] = useState('');

	const [initializing, setInitializing] = useState(true);

	/* Schreibt hier einen Effekt, der in document.title 'React Filter' schreibt,
    und der noch ' - Sonderangebote' hinzufügt, wenn saleOnly true ist. */
	useEffect(() => {
		document.title = `React-Filter${saleOnly ? ' – 🤑' : ''}`;
	}, [saleOnly]);

	useSearchParams(
		selectedCategory,
		setSelectedCategory,
		saleOnly,
		setSaleOnly,
		keyword,
		setKeyword,
		setInitializing
	);

	const filteredProducts = getFilteredProducts(
		saleOnly,
		selectedCategory,
		keyword
	);

	/*   Stelle beim ersten Durchgang (bei dem der Filterzustand aus der URL
  noch nicht wiederhergestellt wurde) nichts dar, um zu verhindern, dass
  am Anfang für einen kurzen Moment alle Produkte dargestellt werden. */
	if (initializing) {
		return null;
	}

	return (
		<div className="finder">
			<FilterForm
				saleOnly={saleOnly}
				setSaleOnly={setSaleOnly}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
				keyword={keyword}
				setKeyword={setKeyword}
			/>
			<FilterStatus count={filteredProducts.length} />
			<ProductsList products={filteredProducts} />
		</div>
	);
}

function useSearchParams(
	selectedCategory,
	setSelectedCategory,
	saleOnly,
	setSaleOnly,
	keyword,
	setKeyword,
	setInitializing
) {
	/* Ein Effekt, der nur einmal am Anfang ausgeführt wird, und in dem
der Wert von category aus der URL ausgelesen und ggf. als Wert
von selectedCategory gesetzt wird. */
	useEffect(() => {
		// URL, die beim Laden der Seite aufgerufen wurde
		const url = new URL(window.location.href);

		const oldCategory = url.searchParams.get('category');
		if (oldCategory) {
			// Parameter aus der URL sind immer Strings
			setSelectedCategory(parseInt(oldCategory));
		}

		const oldSaleOnly = url.searchParams.get('sale');
		if (oldSaleOnly === 'true') {
			setSaleOnly(true);
		}

		const oldKeyword = url.searchParams.get('keyword');

		if (oldKeyword) {
			setKeyword(oldKeyword);
		}

		setInitializing(false);
	}, []);

	useEffect(() => {
		// Konstruiere ein neues URL-Objekt auf Grundlage der aktuellen Url
		const url = new URL(window.location.href);

		// So könnte man alle Parameter löschen. Achtung: Ggf. auch welche,
		// die nicht mit dem Filter zusammenhängen.
		// url.search = '';

		// Entferne den category-Parameter
		url.searchParams.delete('category');
		// Wenn selectedCategory ungleich 0 (Standardwert) ist...
		if (selectedCategory) {
			url.searchParams.set('category', selectedCategory);
		}

		url.searchParams.delete('sale');
		if (saleOnly) {
			url.searchParams.set('sale', saleOnly);
		}

		url.searchParams.delete('keyword');
		if (keyword.length > 1) {
			url.searchParams.set('keyword', keyword);
		}

		window.history.replaceState({}, '', url);
	}, [selectedCategory, saleOnly, keyword]);
}

function getFilteredProducts(saleOnly, selectedCategory, keyword) {
	const noSaleFilter = saleOnly === false;
	const noCategoryFilter = selectedCategory === 0;
	const noKeywordFilter = keyword.length < 2;

	/* Regulärer Ausdruck, um zu testen, ob ein Muster in einem
  anderen String vorkommt. "i" bedeutet "case insensitive",
  also Großschreibung ignorieren.
  Das RegExp-Objekt hat u.a. die Methode test(), um zu prüfen, ob ein String
  die Bedingungen des regulären Ausdrucks erfüllt.
  https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/RegExp */
	const regExp = new RegExp(keyword, 'i');

	return products
		.filter(({ sale }) => noSaleFilter || sale === saleOnly)
		.filter(({ category }) => noCategoryFilter || category === selectedCategory)
		.filter(({ title }) => noKeywordFilter || regExp.test(title));
}
