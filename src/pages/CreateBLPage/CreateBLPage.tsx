import React from "react";
import BookList from "../../components/BookList/BookList";
import "./CreateBLPage.css";
import Navbar from "../../components/navbar/navbar";
import listimg1 from "../../../src/assets/fernando-hernandez-tVugl_rtvHA-unsplash.jpg";
import listimg2 from "../../../src/assets/freddy-castro-u3ajSXhZM_U-unsplash.jpg";
import listimg3 from "../../../src/assets/freestocks-OfaDD5o8hpk-unsplash.jpg";
import listimg4 from "../../../src/assets/huzeyfe-turan-yEEHg9ft_TA-unsplash.jpg";
import listimg5 from "../../../src/assets/joyce-hankins-o7vQxMeVepo-unsplash.jpg";
import listimg6 from "../../../src/assets/lilartsy-rSgE6NtntZo-unsplash.jpg";
import listimg7 from "../../../src/assets/nadi-borodina-xkx93Q2Pe8E-unsplash.jpg";
import listimg8 from "../../../src/assets/olesia-buyar-ZD03qVhBJZg-unsplash.jpg";
import listimg9 from "../../../src/assets/olga-tutunaru-plbb7pkEjkQ-unsplash.jpg";
import listimg10 from "../../../src/assets/richa-sharma-p6ZWMgiiE5c-unsplash.jpg";
import listimg11 from "../../../src/assets/nong-9pw4TKvT3po-unsplash.jpg";
import listimg12 from "../../../src/assets/s-o-c-i-a-l-c-u-t-GoFeJMsxAVM-unsplash.jpg";
import listimg13 from "../../../src/assets/thoa-ngo-UhdlN7u87nA-unsplash.jpg";
import listimg14 from "../../../src/assets/sincerely-media-Pxbiv0GpV8g-unsplash.jpg";
import listimg15 from "../../../src/assets/sincerely-media-_-hjiem5TqI-unsplash.jpg";
import listimg16 from "../../../src/assets/sincerely-media-c1YrcFYW66s-unsplash.jpg";
import listimg17 from "../../../src/assets/sincerely-media-nGrfKmtwv24-unsplash.jpg";
import listimg18 from "../../../src/assets/sixteen-miles-out-3nKEdcA3zyA-unsplash.jpg";
import listimg19 from "../../../src/assets/sixteen-miles-out-KSaLhgex8F0-unsplash.jpg";
import listimg20 from "../../../src/assets/thought-catalog-OJZB0VUQKKc-unsplash.jpg";

const customBookList = [
	{ id: "cust-bl1", title: "Book List #1", imglink: listimg1 },
	{ id: "cust-bl2", title: "Book List #2", imglink: listimg2 },
	{ id: "cust-bl3", title: "Book List #3", imglink: listimg3 },
	{ id: "cust-bl4", title: "Book List #4", imglink: listimg4 },
	{ id: "cust-bl5", title: "Book List #5", imglink: listimg5 },
	{ id: "cust-bl6", title: "Book List #6", imglink: listimg6 },
	{ id: "cust-bl7", title: "Book List #7", imglink: listimg7 },
	{ id: "cust-bl8", title: "Book List #8", imglink: listimg8 },
	{ id: "cust-bl9", title: "Book List #9", imglink: listimg9 },
	{ id: "cust-bl10", title: "Book List #10", imglink: listimg10 },
	{ id: "cust-bl11", title: "Book List #11", imglink: listimg11 },
	{ id: "cust-bl12", title: "Book List #12", imglink: listimg12 },
	{ id: "cust-bl13", title: "Book List #13", imglink: listimg13 },
	{ id: "cust-bl14", title: "Book List #14", imglink: listimg14 },
	{ id: "cust-bl15", title: "Book List #15", imglink: listimg15 },
	{ id: "cust-bl16", title: "Book List #16", imglink: listimg16 },
	{ id: "cust-bl17", title: "Book List #17", imglink: listimg17 },
	{ id: "cust-bl18", title: "Book List #18", imglink: listimg18 },
	{ id: "cust-bl19", title: "Book List #19", imglink: listimg19 },
	{ id: "cust-bl20", title: "Book List #20", imglink: listimg20 },
];

const CreateBLPage: React.FC = () => {
	return (
		<>
			<Navbar />

			<div className='create-bl-page-container'>
				<div className='create-bl-page-title'>Custom Book Lists</div>
				<ul className='custom-bl-container'>
					{customBookList.map((list, index) => (
						<BookList
							key={index}
							id={list.id}
							BookListTitle={list.title}
							imglink={list.imglink}
						/>
					))}
				</ul>
			</div>
		</>
	);
};
export default CreateBLPage;
