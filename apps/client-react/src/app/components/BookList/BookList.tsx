import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { Book } from '@libs/api-interface';
import { getBooks } from '../../services/api';

export default function BookList(): JSX.Element {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    getBooks().then(bookList => setBooks(bookList));
  }, []);

  const handleClick = (): void => {
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
