import { useEffect, useState } from 'react';
import { getFormattedPrice } from '../helpers';

const toppings = [
	{
		name: 'Tomaten',
		icon: '🍅',
		id: 363,
		price: 99,
	},
	{
		name: 'Käse',
		icon: '🧀',
		id: 73,
		price: 179,
	},
	{
		name: 'Pilze',
		icon: '🍄',
		id: 61,
		price: 299,
	},
	{
		name: 'Ananas',
		icon: '🍍',
		id: 89,
		price: 199,
	},
	{
		name: 'Pepperoni',
		icon: '🌶️',
		id: 76,
		price: 99,
	},
	{
		name: 'Oliven',
		icon: '🫒',
		id: 37,
		price: 149,
	},
];

export default function Pizza() {
	const [selectedToppings, setSelectedToppings] = useState(
		getInitialSelectedToppings()
	);

	/* Bonus: Wenn alles funktioniert, speichert den Zustand von selectedToppings
    in der URL und stellt ihn beim Neuladen wieder her.
    Tipp: Nutzt die Array-Methode join und die String-Methode split, und Unterstrich _
    als Trennzeichen. Achtet auch auf den Datentyp.
    */

	useEffect(() => {
		const url = new URL(window.location.href);

		url.searchParams.delete('toppings');

		if (selectedToppings.length) {
			url.searchParams.set('toppings', selectedToppings.join('_'));
		}

		window.history.replaceState({}, '', url);
	}, [selectedToppings]);

	/* Diese Funktion soll mit jeder Checkbox über onChange verbunden sein.
    Je nachdem, ob die Checkbox an- oder abgewählt wurde, soll die ID
    der Zutat zum State selectedToppings hinzugefügt oder entfernt werden.  */
	const handleToppingChange = (e) => {
		const toppingId = parseInt(e.target.value);
		const selectedToppingsSet = new Set(selectedToppings);

		if (e.target.checked) {
			selectedToppingsSet.add(toppingId);
		} else {
			selectedToppingsSet.delete(toppingId);
		}

		setSelectedToppings([...selectedToppingsSet]);
	};

	/* Nutzt die Array-Methode reduce, um den Preis zu berechnen. Grundpreis
    für eine Pizza ohne Toppings ist 6,99 €. */
	const totalPrice = selectedToppings.reduce((total, selectedId) => {
		const topping = toppings.find(({ id }) => id === selectedId);
		if (!topping) {
			return total;
		}
		return total + topping.price;
	}, 699);

	return (
		<section className="pizza">
			<header className="pizza__header">
				<h1>Pizza</h1>
				<div className="pizza__image">🍕</div>
			</header>
			{JSON.stringify(selectedToppings)}
			{/* Verhindert Absenden des Formulars */}
			<form className="pizza__form" onSubmit={(e) => e.preventDefault()}>
				<fieldset className="pizza__toppings">
					<legend>Belag wählen</legend>
					{toppings.map(({ name, id, price, icon }) => (
						<label key={id} className="pizza__topping">
							<input
								type="checkbox"
								value={id}
								onChange={handleToppingChange}
								checked={selectedToppings.includes(id)}
							/>
							{icon} <b>{name}</b> {getFormattedPrice(price)}
						</label>
					))}
				</fieldset>
			</form>
			<output className="pizza__price">{getFormattedPrice(totalPrice)}</output>
		</section>
	);
}

function getInitialSelectedToppings() {
	const url = new URL(window.location.href);

	const toppingsString = url.searchParams.get('toppings');

	if (!toppingsString) {
		return [];
	}

	const toppingsArray = toppingsString
		.split('_')
		.map((id) => parseInt(id))
		.filter((id) => Number.isInteger(id))
		.filter((id) => toppings.find((topping) => topping.id === id));

	return [...new Set(toppingsArray)];
}

// Version mit Array-Methoden:
/*
// Funktioniert nicht, weil wir keinen neuen Array in den state speichern,
// React erkennt also keine Änderung und rendert nicht neu.
selectedToppings.push(toppingId);
    setSelectedToppings(selectedToppings); */
/* const handleToppingChange = (e) => {
    const toppingId = parseInt(e.target.value);
    if (e.target.checked) {
   	 
   	 setSelectedToppings([...selectedToppings, toppingId]);
    } else {
   	 setSelectedToppings(selectedToppings.filter((id) => id !== toppingId));
    }
}; */
