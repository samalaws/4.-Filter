import { useState } from 'react';
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
		icon: 'O',
		id: 37,
		price: 149,
	},
];

export default function Pizza() {
	const [selectedToppings, setSelectedToppings] = useState([]);

	/* Bonus: Wenn alles funktioniert, speichert den Zustand von selectedToppings
    in der URL und stellt ihn beim Neuladen wieder her.
    Tipp: Nutzt die Array-Methode join und die String-Methode split, und Unterstrich _
    als Trennzeichen. Achtet auch auf den Datentyp.
    */

	/* Diese Funktion soll mit jeder Checkbox über onChange verbunden sein.
    Je nachdem, ob die Checkbox an- oder abgewählt wurde, soll die ID
    der Zutat zum State selectedToppings hinzugefügt oder entfernt werden.  */
	const handleToppingChange = (e) => {
		const currentItemID = parseInt(e.target.value);
		const currentState = e.target.checked;
		// selectedToppings((preventSelectedToppings)=>[...preventSelectedToppings,new Product])
		currentState
			? setSelectedToppings([...selectedToppings, currentItemID])
			: setSelectedToppings(
					selectedToppings.filter((id) => id !== currentItemID)
			  );
	};
	const totalPrice = selectedToppings.reduce((Summe, currentID, index) => {
		let price = 0;
		toppings.forEach((topping) => {
			if (currentID === topping.id) {
				console.log('Preis', topping.price);
				price = topping.price;
			}
		});
		return Summe + price;
	}, 699);
	console.log(totalPrice);

	/* Nutzt die Array-Methode reduce, um den Preis zu berechnen. Grundpreis
    für eine Pizza ohne Toppings ist 6,99 €. */

	return (
		<section className="pizza">
			<header className="pizza__header">
				<h1>Pizza</h1>
				<h2>{}</h2>
				<div className="pizza__image">🍕</div>
			</header>
			{JSON.stringify(selectedToppings)}
			{/* Verhindert Absenden des Formulars */}
			<form className="pizza__form" onSubmit={(e) => e.preventDefault()}>
				<fieldset className="pizza__toppings">
					<legend>Belag wählen</legend>
					{toppings.map((topping) => {
						return (
							<label key={topping.id} className="pizza__topping">
								<input
									type="checkbox"
									value={topping.id}
									onChange={handleToppingChange}
								/>
								{topping.icon}
								<b>{topping.name}</b> {getFormattedPrice(topping.price)}
							</label>
						);
					})}
				</fieldset>
			</form>
			<output className="pizza__price">{`Price: ${getFormattedPrice(
				totalPrice
			)}`}</output>
		</section>
	);
}
