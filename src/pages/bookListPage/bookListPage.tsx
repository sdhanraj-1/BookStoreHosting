import BookList from "../../components/BookList/BookList";
import "./BooksListPage.css";
import { Carousel } from "react-bootstrap";
import img1 from "../../assets/pexels-cottonbro-studio-4273468.jpg";
import img2 from "../../assets/pexels-sumit-mathur-2099691.jpg";
import img3 from "../../assets/pexels-aline-viana-prado-2465877.jpg";
import img4 from "../../assets/pexels-lil-artsy-3166839.jpg";
import img5 from "../../assets/pexels-lil-artsy-1132577.jpg";
import img6 from "../../assets/pexels-lil-artsy-3563625.jpg";
import img7 from "../../assets/pexels-aline-viana-prado-2465877.jpg";
import img8 from "../../assets/pexels-wallace-chuck-3728084.jpg";
import img9 from "../../assets/pexels-wallace-chuck-3728085.jpg";
import img10 from "../../assets/pexels-ylanite-koppens-1809347.jpg";
import img11 from "../../assets/pexels-ylanite-koppens-2008142.jpg";
const bookLists = [
	{ id: "stefan-list", title: "Stefan's Pick", img: img1 },
	{ id: "en-list", title: "En's Pick", img: img2 },
	{ id: "daniele-list", title: "Daniele's Pick", img: img3 },
	{ id: "pop-list", title: "Most Popular", img: img4 },
	{ id: "thriller-list", title: "Thriller", img: img5 },
	{ id: "scifi-list", title: "Sci-Fi", img: img6 },
	{ id: "mystery-list", title: "Mystery", img: img7 },
	{ id: "nonfiction-list", title: "Non-Fiction", img: img8 },
	{ id: "teen-list", title: "Teen", img: img9 },
	{ id: "drama-list", title: "Drama", img: img10 },
	{ id: "action-list", title: "Action", img: img11 },
];

const BookListPage: React.FC = () => {
	return (
		<div className='booklist-page-container'>
			<Carousel>
				{bookLists.map((list, index) => (
					<Carousel.Item>
						<BookList
							key={index}
							id={list.id}
							BookListTitle={list.title}
							imglink={list.img}
						/>
					</Carousel.Item>
				))}
			</Carousel>
		</div>
	);
};

export default BookListPage;
