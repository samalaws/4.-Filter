export default function FilterStatus({ count }) {
	const cssClass = `filter-status ${
		count === 0 ? 'filter-status--no-results' : ''
	}`;

	return <output className={cssClass}>{getStatusText(count)}</output>;
}

function getStatusText(count) {
	switch (count) {
		case 0:
			return 'Kein Produkt gefunden';
		case 1:
			return 'Ein Produkt gefunden';
		default:
			return `${count} Produkte gefunden`;
	}
}

/* 
        1. Erstellt eine Komponente FilterStatus, die die Anzahl der gefilterten
        Produkte darstellt. Also "x Produkte gefunden". Die Komponente soll zwischen
        Filter und Produktliste dargestellt werden.
        Die Anzeige soll im output-Element mit der Klasse "filter-status" erscheinen.
        2. Die Komponente soll Kein Produkt / Ein Produkt / x Produkte gefunden...
        ausgeben.
        3. Wenn KEIN Produkt gefunden wurde, soll das output-Element soll zusätzlich 
        die Klasse "filter-status--no-results" haben.
        */
