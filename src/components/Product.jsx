import { getFormattedPrice } from '../helpers';

export default function Product({ title, image, price, sale }) {
	return (
		<article className={`product ${sale ? 'product--sale' : ''}`}>
			<div className="product__image">{image}</div>
			<h3 className="product__heading">{title}</h3>
			<p className="product__price">{getFormattedPrice(price)}</p>
		</article>
	);
}

/* 

<article class="product">
<div class="product__image"></div>
<h3 class="product__heading"></h3>
<p class="product__price"></p>
</article>


Nutzt die Funktion getFormattedPrice aus helpers.js, um den Preis
formatiert darzustellen.
Bonus: Produkte, die im Sonderangebot sind (sale) sollen zusätzlich die Klasse
product--sale erhalten.

*/
