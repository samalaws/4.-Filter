import Product from './Product';

export default function ProductsList({ products }) {
	return (
		<section className="products">
			{products.map((product) => (
				<Product key={product.id} {...product} />
			))}
		</section>
	);
}
/*
Übergebt den products-Array als Prop products.

 Stellt innerhalb von .products für jedes Produkt ein Product-Komponente dar
 */
