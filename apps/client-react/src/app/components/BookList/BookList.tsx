import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { Book } from '@libs/api-interface';
import { getBooks } from '../../services/api';

const b: Book[] = [
  {
    id: '1',
    title: 'book 1',
    author: 'author 1',
    description: 'description 1',
  },
  {
    id: '2',
    title: 'book 2',
    author: 'author 2',
    description: 'description 2',
  },
  {
    id: '3',
    title: 'book 3',
    author: 'author 3',
    description: 'description 3',
  },
];

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    getBooks().then(bookList => setBooks(bookList));
  }, []);

  const handleClick = () => {
    getBooks();
  };

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {books.map(({ id, title, author }) => (
          <ListItem key={id}>
            <ListItemButton>
              <ListItemText primary={`${title}, ${author}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <button onClick={handleClick}>button</button>
    </>
  );
}
