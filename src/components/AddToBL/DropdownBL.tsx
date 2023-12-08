import React from 'react';
import './Dropdown.css'
import { fetchGoogleBook } from '../../data/fetchGoogleBook';
import { addToBookList } from '../../data/addToBookList';

interface DropdownBLProps {
  BookId: string;
}

const DropdownBL: React.FC<DropdownBLProps> = ({ BookId }) => {

    const handleItemClick = async (event: React.MouseEvent<HTMLLIElement>) => {
      const bookListId = (event.target as HTMLLIElement).id;
      console.log(`Clicked on item with id: ${bookListId}`);
      console.log({BookId});

      try{
        const bookData = await fetchGoogleBook(BookId);

        if (bookData) {

          console.log('Book Data:', bookData);

          // perform put method

          try{
            await addToBookList(bookListId, bookData)
            console.log(`Book added successfully to booklistid ${bookListId}`);

          } catch (error) {
            console.error('Failed to add book to book list', error)
          }

        } else {
          console.log('Failed to fetch book data.');
        }
      } catch (error){
        console.error("Error fetching book data.", error);
      }

    };
  
  return (
    <div className='dropdown-container'>
    <ul className='dropdown-list'>
      <li onClick={handleItemClick} id='cust-bl1'>Book List #1</li>
      <li onClick={handleItemClick} id='cust-bl2'>Book List #2</li>
      <li onClick={handleItemClick} id='cust-bl3'>Book List #3</li>
      <li onClick={handleItemClick} id='cust-bl4'>Book List #4</li>
      <li onClick={handleItemClick} id='cust-bl5'>Book List #5</li>
      <li onClick={handleItemClick} id='cust-bl6'>Book List #6</li>
      <li onClick={handleItemClick} id='cust-bl7'>Book List #7</li>
      <li onClick={handleItemClick} id='cust-bl8'>Book List #8</li>
      <li onClick={handleItemClick} id='cust-bl9'>Book List #9</li>
      <li onClick={handleItemClick} id='cust-bl10'>Book List #10</li>
      <li onClick={handleItemClick} id='cust-bl11'>Book List #11</li>
      <li onClick={handleItemClick} id='cust-bl12'>Book List #12</li>
      <li onClick={handleItemClick} id='cust-bl13'>Book List #13</li>
      <li onClick={handleItemClick} id='cust-bl14'>Book List #14</li>
      <li onClick={handleItemClick} id='cust-bl15'>Book List #15</li>
      <li onClick={handleItemClick} id='cust-bl16'>Book List #16</li>
      <li onClick={handleItemClick} id='cust-bl17'>Book List #17</li>
      <li onClick={handleItemClick} id='cust-bl18'>Book List #18</li>
      <li onClick={handleItemClick} id='cust-bl19'>Book List #19</li>
      <li onClick={handleItemClick} id='cust-bl20'>Book List #20</li>
    </ul>
    </div>

  );
};

export default DropdownBL;
