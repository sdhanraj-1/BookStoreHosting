// DeleteBookList.tsx
import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
interface DeleteBookListProps {
	bookListId: string;
	onDeleteSuccess: () => void;
}

const DeleteBookList: React.FC<DeleteBookListProps> = ({
	bookListId,
	onDeleteSuccess,
}) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleDelete = async () => {
		try {
			setLoading(true);
			setError(null);

			// Make a DELETE request to your server API
			const response = await axios.delete(
				`${API_BASE_URL}/booklist/${bookListId}`
			);

			// Check if the delete request was successful
			if (response.status === 200) {
				onDeleteSuccess(); // Trigger a callback on successful deletion
			} else {
				setError("Error deleting book list");
			}
		} catch (error) {
			setError("Error deleting book list");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			{loading && <p>Loading...</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}
			<button onClick={handleDelete} disabled={loading}>
				<i className='bi bi-archive'></i>
			</button>
		</div>
	);
};

export default DeleteBookList;
